import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'CareerPath — Your Course. Your Career. Your Roadmap.',
  description:
    'Discover career roles, skills, interactive roadmaps, and portfolio projects tailored directly to your college branch and degree.',
  keywords: [
    'career roadmap',
    'student learning path',
    'computer science engineering careers',
    'full stack roadmap',
    'beginner coding roadmap',
    'tech jobs for college students',
  ],
  openGraph: {
    title: 'CareerPath — Your Course. Your Career. Your Roadmap.',
    description:
      'Turn your course into a clear path toward your career with interactive roadmaps and projects.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#f8fafc] dark:bg-[#090d16] text-[#0f172a] dark:text-[#f1f5f9] antialiased transition-colors selection:bg-brand-500 selection:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
