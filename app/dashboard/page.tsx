'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Bookmark,
  Sparkles,
  FolderGit2,
  Play,
  RotateCcw,
  Check,
  TrendingUp,
} from 'lucide-react';
import { CAREER_ROLES, FULLSTACK_ROADMAP, PROJECTS } from '@/lib/data';

export default function StudentDashboardPage() {
  const [userName, setUserName] = useState('Student');
  const [userCourse, setUserCourse] = useState('Computer Science (CSE)');
  const [careerPath, setCareerPath] = useState('Full Stack Developer');
  const [savedCareerIds, setSavedCareerIds] = useState<string[]>(['full-stack-developer', 'ai-engineer']);
  const [hoursStudied, setHoursStudied] = useState(6.5);
  const weeklyGoalHours = 10;

  useEffect(() => {
    // Read from personalized profile if set
    const profileStr = localStorage.getItem('cp_personalized_profile');
    if (profileStr) {
      try {
        const p = JSON.parse(profileStr);
        if (p.course) setUserCourse(p.course);
        if (p.careerGoal) setCareerPath(p.careerGoal);
      } catch (e) {}
    }

    const saved = localStorage.getItem('cp_saved_careers');
    if (saved) {
      try {
        setSavedCareerIds(JSON.parse(saved));
      } catch (e) {}
    }

    const email = localStorage.getItem('cp_user_email');
    if (email) {
      setUserName(email.split('@')[0]);
    }
  }, []);

  const overallProgressPercent = 42;
  const savedCareers = CAREER_ROLES.filter((c) => savedCareerIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-[#080d1a] text-white shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>🔥 7 Day Learning Streak!</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Enrolled in <strong>{userCourse}</strong> • Target Career:{' '}
            <strong className="text-brand-300">{careerPath}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/generator"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Re-tune Roadmap</span>
          </Link>
          <Link
            href="/planner"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-soft transition-all"
          >
            Weekly Planner
          </Link>
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Progress Gauge */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Overall Progress
            </span>
            <div className="text-3xl font-black text-gray-900 dark:text-white mt-1">
              {overallProgressPercent}%
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% this week</span>
            </p>
          </div>
          {/* Circular progress visual */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100 dark:text-gray-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-600"
                strokeDasharray={`${overallProgressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-gray-900 dark:text-white">
              {overallProgressPercent}%
            </span>
          </div>
        </div>

        {/* Weekly Study Goal */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Weekly Study Goal
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-gray-900 dark:text-white">
              {hoursStudied}
            </span>
            <span className="text-xs text-gray-400">/ {weeklyGoalHours} hrs</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(hoursStudied / weeklyGoalHours) * 100}%` }}
            />
          </div>
          <div className="text-[11px] text-gray-400">
            3.5 hours remaining to hit target
          </div>
        </div>

        {/* Active Target Path */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Active Target Path
          </span>
          <div className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
            {careerPath}
          </div>
          <p className="text-xs text-brand-600 dark:text-brand-400">
            10 Milestones • 3 Projects
          </p>
          <div className="pt-1">
            <Link
              href="/roadmaps/full-stack-developer"
              className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>View roadmap tree</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Daily Study Streak
          </span>
          <div className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <span>7</span>
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-xs text-gray-500">
            Personal best: 14 days
          </p>
        </div>
      </div>

      {/* Continue Learning + Recommended Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Continue Learning Hero Card (7 Cols) */}
        <div className="lg:col-span-7 p-7 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Continue Learning
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                JavaScript — Async/Await & Fetch API
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              65% Completed
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            You were learning how to fetch live external data and parse JSON responses. Complete the practice task to finish Milestone #3!
          </p>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Next Task:
            </div>
            <div className="text-xs text-gray-800 dark:text-gray-200 font-medium">
              &ldquo;Build an interactive dog image fetcher using the free public Dog CEO REST API.&rdquo;
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              href="/roadmaps/full-stack-developer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-soft transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Study Session →</span>
            </Link>
          </div>
        </div>

        {/* “What Should I Do Next?” Clear Action (5 Cols) */}
        <div className="lg:col-span-5 p-7 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Your Next Step
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
              What should I do next?
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                title: '1. Complete Milestone 3: JavaScript Fetch',
                time: '45 mins remaining',
                href: '/roadmaps/full-stack-developer',
              },
              {
                title: '2. Start Project: Interactive To-Do App',
                time: 'Beginner • 6 hours',
                href: '/projects',
              },
              {
                title: '3. Learn Milestone 4: Git & GitHub Workflow',
                time: 'Next milestone',
                href: '/roadmaps/full-stack-developer',
              },
            ].map((step, idx) => (
              <Link
                key={idx}
                href={step.href}
                className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/40 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-gray-100 dark:border-gray-800 hover:border-brand-200 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{step.time}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Careers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Saved Career Paths
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Career directions you are considering or following.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Explore more →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCareers.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {c.domain}
                </span>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{c.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{c.description}</p>
              </div>
              <div className="pt-4 mt-3 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href={`/careers/${c.slug}`}
                  className="w-full py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-brand-600 hover:text-white text-xs font-semibold text-center transition-colors block"
                >
                  View Career & Roadmap
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
