'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Code2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Layers,
  Map,
  Check,
} from 'lucide-react';
import { COURSES, CAREER_ROLES } from '@/lib/data';
import { useBeginnerMode } from '@/components/BeginnerModeToggle';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const course = COURSES.find((c) => c.slug === slug);
  const { isBeginnerMode } = useBeginnerMode();

  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cp_saved_careers');
    if (saved) {
      try {
        setSavedCareers(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  if (!course) {
    notFound();
  }

  // Get matching careers for this course or relevant ones
  const courseCareers = CAREER_ROLES.filter(
    (c) => c.courseSlug === course.slug || course.domains.includes(c.domain)
  );

  const filteredCareers =
    selectedDomain === 'All'
      ? courseCareers
      : courseCareers.filter((c) => c.domain === selectedDomain);

  const toggleSaveCareer = (id: string, title: string) => {
    let updated: string[] = [];
    if (savedCareers.includes(id)) {
      updated = savedCareers.filter((x) => x !== id);
      setSaveToast(`Removed ${title} from saved careers.`);
    } else {
      updated = [...savedCareers, id];
      setSaveToast(`Saved ${title} to your career goals!`);
    }
    setSavedCareers(updated);
    localStorage.setItem('cp_saved_careers', JSON.stringify(updated));
    setTimeout(() => setSaveToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-semibold shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-2">
          {saveToast}
        </div>
      )}

      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/80">
              {course.icon}
            </span>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                <span>Degree & Branch Guide</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {course.name} ({course.shortName})
              </h1>
            </div>
          </div>

          <Link
            href="/generator"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-soft transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Personalized Roadmap</span>
          </Link>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          {course.description} Explore career opportunities and discover what skills you need to build them step by step.
        </p>
      </div>

      {/* Course Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Core Subjects */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
            <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3>Core College Subjects</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Key theoretical foundations taught in this degree syllabus.
          </p>
          <ul className="space-y-2">
            {course.subjects.map((sub, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Essential Technical Skills */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
            <Code2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3>Required Technical Skills</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Practical skills industry companies expect candidates to know.
          </p>
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/60 dark:border-gray-700/60"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Card 3: Career Domains */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3>Primary Career Domains</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Industries where graduates from this course build careers.
          </p>
          <div className="flex flex-wrap gap-2">
            {course.domains.map((domain, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Career Roles Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Career Roles for {course.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Explore factual career options without misleading rankings. Filter by domain below.
            </p>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {['All', ...course.domains].map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full font-medium transition-colors ${
                  selectedDomain === domain
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCareers.map((role) => {
            const isSaved = savedCareers.includes(role.id);
            return (
              <div
                key={role.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg hover:border-brand-400 dark:hover:border-brand-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Role Meta */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        {role.domain}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {role.title}
                      </h3>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        role.difficulty === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : role.difficulty === 'Intermediate'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                      }`}
                    >
                      {role.difficulty}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {isBeginnerMode ? role.beginnerSummary : role.description}
                  </p>

                  {/* Main Skills */}
                  <div>
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Main Skills & Tech:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {role.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {role.technologies.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] text-gray-400">
                          +{role.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Beginner Requirements */}
                  <div>
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Starting Prerequisites:
                    </div>
                    <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                      {role.beginnerReqs.slice(0, 2).map((req, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleSaveCareer(role.id, role.title)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                      isSaved
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isSaved ? 'Saved' : 'Save Career'}</span>
                  </button>

                  <Link
                    href={`/careers/${role.slug}`}
                    className="flex-1 py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-soft"
                  >
                    <span>View Full Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
