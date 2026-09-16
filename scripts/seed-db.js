const { Client } = require('pg');

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:055980727bd6403389c6310824ec7f5c@mscw7kcp.ap-southeast.database.insforge.app:5432/insforge?sslmode=require';

const COURSES = [
  {
    id: 'cse',
    slug: 'cse',
    name: 'Computer Science Engineering',
    short_name: 'CSE',
    description: 'Master software development, algorithms, system architecture, cloud platforms, and modern AI technologies.',
    icon: '💻',
    subjects: JSON.stringify(['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Computer Networks', 'Software Engineering', 'Object-Oriented Programming']),
    skills: JSON.stringify(['Programming (Java/Python/C++)', 'Web Development', 'SQL & Databases', 'Git & GitHub', 'System Design Basics', 'Problem Solving']),
    domains: JSON.stringify(['Software Development', 'Data & AI', 'Cloud & DevOps', 'Cybersecurity', 'Mobile Development', 'Database Administration', 'Testing & QA']),
  },
  {
    id: 'aiml',
    slug: 'aiml',
    name: 'Artificial Intelligence & Machine Learning',
    short_name: 'AIML',
    description: 'Focus on intelligent agents, deep learning neural networks, natural language processing, computer vision, and predictive analytics.',
    icon: '🧠',
    subjects: JSON.stringify(['Linear Algebra & Probability', 'Machine Learning Foundations', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Data Mining']),
    skills: JSON.stringify(['Python', 'NumPy & Pandas', 'Scikit-learn', 'PyTorch & TensorFlow', 'Model Evaluation', 'Data Preprocessing']),
    domains: JSON.stringify(['Machine Learning', 'Data Science', 'Generative AI', 'Computer Vision', 'NLP', 'Data Analytics']),
  },
  {
    id: 'it',
    slug: 'it',
    name: 'Information Technology',
    short_name: 'IT',
    description: 'Apply computing technology to business needs, networking infrastructure, enterprise web applications, and security systems.',
    icon: '🌐',
    subjects: JSON.stringify(['Network Administration', 'Web Technologies', 'Information Security', 'Cloud Computing', 'Database Systems', 'Enterprise Software']),
    skills: JSON.stringify(['Full Stack Development', 'Linux Administration', 'Network Configuration', 'Cloud Services (AWS/Azure)', 'API Integration']),
    domains: JSON.stringify(['Web Development', 'Cloud & DevOps', 'Cybersecurity', 'IT Support & Systems', 'Database Systems']),
  },
  {
    id: 'ece',
    slug: 'ece',
    name: 'Electronics & Communication Engineering',
    short_name: 'ECE',
    description: 'Bridge hardware and software with embedded systems, microcontrollers, IoT devices, signal processing, and robotics.',
    icon: '⚡',
    subjects: JSON.stringify(['Microprocessors & Microcontrollers', 'Signals & Systems', 'VLSI Design', 'Digital Electronics', 'IoT Architecture', 'Embedded C']),
    skills: JSON.stringify(['Embedded C / C++', 'Microcontroller Programming (Arduino/STM32/ESP32)', 'Circuit Design', 'IoT Protocols (MQTT/HTTP)', 'Firmware Testing']),
    domains: JSON.stringify(['Embedded Systems', 'IoT Engineering', 'Robotics', 'VLSI Design', 'Hardware Testing', 'Firmware Development']),
  },
  {
    id: 'eee',
    slug: 'eee',
    name: 'Electrical & Electronics Engineering',
    short_name: 'EEE',
    description: 'Power systems, electrical machines, power electronics, renewable energy, automation, and industrial control systems.',
    icon: '🔋',
    subjects: JSON.stringify(['Power Systems', 'Control Systems', 'Power Electronics', 'Renewable Energy', 'PLC & SCADA', 'Electrical Machines']),
    skills: JSON.stringify(['MATLAB / Simulink', 'PLC Programming', 'Circuit Simulation', 'Power System Analysis', 'Industrial Automation']),
    domains: JSON.stringify(['Power Systems', 'Industrial Automation', 'Electric Vehicles', 'Embedded IoT', 'Renewable Energy']),
  },
  {
    id: 'mechanical',
    slug: 'mechanical',
    name: 'Mechanical Engineering',
    short_name: 'Mechanical',
    description: 'Design, manufacturing, thermal analysis, CAD/CAM modeling, robotics, and emerging simulation technologies.',
    icon: '⚙️',
    subjects: JSON.stringify(['Thermodynamics', 'Strength of Materials', 'Machine Design', 'Fluid Mechanics', 'CAD/CAM', 'Manufacturing Processes']),
    skills: JSON.stringify(['SolidWorks / AutoCAD', 'ANSYS / FEA Simulation', 'Python for Engineers', 'Robotics Basics', 'Product Design']),
    domains: JSON.stringify(['Design & CAD Engineering', 'Robotics & Automation', 'Computational Mechanics', 'Manufacturing & QA']),
  },
  {
    id: 'civil',
    slug: 'civil',
    name: 'Civil Engineering',
    short_name: 'Civil',
    description: 'Infrastructure planning, structural engineering, surveying, GIS mapping, project management, and construction technology.',
    icon: '🏗️',
    subjects: JSON.stringify(['Structural Analysis', 'Geotechnical Engineering', 'Surveying & GIS', 'Concrete Technology', 'Transportation Engineering']),
    skills: JSON.stringify(['AutoCAD Civil 3D', 'STAAD Pro / ETABS', 'Revit BIM', 'Project Estimation', 'GIS Mapping Tools']),
    domains: JSON.stringify(['Structural Engineering', 'BIM Modeling', 'GIS Analysis', 'Project Management']),
  },
  {
    id: 'bca',
    slug: 'bca',
    name: 'Bachelor of Computer Applications',
    short_name: 'BCA',
    description: 'Comprehensive software applications, modern web programming, database operations, and practical app development.',
    icon: '📱',
    subjects: JSON.stringify(['Programming in C/Java/Python', 'Web Technologies (HTML/CSS/JS)', 'Database Management', 'Software Engineering', 'Mobile App Dev']),
    skills: JSON.stringify(['JavaScript & React', 'Node.js / Express', 'MySQL / MongoDB', 'Git & GitHub', 'Responsive UI Design']),
    domains: JSON.stringify(['Frontend Development', 'Full Stack Development', 'Software QA', 'Mobile Development', 'Technical Support']),
  },
  {
    id: 'bsc-cs',
    slug: 'bsc-cs',
    name: 'B.Sc Computer Science',
    short_name: 'B.Sc CS',
    description: 'Theoretical computing principles, software development, data structures, scientific computing, and statistical analysis.',
    icon: '🔬',
    subjects: JSON.stringify(['Discrete Mathematics', 'Data Structures', 'Database Systems', 'Computer Architecture', 'Object-Oriented Programming']),
    skills: JSON.stringify(['Python / Java', 'SQL', 'Data Analysis', 'Web Programming', 'Algorithmic Problem Solving']),
    domains: JSON.stringify(['Software Development', 'Data Analysis', 'Web Development', 'QA Testing']),
  },
];

const CAREERS = [
  {
    id: 'full-stack-developer',
    slug: 'full-stack-developer',
    course_slug: 'cse',
    title: 'Full Stack Developer',
    domain: 'Software Development',
    description: 'Full Stack Developers build both the frontend and backend of web applications.',
    beginner_summary: 'You build entire websites and web apps from what the user clicks on screen to how data gets saved in the database.',
    difficulty: 'Intermediate',
    main_skills: JSON.stringify(['HTML/CSS/JavaScript', 'React or Next.js', 'Node.js & Express', 'SQL & Databases', 'RESTful APIs', 'Git']),
    technologies: JSON.stringify(['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel']),
    responsibilities: JSON.stringify([
      'Design clean, responsive user interfaces that work across devices',
      'Build server-side logic and connect frontend to databases via REST or GraphQL APIs',
      'Model and optimize database schemas for fast queries',
      'Implement user authentication and role-based security',
    ]),
    beginner_reqs: JSON.stringify(['Curiosity for web technologies', 'Computer with internet access', 'No prior coding needed']),
    roadmap_sh_url: 'https://roadmap.sh/full-stack',
  },
  {
    id: 'frontend-developer',
    slug: 'frontend-developer',
    course_slug: 'cse',
    title: 'Frontend Developer',
    domain: 'Software Development',
    description: 'Frontend Developers craft the visual, interactive experiences people see and interact with in web and mobile browsers.',
    beginner_summary: 'You turn visual designs into interactive, accessible websites using HTML, CSS, JavaScript, and React.',
    difficulty: 'Beginner',
    main_skills: JSON.stringify(['HTML5 & Semantic Markup', 'CSS3 & Tailwind CSS', 'JavaScript (ES6+)', 'React', 'Responsive Design']),
    technologies: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Vite']),
    responsibilities: JSON.stringify([
      'Convert UI wireframes into functional web pages',
      'Ensure high performance and mobile responsiveness',
      'Consume backend REST APIs',
    ]),
    beginner_reqs: JSON.stringify(['Eye for detail', 'Basic computer literacy']),
    roadmap_sh_url: 'https://roadmap.sh/frontend',
  },
  {
    id: 'ai-engineer',
    slug: 'ai-engineer',
    course_slug: 'aiml',
    title: 'AI / Machine Learning Engineer',
    domain: 'Data & AI',
    description: 'AI & ML Engineers build, train, and deploy artificial intelligence models and automated decision engines.',
    beginner_summary: 'You teach computers how to learn from data, make predictions, understand language, and generate intelligent content.',
    difficulty: 'Advanced',
    main_skills: JSON.stringify(['Python Programming', 'Linear Algebra & Statistics', 'NumPy & Pandas', 'PyTorch / TensorFlow', 'Prompt Engineering']),
    technologies: JSON.stringify(['Python', 'PyTorch', 'Hugging Face', 'LangChain', 'FastAPI', 'Docker']),
    responsibilities: JSON.stringify([
      'Collect, clean, and preprocess datasets for model training',
      'Select and fine-tune machine learning architectures',
      'Integrate Large Language Models into user applications',
    ]),
    beginner_reqs: JSON.stringify(['Comfort with high-school algebra', 'Curiosity about algorithms']),
    roadmap_sh_url: 'https://roadmap.sh/ai-data-scientist',
  },
  {
    id: 'data-analyst',
    slug: 'data-analyst',
    course_slug: 'cse',
    title: 'Data Analyst',
    domain: 'Data & AI',
    description: 'Data Analysts inspect, clean, transform, and model data to discover useful insights and build interactive dashboards.',
    beginner_summary: 'You turn spreadsheets and databases into clear charts and stories that guide companies to make smart decisions.',
    difficulty: 'Beginner',
    main_skills: JSON.stringify(['SQL Queries', 'Power BI or Tableau', 'Excel', 'Python Data Analysis', 'Communication']),
    technologies: JSON.stringify(['SQL', 'Power BI', 'Tableau', 'Python', 'Pandas', 'Excel', 'PostgreSQL']),
    responsibilities: JSON.stringify([
      'Query relational databases using SQL to extract datasets',
      'Build executive dashboards for business stakeholders',
      'Analyze trends and historical metrics',
    ]),
    beginner_reqs: JSON.stringify(['Analytical curiosity', 'Interest in spreadsheets and numbers']),
    roadmap_sh_url: 'https://roadmap.sh/data-analyst',
  }
];

async function seed() {
  console.log('Seeding initial data into InsForge PostgreSQL database...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    for (const c of COURSES) {
      await client.query(`
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
      `, [c.id, c.slug, c.name, c.short_name, c.description, c.icon, c.subjects, c.skills, c.domains]);
    }
    console.log(`✓ Seeded ${COURSES.length} courses.`);

    for (const car of CAREERS) {
      await client.query(`
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
      `, [car.id, car.slug, car.course_slug, car.title, car.domain, car.description, car.beginner_summary, car.difficulty, car.main_skills, car.technologies, car.responsibilities, car.beginner_reqs, car.roadmap_sh_url]);
    }
    console.log(`✓ Seeded ${CAREERS.length} careers.`);

    console.log('✓ InsForge Database seed complete!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.end();
  }
}

seed();
