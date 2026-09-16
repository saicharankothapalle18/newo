'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sprout } from 'lucide-react';

interface BeginnerContextType {
  isBeginnerMode: boolean;
  toggleBeginnerMode: () => void;
}

const BeginnerContext = createContext<BeginnerContextType>({
  isBeginnerMode: true,
  toggleBeginnerMode: () => {},
});

export function BeginnerProvider({ children }: { children: React.ReactNode }) {
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cp_beginner_mode');
    if (stored !== null) {
      setIsBeginnerMode(stored === 'true');
    }
  }, []);

  const toggleBeginnerMode = () => {
    setIsBeginnerMode((prev) => {
      const next = !prev;
      localStorage.setItem('cp_beginner_mode', String(next));
      return next;
    });
  };

  return (
    <BeginnerContext.Provider value={{ isBeginnerMode, toggleBeginnerMode }}>
      {children}
    </BeginnerContext.Provider>
  );
}

export function useBeginnerMode() {
  return useContext(BeginnerContext);
}

export default function BeginnerModeToggle() {
  const { isBeginnerMode, toggleBeginnerMode } = useBeginnerMode();

  return (
    <button
      onClick={toggleBeginnerMode}
      title={isBeginnerMode ? 'Beginner Mode ON: Explanations are simplified' : 'Technical Mode ON'}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
        isBeginnerMode
          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/60 shadow-sm'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
      }`}
    >
      <Sprout className={`w-3.5 h-3.5 ${isBeginnerMode ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
      <span>{isBeginnerMode ? '🌱 Beginner Mode' : '⚙️ Technical Mode'}</span>
    </button>
  );
}
