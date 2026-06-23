// components/Skills.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Category = {
  id: string;
  label: string;
  number: string;
  caption: string;
  hue: string;
  skills: string[];
};

const categories: Category[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    number: '01',
    caption: 'Where systems live and breathe.',
    hue: 'rgba(122, 162, 247, 0.12)',
    skills: ['AWS', 'Azure', 'Bedrock', 'EC2', 'S3', 'Lambda', 'CloudWatch', 'IAM'],
  },
  {
    id: 'ai',
    label: 'Intelligence',
    number: '02',
    caption: 'Reasoning, retrieval, and agents.',
    hue: 'rgba(187, 154, 247, 0.12)',
    skills: ['LangChain', 'LangGraph', 'RAG', 'Azure OpenAI', 'ChromaDB', 'Multi-Agent'],
  },
  {
    id: 'lang',
    label: 'Languages',
    number: '03',
    caption: 'The grammar of every build.',
    hue: 'rgba(158, 206, 106, 0.12)',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    id: 'devops',
    label: 'DevOps',
    number: '04',
    caption: 'Shipping, quietly and reliably.',
    hue: 'rgba(247, 118, 142, 0.12)',
    skills: ['Docker', 'Git', 'CI/CD', 'Linux', 'Nginx'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    number: '05',
    caption: 'The scaffolding of fast ideas.',
    hue: 'rgba(224, 175, 104, 0.12)',
    skills: ['Next.js', 'FastAPI', 'Streamlit', 'TailwindCSS', 'Framer Motion'],
  },
  {
    id: 'data',
    label: 'Data',
    number: '06',
    caption: 'Signal pulled from noise.',
    hue: 'rgba(42, 195, 222, 0.12)',
    skills: ['Pandas', 'NumPy', 'Vector DBs', 'Dashboards'],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <section
      id="skills"
      className="relative w-full min-h-screen overflow-hidden scroll-mt-24"
    >
      {/* shifting hue background */}
      <AnimatePresence>
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${current.hue} 0%, transparent 60%)`,
          }}
        />
      </AnimatePresence>

      {/* grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ============================================
          SECTION HEADER — tagline + heading
          ============================================ */}
      <div className="relative pt-20 md:pt-28 px-6 md:px-16">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block h-px w-12 bg-white/60 origin-left"
          />
          <p className="text-[11px] tracking-[0.4em] text-white/70 uppercase">
            Chapter — Craft
          </p>
        </motion.div>

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-4xl md:text-6xl font-light tracking-tight text-white leading-[1.05]"
        >
          The tools,{' '}
          <span className="text-white/50 italic">quietly mastered.</span>
        </motion.h2>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 max-w-xl text-base md:text-lg text-zinc-300 leading-relaxed"
        >
          A live inventory of the stack I think, ship, and scale with —
          grouped by the role each plays in the system.
        </motion.p>

        {/* divider handoff */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent origin-left"
        />
      </div>

      {/* ============================================
          SPLIT LAYOUT — categories + skills
          ============================================ */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 px-6 md:px-16 py-12 md:py-16 min-h-[70vh] items-center">

        {/* LEFT — giant category title */}
        <div className="relative flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm tabular-nums tracking-[0.3em] text-white/40 mb-4"
              >
                {current.number} / {String(categories.length).padStart(2, '0')}
              </motion.p>
              <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-white leading-[0.95]">
                {current.label.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 text-zinc-300 italic text-base md:text-lg max-w-sm leading-relaxed"
              >
                {current.caption}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* nav dots */}
          <div className="mt-14 flex flex-col gap-1">
            {categories.map((cat, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="group flex items-center gap-5 text-left py-2.5"
                >
                  {/* animated line */}
                  <motion.span
                    animate={{
                      width: isActive ? 56 : 20,
                      backgroundColor: isActive
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(255,255,255,0.3)',
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] rounded-full group-hover:bg-white/70"
                    style={
                      isActive
                        ? { boxShadow: '0 0 12px rgba(255,255,255,0.5)' }
                        : {}
                    }
                  />

                  {/* number */}
                  <motion.span
                    animate={{
                      color: isActive
                        ? 'rgba(255,255,255,0.9)'
                        : 'rgba(255,255,255,0.35)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xs tabular-nums tracking-[0.2em] group-hover:text-white/70"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.span>

                  {/* label */}
                  <motion.span
                    animate={{
                      color: isActive
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(255,255,255,0.45)',
                      letterSpacing: isActive ? '0.35em' : '0.25em',
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-sm md:text-base font-light uppercase group-hover:text-white"
                    style={
                      isActive
                        ? { textShadow: '0 0 20px rgba(255,255,255,0.3)' }
                        : {}
                    }
                  >
                    {cat.label}
                  </motion.span>

                  {/* active glow dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="h-1.5 w-1.5 rounded-full bg-white"
                      style={{ boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — skills cascade */}
        <div className="relative flex flex-col justify-center min-h-[400px]">
          {/* vertical divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:block absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent origin-top"
          />

          <AnimatePresence mode="wait">
            <motion.ul
              key={current.id}
              className="flex flex-col gap-2 md:gap-3"
            >
              {current.skills.map((skill, i) => (
                <motion.li
                  key={`${current.id}-${skill}`}
                  initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ x: 12 }}
                  className="group flex items-center gap-5 cursor-default"
                >
                  <span className="text-[11px] tabular-nums text-white/30 group-hover:text-white/70 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative text-2xl md:text-3xl font-light text-white/90 group-hover:text-white transition-colors duration-300">
                    {skill}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-white/80"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* footer bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative px-6 md:px-16 pb-12 flex items-center justify-between text-[11px] tracking-[0.3em] text-white/40 uppercase"
      >
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block h-1.5 w-1.5 rounded-full bg-white"
          />
          Now showing — {current.label}
        </span>
        <span>scene {current.number}</span>
      </motion.div>
    </section>
  );
}