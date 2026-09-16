'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, Check, CheckCircle2, Sparkles } from 'lucide-react';
import { CAREER_ROLES } from '@/lib/data';

export default function CareerComparisonPage() {
  const [selectedRole1, setSelectedRole1] = useState('full-stack-developer');
  const [selectedRole2, setSelectedRole2] = useState('ai-engineer');
  const [selectedRole3, setSelectedRole3] = useState('data-analyst');

  const role1 = CAREER_ROLES.find((c) => c.slug === selectedRole1) || CAREER_ROLES[0];
  const role2 = CAREER_ROLES.find((c) => c.slug === selectedRole2) || CAREER_ROLES[1];
  const role3 = CAREER_ROLES.find((c) => c.slug === selectedRole3) || CAREER_ROLES[3];

  const comparisonRows = [
    {
      category: 'Primary Domain Focus',
      val1: role1.domain,
      val2: role2.domain,
      val3: role3.domain,
    },
    {
      category: 'Programming Intensity',
      val1: 'High (Frontend + Backend syntax)',
      val2: 'High (Algorithms & Python scripts)',
      val3: 'Medium (SQL queries & Python scripts)',
    },
    {
      category: 'Mathematics & Theory',
      val1: 'Low - Medium (Basic arithmetic & logic)',
      val2: 'High (Linear Algebra, Calculus, Stats)',
      val3: 'Medium - High (Statistics & Probability)',
    },
    {
      category: 'Core Languages',
      val1: 'JavaScript, TypeScript, Python, or Java',
      val2: 'Python, C++, CUDA (for inference)',
      val3: 'SQL, Python, or R',
    },
    {
      category: 'What You Actually Build',
      val1: 'Interactive web applications & portals',
      val2: 'Trained models, LLM agents & classifiers',
      val3: 'Data pipelines, analytics charts & BI dashboards',
    },
    {
      category: 'Starting Difficulty',
      val1: role1.difficulty,
      val2: role2.difficulty,
      val3: role3.difficulty,
    },
    {
      category: 'Key Technologies',
      val1: role1.technologies.slice(0, 4).join(', '),
      val2: role2.technologies.slice(0, 4).join(', '),
      val3: role3.technologies.slice(0, 4).join(', '),
    },
    {
      category: 'Who Will Enjoy This?',
      val1: 'Students who love seeing immediate visual results from their code and building products end-to-end.',
      val2: 'Students fascinated by artificial intelligence, automated reasoning, and mathematical patterns.',
      val3: 'Students who enjoy finding hidden trends in data, organizing information, and presenting charts.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Objective Career Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Side-by-Side Career Comparison
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          No &ldquo;best&rdquo; or &ldquo;worst&rdquo; judgments. Compare real technical expectations, mathematical intensity, and daily deliverables side by side to choose your path.
        </p>
      </div>

      {/* Role Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Role #1
          </label>
          <select
            value={selectedRole1}
            onChange={(e) => setSelectedRole1(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
          >
            {CAREER_ROLES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Role #2
          </label>
          <select
            value={selectedRole2}
            onChange={(e) => setSelectedRole2(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
          >
            {CAREER_ROLES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Role #3
          </label>
          <select
            value={selectedRole3}
            onChange={(e) => setSelectedRole3(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
          >
            {CAREER_ROLES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="p-4 sm:p-5 w-1/4">Criteria</th>
                <th className="p-4 sm:p-5 w-1/4 text-brand-600 dark:text-brand-400">
                  {role1.title}
                </th>
                <th className="p-4 sm:p-5 w-1/4 text-brand-600 dark:text-brand-400">
                  {role2.title}
                </th>
                <th className="p-4 sm:p-5 w-1/4 text-brand-600 dark:text-brand-400">
                  {role3.title}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/70 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-bold text-gray-900 dark:text-white bg-gray-50/40 dark:bg-gray-900/20">
                    {row.category}
                  </td>
                  <td className="p-4 sm:p-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {row.val1}
                  </td>
                  <td className="p-4 sm:p-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {row.val2}
                  </td>
                  <td className="p-4 sm:p-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {row.val3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href={`/careers/${role1.slug}`}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors shadow-soft"
          >
            Explore {role1.title} →
          </Link>
          <Link
            href={`/careers/${role2.slug}`}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors shadow-soft"
          >
            Explore {role2.title} →
          </Link>
          <Link
            href={`/careers/${role3.slug}`}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors shadow-soft"
          >
            Explore {role3.title} →
          </Link>
        </div>
      </div>
    </div>
  );
}
