'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  GraduationCap,
  Flame,
  Award,
  BookOpen,
  FolderGit2,
  Clock,
  CheckCircle2,
  Edit2,
  Save,
  Sparkles,
} from 'lucide-react';
import { ACHIEVEMENTS } from '@/lib/data';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Charan');
  const [course, setCourse] = useState('Computer Science Engineering (CSE)');
  const [year, setYear] = useState('3rd Year');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [careerGoal, setCareerGoal] = useState('Full Stack Developer');
  const [weeklyGoal, setWeeklyGoal] = useState('10');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const pStr = localStorage.getItem('cp_personalized_profile');
    if (pStr) {
      try {
        const p = JSON.parse(pStr);
        if (p.course) setCourse(p.course);
        if (p.year) setYear(p.year);
        if (p.skillLevel) setSkillLevel(p.skillLevel);
        if (p.careerGoal) setCareerGoal(p.careerGoal);
      } catch (e) {}
    }

    const email = localStorage.getItem('cp_user_email');
    if (email) {
      setName(email.split('@')[0]);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    const profile = {
      name,
      course,
      year,
      skillLevel,
      careerGoal,
      weeklyGoalHours: parseInt(weeklyGoal) || 10,
    };
    localStorage.setItem('cp_personalized_profile', JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Toast */}
      {savedSuccess && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold shadow-2xl animate-in fade-in">
          ✓ Profile updated successfully!
        </div>
      )}

      {/* Header Profile Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center font-bold text-2xl shadow-soft">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                {name}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {course} • {year}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors self-start sm:self-auto"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Form or Read View */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-8 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6 animate-in fade-in"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Edit Academic Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-gray-500 font-semibold mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-semibold mb-1">Degree / Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-semibold mb-1">College Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-semibold mb-1">Target Career Goal</label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-soft transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Learning Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Roadmap Progress
          </span>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
            42%
          </div>
          <p className="text-xs text-brand-600 dark:text-brand-400 mt-0.5">4 of 10 nodes done</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Skills Mastered
          </span>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
            14
          </div>
          <p className="text-xs text-brand-600 dark:text-brand-400 mt-0.5">HTML, CSS, JS, Git...</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Projects Built
          </span>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
            2
          </div>
          <p className="text-xs text-brand-600 dark:text-brand-400 mt-0.5">Portfolio, To-do App</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Current Streak
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1 flex items-center gap-1">
            <span>7</span>
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Days consistent</p>
        </div>
      </div>

      {/* Subtle Achievements Section */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h2>Milestones & Badges</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Subtle milestones recognizing your dedication to consistent learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                ach.unlocked
                  ? 'bg-brand-50/40 dark:bg-brand-950/20 border-brand-200 dark:border-brand-800/80'
                  : 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800/60 opacity-60'
              }`}
            >
              <div className="text-2xl p-2 rounded-xl bg-white dark:bg-gray-800 shadow-xs">
                {ach.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {ach.title}
                  </h3>
                  {ach.unlocked && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {ach.description}
                </p>
                {ach.unlockedAt && (
                  <span className="text-[10px] text-gray-400 font-mono block mt-1">
                    Unlocked {ach.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
