const { Client } = require('pg');

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:055980727bd6403389c6310824ec7f5c@mscw7kcp.ap-southeast.database.insforge.app:5432/insforge?sslmode=require';

async function main() {
  console.log('Connecting to InsForge PostgreSQL database...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✓ Connected successfully.');

    // 1. Courses table
    console.log('Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS cp_courses (
        id VARCHAR(50) PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        short_name VARCHAR(50) NOT NULL,
        description TEXT,
        icon VARCHAR(20),
        subjects JSONB DEFAULT '[]'::jsonb,
        skills JSONB DEFAULT '[]'::jsonb,
        domains JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cp_careers (
        id VARCHAR(50) PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        course_slug VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        domain VARCHAR(100),
        description TEXT,
        beginner_summary TEXT,
        difficulty VARCHAR(50),
        main_skills JSONB DEFAULT '[]'::jsonb,
        technologies JSONB DEFAULT '[]'::jsonb,
        responsibilities JSONB DEFAULT '[]'::jsonb,
        beginner_reqs JSONB DEFAULT '[]'::jsonb,
        roadmap_sh_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cp_roadmap_nodes (
        id VARCHAR(50) PRIMARY KEY,
        career_slug VARCHAR(100) NOT NULL,
        node_order INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        summary TEXT,
        beginner_summary TEXT,
        why_need_it TEXT,
        topics JSONB DEFAULT '[]'::jsonb,
        practice_tasks JSONB DEFAULT '[]'::jsonb,
        project_idea TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cp_projects (
        id VARCHAR(50) PRIMARY KEY,
        career_slug VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        difficulty VARCHAR(50),
        description TEXT,
        technologies JSONB DEFAULT '[]'::jsonb,
        skills_learned JSONB DEFAULT '[]'::jsonb,
        estimated_time VARCHAR(100),
        features JSONB DEFAULT '[]'::jsonb,
        extensions JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cp_resources (
        id VARCHAR(50) PRIMARY KEY,
        skill_tag VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50),
        level VARCHAR(50),
        duration VARCHAR(50),
        url TEXT,
        is_free BOOLEAN DEFAULT true,
        provider VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cp_user_progress (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        career_slug VARCHAR(100) NOT NULL,
        node_id VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'not_started',
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, career_slug, node_id)
      );

      CREATE TABLE IF NOT EXISTS cp_user_study_plans (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        day VARCHAR(20) NOT NULL,
        topic VARCHAR(255) NOT NULL,
        duration_hours NUMERIC(3,1) DEFAULT 1.0,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS cp_user_profiles (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255),
        course VARCHAR(100),
        year VARCHAR(50),
        skill_level VARCHAR(50),
        career_goal VARCHAR(100),
        streak_days INT DEFAULT 1,
        weekly_goal_hours INT DEFAULT 10,
        studied_hours_this_week NUMERIC(4,1) DEFAULT 0.0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    console.log('✓ All database tables created successfully in InsForge PostgreSQL.');
  } catch (err) {
    console.error('Database setup failed:', err);
  } finally {
    await client.end();
  }
}

main();
