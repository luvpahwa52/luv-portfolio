'use client';

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { profile } from '@/lib/data';
import Terminal from './Terminal';
import HeroAmbient from './HeroAmbient';
import { motion, type Variants } from "framer-motion";

const POETIC_LINES = [
  'building intelligent systems on the cloud.',
  'where infrastructure meets imagination.',
  'turning prompts into production.',
  'shipping ideas at the speed of thought.',
  'engineering quiet, scalable magic.',
];

const STATUS_ROTATIONS = [
  { dot: 'bg-emerald-400', label: 'available', detail: 'open to opportunities' },
  { dot: 'bg-cyan-400', label: 'based in', detail: 'Chennai, India · IST' },
  { dot: 'bg-violet-400', label: 'currently building', detail: 'cloudops auditor' },
  { dot: 'bg-amber-400', label: 'writing about', detail: 'agentic RAG & AWS Bedrock' },
];

// === Cinematic entry — runs AFTER intro finishes ===
// Container variants stagger the children for a layered bloom
const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [lineIdx, setLineIdx] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [ready, setReady] = useState(false);

  // wait for intro to clear, then bloom Hero in
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const introWasPlayed = sessionStorage.getItem('intro-played');
    const introDone = sessionStorage.getItem('intro-done');

    // If intro already finished (later navigation) → animate immediately
    if (introDone) {
      setReady(true);
      return;
    }

    // If intro is/will play → wait the intro duration (~4.2s) then bloom
    // Match this to CinematicIntro's total timeline
    const waitMs = introWasPlayed ? 4200 : 4400;
    const t = setTimeout(() => {
      sessionStorage.setItem('intro-done', '1');
      setReady(true);
    }, waitMs);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const a = setInterval(
      () => setLineIdx((i) => (i + 1) % POETIC_LINES.length),
      4200
    );
    const b = setInterval(
      () => setStatusIdx((i) => (i + 1) % STATUS_ROTATIONS.length),
      3500
    );
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  const status = STATUS_ROTATIONS[statusIdx];

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex items-center px-6 md:px-12 pt-28 md:pt-32 pb-16 overflow-hidden"
    >
      {/* ambient gradient wash — gated by intro */}
<motion.div
  aria-hidden
  initial={{ opacity: 0 }}
  animate={{ opacity: ready ? 1 : 0 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
  className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_40%,rgba(122,162,247,0.12),transparent_55%),radial-gradient(ellipse_at_75%_70%,rgba(187,154,247,0.10),transparent_50%)]"
/>

      <HeroAmbient />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
        className="relative max-w-6xl 2xl:max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 2xl:gap-28 items-center"
      >
        
        {/* LEFT — poetic identity */}
        <div className="space-y-7">
          {/* whoami terminal line */}
          <motion.p
            variants={heroItem}
            className="font-mono text-xs md:text-sm text-accent tracking-widest"
          >
            ~/portfolio $ whoami
          </motion.p>

          {/* name */}
          <motion.h1
          variants={heroItem}
          className="hero-name font-mono font-bold leading-[0.9] tracking-tight text-white"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)' }}
          >
            Luv
            <br />
            Pahwa<span className="text-accent">.</span>
          </motion.h1>

          {/* role */}
          <motion.div variants={heroItem} className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <p
              className="font-mono text-white/85"
              style={{ fontSize: 'clamp(1rem, 1.2vw, 1.5rem)' }}
            >
              {profile.role}
            </p>
          </motion.div>

          {/* rotating poetic tagline */}
          <motion.div variants={heroItem} className="min-h-[3.5rem] md:min-h-[2rem] relative max-w-md">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
                transition={{ duration: 0.6 }}
                className="hero-tagline absolute inset-0 text-white/70 italic font-light"
                style={{ fontSize: 'clamp(1rem, 1.2vw, 1.5rem)' }}
              >
                {POETIC_LINES[lineIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* rotating status pill */}
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm"
          >
            <span className={`relative flex h-2 w-2`}>
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.dot} opacity-60`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${status.dot}`}
              />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs md:text-sm text-white/80"
              >
                {status.label} · {status.detail}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* terminal hint */}
          <motion.p
            variants={heroItem}
            className="font-mono text-xs text-white/50 pt-2"
          >
            ▸ try the terminal · type{' '}
            <span className="text-accent">help</span>
          </motion.p>
        </div>

        {/* RIGHT — Terminal */}
        <motion.div variants={heroItem}>
          <Terminal />
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase"
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}