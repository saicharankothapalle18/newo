'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Map,
  ArrowRight,
  Bookmark,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  FolderGit2,
  Briefcase,
  Layers,
  Code2,
  Check,
  Award,
  Terminal,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { CAREER_ROLES, FULLSTACK_ROADMAP, PROJECTS, RESOURCES } from '@/lib/data';
import { useBeginnerMode } from '@/components/BeginnerModeToggle';

export default function CareerDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const career = CAREER_ROLES.find((c) => c.slug === slug);
  const { isBeginnerMode } = useBeginnerMode();

  const [isSaved, setIsSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!career) return;
    const saved = localStorage.getItem('cp_saved_careers');
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        if (arr.includes(career.id)) setIsSaved(true);
      } catch (e) {}
    }
  }, [career]);

  if (!career) {
    notFound();
  }

  const toggleSave = () => {
    const saved = localStorage.getItem('cp_saved_careers');
    let arr: string[] = saved ? JSON.parse(saved) : [];
    if (isSaved) {
      arr = arr.filter((x) => x !== career.id);
      setIsSaved(false);
      setToastMsg(`Removed ${career.title} from your saved careers.`);
    } else {
      arr.push(career.id);
      setIsSaved(true);
      setToastMsg(`Saved ${career.title} to your career goals!`);
    }
    localStorage.setItem('cp_saved_careers', JSON.stringify(arr));
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Projects relevant to this career
  const relevantProjects = PROJECTS.filter(
    (p) => p.careerSlug === career.slug || p.difficulty === 'Beginner'
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-semibold shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {career.domain}
              </span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  career.difficulty === 'Beginner'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : career.difficulty === 'Intermediate'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                }`}
              >
                {career.difficulty} Difficulty
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              {career.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSave}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                isSaved
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaved ? 'Career Saved' : 'Save Career'}</span>
            </button>

            <Link
              href={`/roadmaps/${career.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-soft transition-all"
            >
              <span>View Interactive Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          {career.description}
        </p>

        {career.roadmapShUrl && (
          <div className="pt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Official industry curriculum reference:</span>
            <a
              href={career.roadmapShUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View official roadmap on roadmap.sh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Section 1: What does this role do? */}
      <section className="p-8 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h2>What does a {career.title} do?</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
          {isBeginnerMode ? (
            <span>
              💡 <strong>Beginner View:</strong> {career.beginnerSummary} Think of it like building a house: the architect plans the rooms, the carpenter builds the framework you can see and touch (frontend), and the plumbing & electrical cables bring power and water from behind the walls (backend and databases).
            </span>
          ) : (
            career.description
          )}
        </p>

        <div className="pt-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Typical Day-to-Day Responsibilities:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {career.responsibilities.map((resp, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300"
              >
                <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Skills & Technologies */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3>Core Skills Required</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Skills to focus on from fundamental logic to modern frameworks.
          </p>
          <div className="flex flex-wrap gap-2">
            {career.mainSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <Code2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3>Technologies & Tools</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tools commonly requested in job descriptions for this role.
          </p>
          <div className="flex flex-wrap gap-2">
            {career.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Roadmap Preview */}
      <section className="p-8 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-1">
              <Map className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h2>Step-by-Step Learning Roadmap</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Master the exact milestones needed to reach job readiness.
            </p>
          </div>
          <Link
            href={`/roadmaps/${career.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700"
          >
            <span>Open interactive node view</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Vertical Nodes Preview */}
        <div className="space-y-3 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
          {FULLSTACK_ROADMAP.slice(0, 5).map((node, idx) => (
            <div key={node.id} className="relative flex items-start gap-4 pl-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                  node.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : node.status === 'learning'
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {idx + 1}
              </div>
              <div className="flex-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    {node.title}
                  </h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {node.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isBeginnerMode ? node.beginnerSummary : node.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <Link
            href={`/roadmaps/${career.slug}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-brand-600 hover:text-white text-gray-800 dark:text-gray-200 text-xs font-semibold transition-colors"
          >
            <span>Explore All 10 Roadmap Nodes & Resources →</span>
          </Link>
        </div>
      </section>

      {/* Section 4: Recommended Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-1">
              <FolderGit2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h2>Recommended Portfolio Projects</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Build these projects to prove your practical capability to hiring managers.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            View all projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relevantProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {proj.estimatedTime}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      proj.difficulty === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}
                  >
                    {proj.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href="/projects"
                  className="w-full py-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-600 hover:text-white text-brand-600 dark:text-brand-400 text-xs font-semibold text-center transition-colors block"
                >
                  Start Project Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Job Preparation Guide */}
      <section className="p-8 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Job & Interview Preparation Checklist
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Everything you need outside of pure coding to pass technical screenings and secure offers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <Terminal className="w-4 h-4 text-brand-600" />
              <h4>DSA & Problem Solving</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Master fundamental patterns: Two-Pointers, HashMaps, Sliding Window, and Tree Traversals on LeetCode/NeetCode.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <FileText className="w-4 h-4 text-brand-600" />
              <h4>ATS-Friendly Resume</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              One page only. Highlight 2 full-stack projects with live demo links, bullet points using the STAR method, and GitHub stats.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
              <MessageSquare className="w-4 h-4 text-brand-600" />
              <h4>Behavioral & System Talk</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Practice explaining your database schema, why you chose specific libraries, and how you debugged tricky runtime errors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
