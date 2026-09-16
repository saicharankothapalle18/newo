'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Compass, Map, FolderGit2, BookOpen, X, ArrowRight } from 'lucide-react';
import { COURSES, CAREER_ROLES, PROJECTS, RESOURCES } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingCourses = q
    ? COURSES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchingCareers = q
    ? CAREER_ROLES.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          c.mainSkills.some((s) => s.toLowerCase().includes(q)) ||
          c.technologies.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchingProjects = q
    ? PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.skillsLearned.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchingResources = q
    ? RESOURCES.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.skillTag.toLowerCase().includes(q) ||
          r.provider.toLowerCase().includes(q)
      )
    : [];

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f1523] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-100 dark:border-gray-800/80">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, career roles, skills, projects, resources..."
            className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-8 text-center text-sm text-gray-400">
              <p>Type anything: <span className="text-brand-500 font-medium">CSE</span>, <span className="text-brand-500 font-medium">Full Stack</span>, <span className="text-brand-500 font-medium">React</span>, <span className="text-brand-500 font-medium">Python</span>, or <span className="text-brand-500 font-medium">SQL</span></p>
            </div>
          )}

          {/* Courses */}
          {matchingCourses.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Courses & Branches
              </div>
              <div className="space-y-1">
                {matchingCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleSelect(`/courses/${course.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{course.icon}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {course.name} ({course.shortName})
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-1">{course.description}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Career Roles */}
          {matchingCareers.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Map className="w-3.5 h-3.5" />
                Career Roles & Roadmaps
              </div>
              <div className="space-y-1">
                {matchingCareers.map((career) => (
                  <button
                    key={career.id}
                    onClick={() => handleSelect(`/careers/${career.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {career.title}
                        <span className="ml-2 text-xs font-normal text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full">
                          {career.domain}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-1">{career.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {matchingProjects.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5" />
                Recommended Projects
              </div>
              <div className="space-y-1">
                {matchingProjects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelect('/projects')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">
                        {proj.title}
                        <span className="ml-2 text-xs text-gray-500">[{proj.difficulty}]</span>
                      </div>
                      <div className="text-xs text-gray-400">{proj.technologies.join(', ')}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {matchingResources.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Learning Resources
              </div>
              <div className="space-y-1">
                {matchingResources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">
                        {res.title}
                      </div>
                      <div className="text-xs text-gray-400">{res.provider} • {res.type} • {res.level}</div>
                    </div>
                    <span className="text-xs text-brand-600 dark:text-brand-400">Open ↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {q && matchingCourses.length === 0 && matchingCareers.length === 0 && matchingProjects.length === 0 && matchingResources.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;Full Stack&rdquo;, &ldquo;CSE&rdquo;, or &ldquo;Python&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
