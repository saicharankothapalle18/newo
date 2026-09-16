'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Calendar,
  Layers,
  Code2,
  Heart,
  Clock,
  Check,
} from 'lucide-react';
import { COURSES, CAREER_ROLES, FULLSTACK_ROADMAP } from '@/lib/data';

export default function PersonalizedGeneratorPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [course, setCourse] = useState('CSE');
  const [year, setYear] = useState('2nd Year');
  const [level, setLevel] = useState('Beginner');
  const [knownTechs, setKnownTechs] = useState<string[]>(['HTML/CSS', 'Basic Python']);
  const [interest, setInterest] = useState('Web Development');
  const [studyTime, setStudyTime] = useState('1 hour/day');
  const [isGenerated, setIsGenerated] = useState(false);

  const techOptions = [
    'HTML/CSS',
    'JavaScript',
    'Python',
    'Java',
    'C / C++',
    'SQL / Databases',
    'Git & GitHub',
    'React',
    'None / Complete Beginner',
  ];

  const toggleTech = (t: string) => {
    if (t === 'None / Complete Beginner') {
      setKnownTechs(['None / Complete Beginner']);
      return;
    }
    const filtered = knownTechs.filter((x) => x !== 'None / Complete Beginner');
    if (filtered.includes(t)) {
      setKnownTechs(filtered.filter((x) => x !== t));
    } else {
      setKnownTechs([...filtered, t]);
    }
  };

  const handleFinish = () => {
    // Save to localStorage for dashboard personalization
    const profile = {
      course,
      year,
      skillLevel: level,
      knownTechs,
      careerGoal: interest === 'AI/ML' ? 'AI / Machine Learning Engineer' : 'Full Stack Developer',
      studyTime,
      generatedAt: new Date().toISOString(),
    };
    localStorage.setItem('cp_personalized_profile', JSON.stringify(profile));
    localStorage.setItem('cp_current_career', profile.careerGoal);

    setIsGenerated(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {!isGenerated ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-soft space-y-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Step {step} of 6 — Personalized Roadmap Generator
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {Math.round((step / 6) * 100)}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Question 1: What are you studying? */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  What course or branch are you studying?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  We customize the starting point based on your degree curriculum.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'CSE',
                  'AIML',
                  'IT',
                  'ECE',
                  'EEE',
                  'Mechanical',
                  'Civil',
                  'BCA',
                  'B.Sc CS',
                  'Diploma (Polytechnic)',
                  'Other Non-Tech Degree',
                ].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCourse(c)}
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                      course === c
                        ? 'bg-brand-600 text-white border-brand-600 shadow-soft'
                        : 'bg-gray-50 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Which year are you in? */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  Which college year are you in?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Adjusts roadmap urgency and placement preparation priority.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['1st Year (Freshman)', '2nd Year (Sophomore)', '3rd Year (Pre-Final)', 'Final Year (Senior)', 'Recent Graduate / Fresher'].map(
                  (y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={`p-4 rounded-2xl text-sm font-semibold border transition-all text-left flex items-center justify-between ${
                        year === y
                          ? 'bg-brand-600 text-white border-brand-600 shadow-soft'
                          : 'bg-gray-50 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <span>{y}</span>
                      {year === y && <Check className="w-4 h-4" />}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Question 3: Current skill level? */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  What is your current coding skill level?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Be completely honest. We love beginners!
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Complete Beginner 🌱',
                    desc: 'Never written a line of code or just heard about programming.',
                    val: 'Complete Beginner',
                  },
                  {
                    title: 'Beginner 🚀',
                    desc: 'Know basic variables, if/else, and loops in C/C++/Java/Python.',
                    val: 'Beginner',
                  },
                  {
                    title: 'Intermediate ⚡',
                    desc: 'Built a simple website or small project before. Understand functions and arrays.',
                    val: 'Intermediate',
                  },
                  {
                    title: 'Advanced 🏆',
                    desc: 'Comfortable with full-stack concepts, APIs, and databases.',
                    val: 'Advanced',
                  },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setLevel(item.val)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      level === item.val
                        ? 'bg-brand-600 text-white border-brand-600 shadow-soft'
                        : 'bg-gray-50 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-bold text-sm">{item.title}</div>
                    <div
                      className={`text-xs mt-1 ${
                        level === item.val ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Technologies already known? */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  What technologies do you already know?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Select all that apply. We will skip what you already know so you don&apos;t waste time.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {techOptions.map((t) => {
                  const isChecked = knownTechs.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTech(t)}
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center flex items-center justify-between ${
                        isChecked
                          ? 'bg-brand-600 text-white border-brand-600 shadow-soft'
                          : 'bg-gray-50 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <span>{t}</span>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question 5: What interests you? */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  What technical domain interests you most?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  We will tailor the roadmap around this target area.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Web Development (Full Stack / Frontend)', val: 'Web Development' },
                  { name: 'Artificial Intelligence & Machine Learning', val: 'AI/ML' },
                  { name: 'Data Analytics & Business Intelligence', val: 'Data' },
                  { name: 'Cloud Computing & DevOps', val: 'Cloud' },
                  { name: 'Cybersecurity & Ethical Hacking', val: 'Cybersecurity' },
                  { name: 'Mobile App Development', val: 'Mobile Development' },
                  { name: 'Not Sure Yet (Guide Me)', val: 'Not Sure' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setInterest(item.val)}
                    className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold border text-left transition-all flex items-center justify-between ${
                      interest === item.val
                        ? 'bg-brand-600 text-white border-brand-600 shadow-soft'
                        : 'bg-gray-50 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.name}</span>
                    {interest === item.val && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 6: Study time per day? */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  How much time can you realistically study every day?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Consistency beats long cramming sessions!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['30 minutes / day', '1 hour / day', '2 hours / day', '3+ hours / day'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setStudyTime(time)}
                    className={`p-4 rounded-2xl text-sm font-semibold border transition-all text-center ${
                      studyTime === time
                        ? 'bg-brand-600 text-white border-brand-600 shadow-soft'
                        : 'bg-gray-50 dark:bg-gray-900/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-soft transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-bold shadow-soft transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate My Personalized Roadmap</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result: Custom Roadmap Generated Screen */
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c121e] border border-gray-200 dark:border-gray-800 shadow-2xl space-y-8 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-soft">
              <Sparkles className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Your Personalized Roadmap is Ready!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Customized for <strong>{course}</strong> ({year}), target:{' '}
              <strong className="text-brand-600 dark:text-brand-400">{interest}</strong> at{' '}
              <strong>{studyTime}</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Personalized Plan Highlights:
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>Skipped basics:</strong> Since you know{' '}
                  {knownTechs.filter((t) => t !== 'None / Complete Beginner').join(', ') || 'nothing yet'},
                  we tailored milestone 1 to jump directly into interactive projects.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>Target Pace:</strong> At {studyTime}, you will complete the full roadmap in approximately <strong>14 weeks</strong>.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  <strong>Placement Readiness:</strong> Structured around your {year} milestone to prepare you for tech internships.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center shadow-soft transition-all"
            >
              Go to My Student Dashboard →
            </Link>
            <Link
              href="/roadmaps/full-stack-developer"
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 text-xs font-semibold text-center transition-colors"
            >
              Start First Roadmap Milestone
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
