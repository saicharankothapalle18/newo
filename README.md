# CareerPath — Your Course. Your Career. Your Roadmap.

CareerPath is a modern, student-focused career discovery and learning roadmap web application designed for college, university, and diploma students (CSE, AIML, IT, ECE, EEE, Mechanical, Civil, BCA, B.Sc CS).

It solves the core student dilemma:
> **“I am studying this course. What career roles can I choose, what skills do I need, and what should I learn step by step?”**

---

## 🌟 Features

- **Degree to Career Mapping**: Select any degree branch to explore mapped career domains and factual job profiles.
- **Interactive Roadmaps**: Step-by-step milestone curriculum referenced against **roadmap.sh** standards, with sub-topic checkboxes, status tracking, and confetti milestone celebrations.
- **🌱 Beginner Mode**: Instant global toggle turning technical jargon into friendly, zero-experience analogies (*Why You Need It*, *What To Learn*, *Hands-on Practice*, *Starter Projects*).
- **Personalized Roadmap Generator**: 6-question onboarding wizard tailoring milestones to the student's year, known tech, and study hours.
- **Student Dashboard**: Streak counter (🔥), circular progress gauge, continue learning card, and clear *"What should I do next?"* guidance.
- **Project Discovery**: Curated Beginner, Intermediate, and Advanced portfolio projects with feature lists and bonus extensions.
- **Weekly Study Planner**: Customizable Monday-to-Sunday study schedule with weekly hours tracking.
- **Career Comparison Matrix**: Objective side-by-side comparison across 3 selectable roles.
- **AI Career Assistant**: Floating interactive mentor providing personalized answers and study plans.
- 🔒 **Hidden Admin Panel**: Unlisted administration console for managing courses, careers, and syncing live database tables.

---

## 🛠️ Tech Stack & Backend

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3.4, Lucide Icons, Canvas Confetti
- **Backend**: InsForge BaaS (`@insforge/sdk`)
- **Database**: PostgreSQL (8 normalized relational tables)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/saicharankothapalle18/st.git
cd st
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and add your InsForge credentials:
```bash
cp .env.example .env.local
```

### 3. Initialize Database
Run the setup and seed scripts:
```bash
node scripts/setup-db.js
node scripts/seed-db.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
