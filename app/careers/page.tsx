'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Search, ArrowRight, Bookmark, Sparkles, Map } from 'lucide-react';
import { CAREER_ROLES } from '@/lib/data';
import { useBeginnerMode } from '@/components/BeginnerModeToggle';

export default function CareersCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const { isBeginnerMode } = useBeginnerMode();

  const domains = ['All', 'Software Development', 'Data & AI', 'Cloud & DevOps', 'Cybersecurity', 'Mobile Development'];

  const filteredCareers = CAREER_ROLES.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mainSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || c.domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <Map className="w-3.5 h-3.5" />
          <span>Technology Careers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Explore Technical Career Roles
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Discover factual requirements, core technologies, and step-by-step roadmaps for modern software and engineering careers.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roles by title, skill (React, Python), or tech..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-full font-medium transition-colors ${
                selectedDomain === d
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((role) => (
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
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : role.difficulty === 'Intermediate'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                  }`}
                >
                  {role.difficulty}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {role.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {isBeginnerMode ? role.beginnerSummary : role.description}
              </p>

              <div>
                <div className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Key Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {role.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] text-gray-400">
                      +{role.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
              <Link
                href={`/careers/${role.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-soft"
              >
                <span>View Full Career Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
