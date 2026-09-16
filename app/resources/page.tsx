'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Clock,
  CheckCircle2,
  Filter,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { RESOURCES } from '@/lib/data';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const types = ['All', 'Documentation', 'Course', 'Practice', 'Video'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.skillTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesLevel = selectedLevel === 'All' || res.level === selectedLevel;

    return matchesSearch && matchesType && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Learning Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Learning Resources & Documentation
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          High quality, verified tutorials, official documentation, interactive coding platforms, and free university courses grouped by skill.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by skill (JavaScript, React, SQL), provider..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Type Filters */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedType === t
                    ? 'bg-white dark:bg-gray-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLevel(l)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedLevel === l
                    ? 'bg-white dark:bg-gray-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg hover:border-brand-400 dark:hover:border-brand-700 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-md border border-brand-200 dark:border-brand-800/80">
                  {res.skillTag}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                  {res.isFree ? '100% Free' : 'Paid'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  {res.provider}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {res.type}
                </span>
                <span>•</span>
                <span>{res.level}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {res.duration}
                </span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-brand-600 hover:text-white text-gray-800 dark:text-gray-200 text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 group-hover:bg-brand-600 group-hover:text-white"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
