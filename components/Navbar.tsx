'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, FolderGit2, BookOpen, Scale, Search, User, Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import BeginnerModeToggle from './BeginnerModeToggle';

interface NavbarProps {
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('cp_user_email');
    if (email) setUserEmail(email);

    const handleAuthChange = () => {
      const updated = localStorage.getItem('cp_user_email');
      setUserEmail(updated);
    };

    window.addEventListener('cp-auth-change', handleAuthChange);
    return () => window.removeEventListener('cp-auth-change', handleAuthChange);
  }, []);

  const navLinks = [
    { name: 'Explore Careers', href: '/courses', icon: Compass },
    { name: 'Roadmaps', href: '/roadmaps', icon: Map },
    { name: 'Projects', href: '/projects', icon: FolderGit2 },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Compare', href: '/compare', icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-[#090d16]/80 border-b border-gray-200/80 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18V17l7 3.5 7-3.5v-5.18L12 15z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  Career<span className="text-brand-600 dark:text-brand-400">Path</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 dark:text-gray-500">
                  Course → Career
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-80" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 border border-gray-200 dark:border-gray-700/50 transition-colors"
              title="Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Beginner Mode Toggle */}
            <div className="hidden lg:block">
              <BeginnerModeToggle />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Personalized Generator CTA */}
            <Link
              href="/generator"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/60 hover:bg-brand-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized</span>
            </Link>

            {/* User Profile / Dashboard / Sign In */}
            {userEmail ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-soft transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-soft transition-all"
              >
                <span>Get Started</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-2 border-t border-gray-200 dark:border-gray-800 space-y-2 animate-in slide-in-from-top duration-150">
            <div className="pb-2 flex items-center justify-between">
              <BeginnerModeToggle />
              <Link
                href="/generator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalized Roadmap</span>
              </Link>
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icon className="w-4 h-4 text-brand-500" />
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white"
              >
                <User className="w-4 h-4" />
                <span>My Student Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
