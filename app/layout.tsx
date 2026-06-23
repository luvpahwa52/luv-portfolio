// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import CinematicIntro from '@/components/CinematicIntro';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import CursorGlow from '@/components/CursorGlow';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Luv Pahwa — Engineer',
  description: 'Cloud & Infra Engineer building with intent.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise relative antialiased">
        {/* Cinematic cold open — runs on every fresh load */}
        <CinematicIntro />

        {/* Aurora background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="aurora-blob blob-1" />
          <div className="aurora-blob blob-2" />
          <div className="aurora-blob blob-3" />
          <div className="aurora-blob blob-4" />
        </div>

        {/* Smooth scroll wrapper */}
        <SmoothScroll>
          <CursorGlow />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}