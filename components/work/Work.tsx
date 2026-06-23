'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/lib/projects-data';
import ProjectModal from './ProjectModal';
import SectionHeader from '@/components/SectionHeader';

const sizeMap: Record<Project['size'], string> = {
  lg: 'md:col-span-4 md:row-span-2 md:min-h-[340px]',
  md: 'md:col-span-2 md:row-span-2 md:min-h-[340px]',
  sm: 'md:col-span-2 md:row-span-1 md:min-h-[200px]',
};

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section
      id="work"
      aria-label="Selected work by Luv Pahwa"
      className="relative pb-20 md:pb-32"
    >
      {/* === CINEMATIC CHAPTER HEADER === */}
      <SectionHeader
        label="Field Notes"
        heading="Things I've shipped."
        headingAccent="shipped."
        tagline="Selected work from the lab — where ideas meet production. Tap any tile to dive into the story: problem, architecture, and what shipped."
      />

      {/* === BENTO GRID === */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[160px] gap-4 md:gap-5">
          {projects.map((p, i) => (
            <BentoCard
              key={p.id ?? i}
              project={p}
              index={i}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* ----------------------- Bento Card ----------------------- */
function BentoCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative text-left rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] p-5 md:p-6 overflow-hidden transition-colors hover:border-white/25 ${sizeMap[project.size]}`}
    >
      {/* gradient wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(122,162,247,0.10), transparent 60%)',
        }}
      />

      {/* content */}
      <div className="relative flex flex-col h-full justify-between">
        {/* top row */}
        <div className="flex items-start justify-between">
          <p className="font-mono text-[11px] tracking-widest uppercase text-white/50">
            {project.year} · {project.role.split('·')[0].trim()}
          </p>
          <span className="text-white/40 group-hover:text-white transition-colors text-lg">
            ↗
          </span>
        </div>

        {/* bottom block */}
        <div className="mt-8">
          <h3 className="text-xl md:text-2xl font-light tracking-tight text-white leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/65 leading-relaxed max-w-md">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] tracking-wider uppercase text-white/55 border border-white/15 px-2 py-1 rounded"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="font-mono text-[10px] tracking-wider uppercase text-white/45 px-2 py-1">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}