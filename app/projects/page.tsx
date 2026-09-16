'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  FolderGit2,
  Search,
  CheckCircle2,
  Clock,
  Code2,
  Sparkles,
  Bookmark,
  Check,
  ExternalLink,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { Project, DifficultyLevel } from '@/lib/types';

export default function ProjectsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectStatuses, setProjectStatuses] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cp_project_statuses');
    if (saved) {
      try {
        setProjectStatuses(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const updateStatus = (projId: string, status: string, title: string) => {
    const next = { ...projectStatuses, [projId]: status };
    setProjectStatuses(next);
    localStorage.setItem('cp_project_statuses', JSON.stringify(next));

    if (status === 'completed') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      setToast(`🎉 Congratulations on completing "${title}"!`);
    } else if (status === 'in_progress') {
      setToast(`Started project "${title}". Keep building!`);
    } else {
      setToast(`Status updated for "${title}".`);
    }

    setTimeout(() => setToast(null), 3000);
  };

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.skillsLearned.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesDiff && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-semibold shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-bottom-2">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Hands-On Portfolio Proof</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Practical Developer Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Recruiters hire builders, not certificate collectors. Choose projects suited to your current milestone, follow step-by-step features, and track your builds.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by tech (React, PostgreSQL, API)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-brand-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-colors ${
                selectedDifficulty === d
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const currentStatus = projectStatuses[proj.id] || 'not_started';
          return (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft hover:shadow-soft-lg hover:border-brand-400 dark:hover:border-brand-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {proj.estimatedTime}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      proj.difficulty === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : proj.difficulty === 'Intermediate'
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                    }`}
                  >
                    {proj.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mt-2">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Tech Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`font-semibold capitalize ${
                      currentStatus === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : currentStatus === 'in_progress'
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {currentStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-2">
                <button
                  onClick={() => setActiveProject(proj)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold text-center transition-colors"
                >
                  View Details & Guide
                </button>

                {currentStatus !== 'completed' ? (
                  <button
                    onClick={() =>
                      updateStatus(
                        proj.id,
                        currentStatus === 'in_progress' ? 'completed' : 'in_progress',
                        proj.title
                      )
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      currentStatus === 'in_progress'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-brand-600 text-white hover:bg-brand-700'
                    }`}
                  >
                    {currentStatus === 'in_progress' ? 'Complete ✓' : 'Start'}
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(proj.id, 'not_started', proj.title)}
                    className="py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
                  >
                    Completed ✓
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0c121e] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {activeProject.difficulty} Project • {activeProject.estimatedTime}
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Core Features to Implement */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Core Features to Implement:
              </h4>
              <ul className="space-y-2">
                {activeProject.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300"
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Extensions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Suggested Bonus Extensions:
              </h4>
              <ul className="space-y-2">
                {activeProject.extensions.map((ext, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/60 text-xs text-brand-950 dark:text-brand-200"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{ext}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateStatus(activeProject.id, 'completed', activeProject.title);
                  setActiveProject(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft transition-all"
              >
                Mark Project Completed ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
