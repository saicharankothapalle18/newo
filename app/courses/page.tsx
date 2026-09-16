'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Search, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { COURSES } from '@/lib/data';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = COURSES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Academic Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Explore College Degrees & Branches
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Select what you are currently studying. We map your semester syllabus and core subjects into real-world career paths and step-by-step roadmaps.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by degree name, CSE, BCA, or skill..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 shadow-xs"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg hover:border-brand-400 dark:hover:border-brand-700 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                  {course.icon}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                  {course.careerCount || 6} Roles
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {course.name}
                </h2>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                  {course.shortName}
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {course.description}
              </p>

              {/* Core subjects */}
              <div>
                <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Core Subjects:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.subjects.slice(0, 3).map((sub, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {sub}
                    </span>
                  ))}
                  {course.subjects.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] text-gray-400">
                      +{course.subjects.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
              <Link
                href={`/courses/${course.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-soft"
              >
                <span>View {course.shortName} Career Paths</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
