'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Lock,
  Unlock,
  Database,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Layers,
  Map,
  BookOpen,
  FolderGit2,
  AlertTriangle,
} from 'lucide-react';
import { COURSES, CAREER_ROLES, FULLSTACK_ROADMAP, PROJECTS, RESOURCES } from '@/lib/data';
import { Course, CareerRole, RoadmapNode } from '@/lib/types';

export default function HiddenAdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tabs: 'courses' | 'careers' | 'roadmaps' | 'database'
  const [activeTab, setActiveTab] = useState<'courses' | 'careers' | 'roadmaps' | 'database'>('database');

  // Local state for editable items
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES);
  const [careersList, setCareersList] = useState<CareerRole[]>(CAREER_ROLES);
  const [nodesList, setNodesList] = useState<RoadmapNode[]>(FULLSTACK_ROADMAP);

  // Form states for adding new course
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseShort, setNewCourseShort] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  // Sync state
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);

  useEffect(() => {
    // Check if session was unlocked
    const sessionKey = sessionStorage.getItem('cp_admin_unlocked');
    if (sessionKey === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'careerpath_admin_2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('cp_admin_unlocked', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cp_admin_unlocked');
  };

  const handleSyncDatabase = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: 'careerpath_admin_2026' }),
      });
      const data = await res.json();
      setSyncResult(data);
    } catch (err: any) {
      setSyncResult({ error: err.message });
    } finally {
      setSyncing(false);
    }
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim() || !newCourseShort.trim()) return;

    const newC: Course = {
      id: newCourseShort.toLowerCase().replace(/\s+/g, '-'),
      slug: newCourseShort.toLowerCase().replace(/\s+/g, '-'),
      name: newCourseName,
      shortName: newCourseShort.toUpperCase(),
      description: newCourseDesc || 'Engineering branch overview and industry curriculum.',
      icon: '🎓',
      subjects: ['Core Engineering Subjects', 'Mathematics & Systems'],
      skills: ['Programming', 'Technical Analysis'],
      domains: ['Software Development', 'Technical Engineering'],
      careerCount: 4,
    };

    setCoursesList([newC, ...coursesList]);
    setNewCourseName('');
    setNewCourseShort('');
    setNewCourseDesc('');
  };

  const handleDeleteCourse = (id: string) => {
    setCoursesList(coursesList.filter((c) => c.id !== id));
  };

  // Login Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              CareerPath Admin Panel
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Hidden management console. Enter the secure admin passkey to proceed.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Admin Security Passkey
              </label>
              <input
                type="password"
                required
                autoFocus
                value={passkeyInput}
                onChange={(e) => {
                  setPasskeyInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter secret passkey..."
                className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-brand-500"
              />
              {authError && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Invalid passkey. Access denied.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-soft transition-all"
            >
              Authenticate & Unlock Console
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-gray-400">
            Confidential • Authorized CareerPath Administrators Only
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                CareerPath Hidden Administration
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-bold uppercase">
                HIDDEN / UNLISTED
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Connected to InsForge BaaS project: <strong>stu</strong>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-semibold self-start sm:self-auto"
        >
          Lock & Exit
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'database'
              ? 'bg-brand-600 text-white shadow-soft'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>InsForge DB Sync</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'courses'
              ? 'bg-brand-600 text-white shadow-soft'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Courses ({coursesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('careers')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'careers'
              ? 'bg-brand-600 text-white shadow-soft'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Career Roles ({careersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmaps')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'roadmaps'
              ? 'bg-brand-600 text-white shadow-soft'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Roadmap Nodes ({nodesList.length})</span>
        </button>
      </div>

      {/* Tab: InsForge Database Sync */}
      {activeTab === 'database' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              InsForge PostgreSQL Database Status
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Synchronize courses, career pathways, roadmap checkpoints, and schema directly with your live InsForge database.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-sm text-gray-900 dark:text-white">
                Live InsForge BaaS Backend
              </div>
              <div className="text-xs text-gray-500 font-mono mt-0.5">
                Host: mscw7kcp.ap-southeast.insforge.app
              </div>
            </div>

            <button
              onClick={handleSyncDatabase}
              disabled={syncing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs shadow-soft transition-all shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing to InsForge...' : 'Sync & Seed Database'}</span>
            </button>
          </div>

          {syncResult && (
            <div
              className={`p-4 rounded-2xl text-xs ${
                syncResult.success
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-300'
                  : 'bg-red-50 dark:bg-red-950/40 border border-red-300 text-red-900 dark:text-red-300'
              }`}
            >
              {syncResult.success ? (
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{syncResult.message}</span>
                  </div>
                  <div className="font-mono text-[11px] pt-1">
                    Stats: {syncResult.stats.courses} Courses • {syncResult.stats.careers} Careers • {syncResult.stats.progressRows} User Progress Rows
                  </div>
                </div>
              ) : (
                <div>Sync Error: {syncResult.error}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab: Courses Management */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Add Course Form */}
          <form
            onSubmit={handleAddCourse}
            className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-4"
          >
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-brand-600" />
              <span>Add New Course</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                required
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Course Full Name (e.g. Biomedical Engineering)"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <input
                type="text"
                required
                value={newCourseShort}
                onChange={(e) => setNewCourseShort(e.target.value)}
                placeholder="Short Code (e.g. BME)"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <input
                type="text"
                value={newCourseDesc}
                onChange={(e) => setNewCourseDesc(e.target.value)}
                placeholder="Short description..."
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors"
              >
                Add Course to Catalog
              </button>
            </div>
          </form>

          {/* Existing Courses Table */}
          <div className="rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Icon</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Code</th>
                    <th className="p-4">Domains</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {coursesList.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="p-4 text-xl">{c.icon}</td>
                      <td className="p-4 font-bold text-gray-900 dark:text-white">{c.name}</td>
                      <td className="p-4 font-mono text-brand-600 dark:text-brand-400">{c.shortName}</td>
                      <td className="p-4 text-gray-500">{c.domains.slice(0, 2).join(', ')}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteCourse(c.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Careers Management */}
      {activeTab === 'careers' && (
        <div className="rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Role Title</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4">Key Technologies</th>
                  <th className="p-4 text-right">Roadmap Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {careersList.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{car.title}</td>
                    <td className="p-4 text-gray-500">{car.domain}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {car.difficulty}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{car.technologies.slice(0, 3).join(', ')}</td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/roadmaps/${car.slug}`}
                        target="_blank"
                        className="text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        View Tree ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Roadmap Nodes Management */}
      {activeTab === 'roadmaps' && (
        <div className="rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Milestone Title</th>
                  <th className="p-4">Topics Count</th>
                  <th className="p-4">Beginner Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {nodesList.map((node) => (
                  <tr key={node.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="p-4 font-mono font-bold text-brand-600">{node.order}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{node.title}</td>
                    <td className="p-4 text-gray-500">{node.topics.length} topics</td>
                    <td className="p-4 text-gray-500 max-w-md line-clamp-1">
                      {node.beginnerSummary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
