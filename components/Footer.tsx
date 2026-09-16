import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#070a11] border-t border-gray-200 dark:border-gray-800/80 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-soft">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18V17l7 3.5 7-3.5v-5.18L12 15z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Career<span className="text-brand-600 dark:text-brand-400">Path</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Your Course. Your Career. Your Roadmap. Turning college degrees into structured, step-by-step career pathways.
            </p>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Explore Paths
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/courses/cse" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Computer Science (CSE)
                </Link>
              </li>
              <li>
                <Link href="/courses/aiml" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/courses/it" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Information Technology
                </Link>
              </li>
              <li>
                <Link href="/courses/bca" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  BCA & B.Sc CS
                </Link>
              </li>
            </ul>
          </div>

          {/* Roadmaps & Learning Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Roadmaps
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/careers/full-stack-developer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Full Stack Developer
                </Link>
              </li>
              <li>
                <Link href="/careers/frontend-developer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Frontend Developer
                </Link>
              </li>
              <li>
                <Link href="/careers/ai-engineer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  AI & ML Engineer
                </Link>
              </li>
              <li>
                <Link href="/careers/data-analyst" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Data Analyst
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
              Tools & Prep
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/generator" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Personalized Roadmap
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Portfolio Projects
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Weekly Study Planner
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Career Comparison
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} CareerPath. Built for ambitious students starting from zero.</p>
          <div className="flex items-center gap-6">
            <span>Powered by InsForge BaaS</span>
            <a
              href="https://roadmap.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-500 transition-colors underline"
            >
              Roadmap.sh Reference
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
