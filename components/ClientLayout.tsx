'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BeginnerProvider } from './BeginnerModeToggle';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import AIAssistantModal from './AIAssistantModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  // Hidden admin access hotkey: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleAdminHotkey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        router.push('/admin');
      }
    };
    window.addEventListener('keydown', handleAdminHotkey);
    return () => window.removeEventListener('keydown', handleAdminHotkey);
  }, [router]);

  return (
    <BeginnerProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <AIAssistantModal />
      </div>
    </BeginnerProvider>
  );
}
