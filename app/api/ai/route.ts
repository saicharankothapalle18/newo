import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, isBeginnerMode } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const p = prompt.toLowerCase();

    // If an external key is available, we can invoke OpenRouter / OpenAI
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

    if (openrouterKey) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openrouterKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'openai/gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are CareerPath AI, an encouraging and expert career advisor for college and diploma students in engineering and computer science.
Mode: ${isBeginnerMode ? 'Beginner Mode - use simple analogies, zero confusing jargon, clear step-by-step guidance.' : 'Technical Mode - accurate engineering best practices and architectural details.'}
Rules:
1. Always be practical, structured, and action-oriented.
2. Structure answers with headings, bullet points, and a 'Next Immediate Action'.
3. Do not make false promises about salaries or guaranteed jobs. Focus on skill building and projects.`,
              },
              { role: 'user', content: prompt },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (e) {
        console.warn('External AI call failed, falling back to built-in knowledge engine:', e);
      }
    }

    // Built-in intelligent student career guidance engine
    let reply = '';

    if (p.includes('learn first') || p.includes('complete beginner') || p.includes('start from zero')) {
      reply = isBeginnerMode
        ? `### 🚀 Where to Start as a Complete Beginner

Welcome! Starting from zero can feel intimidating, but here is the secret: **Do not try to learn everything at once.**

**1. Step One: Master Programming Fundamentals (2-3 weeks)**
* Choose **one** language: **Python** (for easiest syntax) or **JavaScript** (if you want to build websites immediately).
* Learn variables, if/else decisions, loops, and functions.
* Avoid jumping into React or AI until you can write basic logic comfortably.

**2. Step Two: Build 3 Tiny Console Programs**
* A simple tip calculator.
* A student grade pass/fail checker.
* A number guessing game.

**3. Step Three: Learn Git & GitHub**
* Make your code public so you build a verifiable track record from day 1.

👉 **Your Immediate Next Action:** Go to our **Roadmaps** page and select **Full Stack Developer** → Node 1: Programming Fundamentals!`
        : `### 🎯 Core Engineering Onboarding Path

For foundational computer science mastery:
1. **Language Core**: Learn memory models, scope, and control flow in Python or Modern ECMAScript (ES6+).
2. **Data Structures**: Focus on Arrays, HashMaps, Two-Pointers, and Time/Space Complexity (Big O).
3. **Tooling**: Command-line shell (Bash/Zsh), Git version control, and GitHub workflow.
4. **Target Role**: Pick one initial discipline (Full Stack Web or Data Analytics) and build towards production projects.`;
    } else if (p.includes('java') && (p.includes('next') || p.includes('web'))) {
      reply = isBeginnerMode
        ? `### ☕ You Know Java! Here is Your Next Step

Java gives you a fantastic foundation in Object-Oriented Programming and strong logic! Here is how to turn that into a high-paying career:

**Option A: Enterprise Backend Developer (Fastest)**
* Since you already know Java, learn **Spring Boot** (the #1 Java framework used by top companies and banks).
* Learn **SQL & PostgreSQL** to save data.
* Learn to build **REST APIs** that send JSON data to frontend apps.

**Option B: Full Stack Developer (Most versatile)**
* Keep Java for your backend with Spring Boot.
* Spend 3-4 weeks learning **HTML, CSS, JavaScript, and React** so you can build the user screens.

👉 **Next Step:** Build a simple Spring Boot REST API for a student library and test the endpoints with Postman!`
        : `### 🛠️ Java Transition Roadmap

With core Java proficiency (OOP, Collections, Multithreading):
1. **Framework**: Spring Boot 3 + Spring Data JPA + Spring Security.
2. **Persistence**: PostgreSQL, Hibernate ORM, Liquibase/Flyway migrations.
3. **Architecture**: RESTful microservices, Docker containerization, Kafka messaging.
4. **Frontend Bridge**: Pair with Next.js or React for end-to-end full-stack capability.`;
    } else if (p.includes('oop') || p.includes('object-oriented')) {
      reply = isBeginnerMode
        ? `### 🧩 Object-Oriented Programming (OOP) Explained Like a Cookie Cutter

Imagine you are baking cookies:

1. **Class (The Cookie Cutter / Blueprint):**
   * A class is just a design. It describes what a cookie *should* have (shape, sugar, frosting).
   * It is not an actual cookie you can eat yet.

2. **Object (The Real Cookie):**
   * When you press the cutter into dough, you create an **Object**!
   * You can make 50 cookies from 1 cookie cutter.

3. **Encapsulation (The Wrapper):**
   * Keeping the recipe private inside the wrapper so nobody tampers with it by accident.

4. **Inheritance (The Chocolate Chip Cookie):**
   * A Chocolate Chip Cookie is a Cookie, but with extra chocolate chips. It inherits all regular cookie traits!

5. **Polymorphism (Different Animals Making Sounds):**
   * A Dog and a Cat both have a \`makeSound()\` action, but the Dog barks and the Cat meows!`
        : `### 🏛️ The 4 Pillars of OOP

1. **Encapsulation**: Bundling state and behaviors within a class while restricting direct external access via access modifiers.
2. **Abstraction**: Exposing clean interfaces while hiding complex internal implementation details.
3. **Inheritance**: Deriving new classes from parent abstractions to promote code reuse and hierarchical categorization.
4. **Polymorphism**: Dynamic dispatch allowing subclasses to override methods and provide distinct behaviors behind a unified interface.`;
    } else if (p.includes('3-month') || p.includes('plan') || p.includes('study plan')) {
      reply = `### 📅 3-Month Full Stack Engineering Plan

**Month 1 — Frontend Foundations**
* **Weeks 1-2**: Semantic HTML5, modern CSS3 Flexbox, CSS Grid, and responsive design.
* **Weeks 3-4**: JavaScript ES6+ (DOM events, map/filter/reduce, Promises, Fetch API).
* *Milestone Project*: Responsive Personal Portfolio & Weather Dashboard.

**Month 2 — React & State Management**
* **Weeks 5-6**: React fundamentals (JSX, props, useState, useEffect, custom hooks).
* **Weeks 7-8**: Next.js App Router, Tailwind CSS, API route handlers, and client state.
* *Milestone Project*: Interactive E-commerce or Student Notes Hub.

**Month 3 — Backend, Database & Deployment**
* **Weeks 9-10**: Relational database modeling with PostgreSQL on InsForge, SQL queries, and CRUD APIs.
* **Weeks 11-12**: Authentication (JWT / sessions), security headers, and production deployment on Vercel.
* *Milestone Project*: Full-stack Capstone Application with live login and database storage!`;
    } else if (p.includes('interview') || p.includes('dsa') || p.includes('prepare')) {
      reply = `### 💼 Software Interview Preparation Guide

1. **Data Structures & Algorithms (40% of assessment)**:
   * Focus on: Arrays, Strings, HashMaps, Two-Pointers, Stack, and Binary Trees.
   * Don't solve 500 questions randomly; solve the **NeetCode 75** or **Blind 75** patterns.

2. **System & Project Walkthrough (35% of assessment)**:
   * Be ready to explain your database schema, why you chose PostgreSQL, how your APIs authenticate users, and how you handled errors.

3. **Behavioral Questions (STAR Method) (25% of assessment)**:
   * **S**ituation: What was the challenge?
   * **T**ask: What was your objective?
   * **A**ction: What specific code or architectural decision did you execute?
   * **R**esult: What was the measurable outcome?`;
    } else {
      reply = `### 💡 CareerPath Guidance

Thank you for your question about **"${prompt}"**!

Here is the most strategic recommendation for your learning journey:

1. **Focus on Fundamentals First**: Master core programming logic and version control (Git) before adopting advanced toolsets.
2. **Build Portfolio Proof**: Employers and recruiters hire based on what you have built and deployed, not just certificates.
3. **Explore Dedicated Roadmaps**: Visit our **Roadmaps** tab to see step-by-step milestones with both technical and beginner-friendly breakdowns.

Would you like a tailored recommendation for **Web Development**, **AI/Machine Learning**, or **Data Analytics**?`;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
