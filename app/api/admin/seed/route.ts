import { NextResponse } from 'next/server';
import { Client } from 'pg';
import { COURSES, CAREER_ROLES } from '@/lib/data';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:055980727bd6403389c6310824ec7f5c@mscw7kcp.ap-southeast.database.insforge.app:5432/insforge?sslmode=require';

export async function POST(req: Request) {
  try {
    const { passkey } = await req.json();

    const expectedPasskey = process.env.ADMIN_SECRET_KEY || 'careerpath_admin_2026';
    if (passkey !== expectedPasskey) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Passkey' }, { status: 401 });
    }

    const client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    // Seed/sync courses
    for (const c of COURSES) {
      await client.query(
        `
        INSERT INTO cp_courses (id, slug, name, short_name, description, icon, subjects, skills, domains)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          short_name = EXCLUDED.short_name,
          description = EXCLUDED.description,
          icon = EXCLUDED.icon,
          subjects = EXCLUDED.subjects,
          skills = EXCLUDED.skills,
          domains = EXCLUDED.domains;
      `,
        [
          c.id,
          c.slug,
          c.name,
          c.shortName,
          c.description,
          c.icon,
          JSON.stringify(c.subjects),
          JSON.stringify(c.skills),
          JSON.stringify(c.domains),
        ]
      );
    }

    // Seed/sync careers
    for (const car of CAREER_ROLES) {
      await client.query(
        `
        INSERT INTO cp_careers (id, slug, course_slug, title, domain, description, beginner_summary, difficulty, main_skills, technologies, responsibilities, beginner_reqs, roadmap_sh_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          course_slug = EXCLUDED.course_slug,
          domain = EXCLUDED.domain,
          description = EXCLUDED.description,
          beginner_summary = EXCLUDED.beginner_summary,
          difficulty = EXCLUDED.difficulty,
          main_skills = EXCLUDED.main_skills,
          technologies = EXCLUDED.technologies,
          responsibilities = EXCLUDED.responsibilities,
          beginner_reqs = EXCLUDED.beginner_reqs,
          roadmap_sh_url = EXCLUDED.roadmap_sh_url;
      `,
        [
          car.id,
          car.slug,
          car.courseSlug,
          car.title,
          car.domain,
          car.description,
          car.beginnerSummary,
          car.difficulty,
          JSON.stringify(car.mainSkills),
          JSON.stringify(car.technologies),
          JSON.stringify(car.responsibilities),
          JSON.stringify(car.beginnerReqs),
          car.roadmapShUrl,
        ]
      );
    }

    // Query stats
    const courseCountRes = await client.query('SELECT COUNT(*) FROM cp_courses');
    const careerCountRes = await client.query('SELECT COUNT(*) FROM cp_careers');
    const progressCountRes = await client.query('SELECT COUNT(*) FROM cp_user_progress');

    await client.end();

    return NextResponse.json({
      success: true,
      message: 'InsForge PostgreSQL database synchronized successfully!',
      stats: {
        courses: parseInt(courseCountRes.rows[0].count),
        careers: parseInt(careerCountRes.rows[0].count),
        progressRows: parseInt(progressCountRes.rows[0].count),
      },
    });
  } catch (error: any) {
    console.error('Admin sync error:', error);
    return NextResponse.json({ error: error?.message || 'Admin operation failed' }, { status: 500 });
  }
}
