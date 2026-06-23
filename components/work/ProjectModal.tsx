'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/lib/projects-data';
import TechConstellation from './TechConstellation';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 top-[5vh] bottom-0 mx-auto max-w-5xl rounded-t-3xl border-t border-white/10 bg-[#0a0a0f] overflow-hidden flex flex-col"
          >
            {/* sticky header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-4 bg-[#0a0a0f]/90 backdrop-blur border-b border-white/5 shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {project.year} · {project.role}
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 rounded-full border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <CaseStudy project={project} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* 1. HERO */}
      <section className={`relative px-6 md:px-16 py-24 md:py-32 bg-gradient-to-br ${project.accent}`}>
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-6">
            Case Study · {project.id}
          </p>
          <h2 className="text-3xl md:text-6xl font-semibold text-white leading-[1.1] tracking-tight">
            {project.tagline}
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/15 backdrop-blur"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM */}
      <Block
        label="The Problem"
        body={project.problem}
        align="left"
        accentBar={project.accent}
      />

      {/* 3. SOLUTION */}
      <Block
        label="The Solution"
        body={project.solution}
        align="right"
        accentBar={project.accent}
      />

      {/* 4. ARCHITECTURE */}
      <section className="px-6 md:px-16 py-20 border-t border-white/5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3"
        >
          Architecture
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-4xl font-semibold text-white mb-12"
        >
          How it&apos;s wired together.
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-4">
          {project.architecture.map((a, idx) => (
            <motion.div
              key={a.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition group overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative">
                <span className="text-white/30 text-xs tabular-nums font-mono">
                  STAGE / 0{idx + 1}
                </span>
                <p className="text-white text-xl font-semibold mt-2">{a.step}</p>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. TECH CONSTELLATION — full width hero moment */}
      <section className="px-6 md:px-16 py-24 border-t border-white/5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3 text-center"
        >
          The Stack
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-4xl font-semibold text-white mb-12 text-center"
        >
          Connected, not stacked.
        </motion.h3>
        <div className="max-w-md mx-auto aspect-square">
          <TechConstellation stack={project.stack} accent={project.accent} />
        </div>
      </section>

      {/* 6. IMPACT */}
      <section className={`relative px-6 md:px-16 py-24 border-t border-white/5 bg-gradient-to-br ${project.accent}`}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3"
          >
            Impact
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-semibold text-white mb-12"
          >
            What shipped.
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-4">
            {project.impact.map((m, idx) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur"
              >
                <span className="text-white/40 text-xs font-mono">0{idx + 1}</span>
                <p className="text-white text-lg font-medium mt-2 leading-snug">{m}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <section className="px-6 md:px-16 py-16 border-t border-white/5 text-center">
        <p className="text-white/40 text-sm font-mono">
          // end of case study · press esc to close
        </p>
      </section>
    </div>
  );
}

function Block({
  label,
  body,
  align,
  accentBar,
}: {
  label: string;
  body: string;
  align: 'left' | 'right';
  accentBar: string;
}) {
  return (
    <section className="px-6 md:px-16 py-20 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className={`max-w-3xl ${align === 'right' ? 'ml-auto text-right' : ''}`}
      >
        <div className={`flex items-center gap-3 mb-4 ${align === 'right' ? 'justify-end' : ''}`}>
          <span className={`h-px w-10 bg-gradient-to-r ${accentBar}`} />
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">{label}</p>
        </div>
        <p className="text-2xl md:text-3xl text-white/90 leading-snug font-medium">
          {body}
        </p>
      </motion.div>
    </section>
  );
}