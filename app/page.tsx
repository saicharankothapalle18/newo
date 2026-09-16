'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Sparkles,
  Compass,
  MapPin,
  CheckCircle2,
  FolderGit2,
  Search,
  BookOpen,
  Check,
  GraduationCap,
  Layers,
  Flame,
  Code2,
  Cpu,
  Brain,
  Shield,
  Zap,
} from 'lucide-react';
import { COURSES, CAREER_ROLES } from '@/lib/data';
import { useBeginnerMode } from '@/components/BeginnerModeToggle';

export default function HomePage() {
  const router = useRouter();
  const [courseInput, setCourseInput] = useState('');
  const { isBeginnerMode } = useBeginnerMode();

  const handleSearchCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = courseInput.trim().toLowerCase();
    if (!clean) return;

    const matched = COURSES.find(
      (c) =>
        c.shortName.toLowerCase() === clean ||
        c.slug.toLowerCase() === clean ||
        c.name.toLowerCase().includes(clean)
    );

    if (matched) {
      router.push(`/courses/${matched.slug}`);
    } else {
      router.push(`/courses?search=${encodeURIComponent(clean)}`);
    }
  };

  const handleChipClick = (slug: string) => {
    router.push(`/courses/${slug}`);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 dark:bg-brand-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold shadow-xs animate-in fade-in zoom-in duration-300">
            <GraduationCap className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Your Course. Your Career. Your Roadmap.</span>
          </div>

          {/* Main Large Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Don’t just choose a career.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600">
              Build your path.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter your course and discover career roles, skills, roadmaps, projects, and learning resources — all in one place.
          </p>

          {/* Large Course Search Input Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleSearchCourse}
              className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-[#0d1422] shadow-soft-lg border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-3 w-full px-3 py-1">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={courseInput}
                  onChange={(e) => setCourseInput(e.target.value)}
                  placeholder="What are you studying? (e.g. CSE, AIML, ECE, BCA...)"
                  className="w-full bg-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold text-sm hover:from-brand-700 hover:to-indigo-700 shadow-soft transition-all duration-150 flex items-center justify-center gap-2 shrink-0 group"
              >
                <span>Explore My Career</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>

            {/* Quick Example Chips */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">
                Popular:
              </span>
              {[
                { name: 'CSE', slug: 'cse' },
                { name: 'AIML', slug: 'aiml' },
                { name: 'ECE', slug: 'ece' },
                { name: 'IT', slug: 'it' },
                { name: 'BCA', slug: 'bca' },
                { name: 'Mechanical', slug: 'mechanical' },
                { name: 'Civil', slug: 'civil' },
                { name: 'EEE', slug: 'eee' },
                { name: 'B.Sc CS', slug: 'bsc-cs' },
              ].map((chip) => (
                <button
                  key={chip.slug}
                  onClick={() => handleChipClick(chip.slug)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800/80 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-300 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/60 transition-colors"
                >
                  {chip.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step "How It Works" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Step-by-Step Clarity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            How CareerPath Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Never wonder what to study next. Move from confused beginner to job-ready builder with a continuous guided flow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Enter Your Course',
              desc: 'Tell us what degree, diploma, or branch you are studying.',
              icon: GraduationCap,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              step: '02',
              title: 'Explore Career Roles',
              desc: 'Discover factual career options directly mapped to your course.',
              icon: Compass,
              color: 'from-indigo-500 to-purple-500',
            },
            {
              step: '03',
              title: 'Follow Your Roadmap',
              desc: 'Learn the required technical skills step by step without overwhelm.',
              icon: MapPin,
              color: 'from-purple-500 to-pink-500',
            },
            {
              step: '04',
              title: 'Build & Track',
              desc: 'Build real portfolio projects and track your weekly milestones.',
              icon: CheckCircle2,
              color: 'from-emerald-500 to-teal-500',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative group p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200/90 dark:border-gray-800/90 shadow-soft hover:shadow-soft-lg hover:border-brand-300 dark:hover:border-brand-800/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black text-gray-300 dark:text-gray-700 group-hover:text-brand-500 transition-colors font-mono">
                    {item.step}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-soft group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              College Branches
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Explore Popular Courses
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select your academic course to view tailored career domains, subjects, and roles.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
          >
            <span>View all courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="group p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg hover:border-brand-400 dark:hover:border-brand-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    {course.icon}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                    {course.careerCount || 6} Career Paths
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {course.name}
                </h3>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2">
                  {course.shortName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                  {course.description}
                </p>

                {/* Domains snippet */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.domains.slice(0, 3).map((domain, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                      {domain}
                    </span>
                  ))}
                  {course.domains.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] text-gray-400">
                      +{course.domains.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <Link
                href={`/courses/${course.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-gray-800/90 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-gray-800 dark:text-gray-200 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 group-hover:bg-brand-600 group-hover:text-white"
              >
                <span>Explore {course.shortName}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Roadmap & Beginner Mode Feature Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-brand-900 via-indigo-950 to-[#080d1a] text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span>🌱 Beginner Mode Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Zero Prior Coding Experience?
                <br />
                <span className="text-brand-300">We speak plain student English.</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Most tutorials dump overwhelming technical jargon on day one. CareerPath features our signature
                <strong className="text-white"> Beginner Mode toggle</strong>: simplifying complex topics like REST APIs, SQL indexing, and OOP with everyday analogies, actionable micro-tasks, and practical projects.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong>Why You Need It</strong>: Understand why each technology matters before writing code.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong>Interactive Roadmaps</strong>: Reference trusted industry standards from roadmap.sh with our structured checkpoints.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>
                    <strong>Personalized Roadmap Generator</strong>: Answer 6 quick questions to generate a custom roadmap matching your college year and study time.
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/generator"
                  className="px-6 py-3 rounded-xl bg-white text-brand-950 font-bold text-sm hover:bg-gray-100 shadow-soft transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Generate My Roadmap</span>
                </Link>
                <Link
                  href="/careers/full-stack-developer"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-colors"
                >
                  <span>Sample Roadmap (Full Stack)</span>
                </Link>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                    🌱
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Previewing Beginner Mode</div>
                    <div className="text-[11px] text-gray-400">Node: JavaScript Fetch & APIs</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  STATUS: LEARNING
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-brand-300">Simple Explanation:</div>
                <p className="text-gray-200 leading-relaxed bg-black/20 p-3 rounded-xl">
                  &ldquo;An API is like a waiter in a restaurant. Your website (you) orders food from the kitchen (the server). The waiter brings the response back so you can show it on screen without reloading!&rdquo;
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-brand-300">Practice Task:</div>
                <p className="text-gray-300">
                  Fetch random dog photos from <code className="text-brand-200">https://dog.ceo/api/breeds/image/random</code> and display them with a button click.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-gray-300 border-t border-white/10">
                <span>Progress: <strong>65%</strong></span>
                <Link
                  href="/roadmaps/full-stack-developer"
                  className="text-brand-300 hover:text-white underline"
                >
                  Try interactive roadmap →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
