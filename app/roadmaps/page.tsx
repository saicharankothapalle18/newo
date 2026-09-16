'use client';

import React from 'react';
import Link from 'next/link';
import { Map, ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { CAREER_ROLES } from '@/lib/data';

export default function RoadmapsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <Map className="w-3.5 h-3.5" />
          <span>Interactive Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Step-by-Step Learning Roadmaps
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Follow verified developer roadmaps referenced against industry standards from roadmap.sh, broken into beginner-friendly milestones with practice tasks and progress tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAREER_ROLES.map((role) => (
          <div
            key={role.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg hover:border-brand-400 dark:hover:border-brand-700 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {role.domain}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    role.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {role.difficulty}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {role.title} Roadmap
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {role.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
              <Link
                href={`/roadmaps/${role.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-soft"
              >
                <span>Open Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
