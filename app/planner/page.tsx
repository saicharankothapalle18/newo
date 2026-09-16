'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Plus,
  Check,
  CheckCircle2,
  Trash2,
  Sparkles,
  Flame,
} from 'lucide-react';
import { INITIAL_STUDY_PLAN } from '@/lib/data';
import { StudyTask } from '@/lib/types';

export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState<StudyTask[]>(INITIAL_STUDY_PLAN);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDay, setNewDay] = useState<StudyTask['day']>('Monday');
  const [newTopic, setNewTopic] = useState('');
  const [newDuration, setNewDuration] = useState('1.5');

  useEffect(() => {
    const saved = localStorage.getItem('cp_study_plan');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveTasks = (updated: StudyTask[]) => {
    setTasks(updated);
    localStorage.setItem('cp_study_plan', JSON.stringify(updated));
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const next = !t.completed;
        if (next) {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 },
          });
        }
        return { ...t, completed: next };
      }
      return t;
    });
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const newTask: StudyTask = {
      id: `st-${Date.now()}`,
      day: newDay,
      topic: newTopic.trim(),
      durationHours: parseFloat(newDuration) || 1.0,
      completed: false,
    };

    saveTasks([...tasks, newTask]);
    setNewTopic('');
    setShowAddModal(false);
  };

  const days: StudyTask['day'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const totalWeeklyHours = tasks.reduce((sum, t) => sum + Number(t.durationHours), 0);
  const completedWeeklyHours = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + Number(t.durationHours), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Study Routine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Weekly Learning Schedule
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Build consistency with a dedicated daily study routine. Plan your hours and check off completed sessions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-soft transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Task</span>
        </button>
      </div>

      {/* Weekly Progress Overview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Weekly Hours Progress
          </span>
          <div className="text-2xl font-black text-gray-900 dark:text-white flex items-baseline gap-2">
            <span>{completedWeeklyHours.toFixed(1)} hrs completed</span>
            <span className="text-xs text-gray-400 font-normal">of {totalWeeklyHours.toFixed(1)} hrs planned</span>
          </div>
        </div>

        <div className="flex-1 max-w-md space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Weekly Completion</span>
            <span>
              {totalWeeklyHours > 0
                ? Math.round((completedWeeklyHours / totalWeeklyHours) * 100)
                : 0}
              %
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-300"
              style={{
                width: `${
                  totalWeeklyHours > 0 ? (completedWeeklyHours / totalWeeklyHours) * 100 : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 7 Days Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {days.map((day) => {
          const dayTasks = tasks.filter((t) => t.day === day);
          const allCompleted = dayTasks.length > 0 && dayTasks.every((t) => t.completed);

          return (
            <div
              key={day}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                allCompleted
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-[#0c121e] border-gray-200 dark:border-gray-800 shadow-soft'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{day}</h3>
                  <span className="text-[11px] font-semibold text-gray-400">
                    {dayTasks.reduce((sum, t) => sum + Number(t.durationHours), 0)} hrs
                  </span>
                </div>

                <div className="space-y-2">
                  {dayTasks.length === 0 ? (
                    <div className="text-xs text-gray-400 italic py-2">No tasks scheduled</div>
                  ) : (
                    dayTasks.map((t) => (
                      <div
                        key={t.id}
                        className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 group transition-colors ${
                          t.completed
                            ? 'bg-emerald-100/60 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 line-through'
                            : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => toggleTask(t.id)}
                          className="flex items-start gap-2 flex-1 text-left"
                        >
                          <div
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                              t.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {t.completed && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="font-semibold">{t.topic}</div>
                            <div className="text-[10px] text-gray-400 font-normal">
                              {t.durationHours} hrs
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#0c121e] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Add Study Plan Task
            </h3>
            <form onSubmit={handleAddTask} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-500 font-semibold mb-1">Day of the Week</label>
                <select
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value as StudyTask['day'])}
                  className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Topic / Milestone</label>
                <input
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. React Custom Hooks or SQL Joins"
                  className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-500 font-semibold mb-1">Study Duration (Hours)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="12"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-soft transition-all"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
