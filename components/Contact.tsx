'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/lib/data';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.96 10.96 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const CLOSING_LINES = [
  'the next idea is one message away.',
  'good systems start with good conversations.',
  'inbox open · curiosity welcome.',
  "let's ship something worth remembering.",
];

type Channel = {
  label: string;
  handle: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent: string;
  external: boolean;
};

export default function Contact() {
  const [lineIdx, setLineIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setLineIdx((i) => (i + 1) % CLOSING_LINES.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const channels: Channel[] = [
    {
      label: 'github',
      handle: '@luvpahwa',
      href: profile.socials.github,
      Icon: GithubIcon,
      accent: 'from-white/40 to-white/10',
      external: true,
    },
    {
      label: 'linkedin',
      handle: '/in/luvpahwa',
      href: profile.socials.linkedin,
      Icon: LinkedinIcon,
      accent: 'from-cyan-400/40 to-sky-500/10',
      external: true,
    },
    {
      label: 'email',
      handle: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
      accent: 'from-emerald-400/40 to-emerald-500/10',
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden pb-32 scroll-mt-24"
    >
      {/* === Cinematic top line === */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.1, ease: [0.83, 0, 0.17, 1] }}
        style={{ transformOrigin: 'right' }}
        className="absolute bottom-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* === Ambient glows === */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.10),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none" />

      {/* === Subtle grid === */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* === Floating particles === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* === CINEMATIC CHAPTER HEADER === */}
      <SectionHeader
        label="End Credits"
        heading="The end, or the beginning."
        headingAccent="or the beginning."
        tagline="Every system, every essay, every shipped idea — they all started somewhere quiet. Be the next message."
      />

      {/* === MAIN CONTENT === */}
      <div className="relative max-w-5xl mx-auto w-full px-6 md:px-12 mt-16 md:mt-24">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white"
        >
          let&apos;s build
          <br />
          <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
            something worth
          </span>
          <br />
          shipping.
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-emerald-400 ml-2"
          >
            _
          </motion.span>
        </motion.h2>

        <div className="h-8 mt-10 relative max-w-xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIdx}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 text-lg md:text-xl text-white/70 font-light italic"
            >
              {CLOSING_LINES[lineIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 inline-flex items-center gap-3"
        >
          <button
            onClick={copyEmail}
            className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/30 transition-all backdrop-blur-sm"
          >
            <Mail className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-sm text-white/90">
              {profile.email}
            </span>
            <span className="ml-1 text-white/40 group-hover:text-white/80 transition">
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </span>
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="font-mono text-xs text-emerald-400 uppercase tracking-[0.2em]"
              >
                copied ✓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {channels.map((c, i) => {
            const Icon = c.Icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-white/25 transition-colors"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white/90" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                        {c.label}
                      </p>
                      <p className="font-mono text-sm text-white/85 mt-0.5">
                        {c.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}