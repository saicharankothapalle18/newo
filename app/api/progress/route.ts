import { NextResponse } from 'next/server';
import { Client } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:055980727bd6403389c6310824ec7f5c@mscw7kcp.ap-southeast.database.insforge.app:5432/insforge?sslmode=require';

export async function POST(req: Request) {
  try {
    const { userId, careerSlug, nodeId, status } = await req.json();

    if (!userId || !careerSlug || !nodeId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const client = new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    await client.query(
      `
      INSERT INTO cp_user_progress (user_id, career_slug, node_id, status, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (user_id, career_slug, node_id)
      DO UPDATE SET status = EXCLUDED.status, updated_at = NOW();
    `,
      [userId, careerSlug, nodeId, status || 'learning']
    );

    await client.end();

    return NextResponse.json({ success: true, message: 'Progress saved to InsForge database.' });
  } catch (error: any) {
    console.error('Progress save error:', error);
    return NextResponse.json({ error: error?.message || 'Database error' }, { status: 500 });
  }
}
