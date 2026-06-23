'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/lib/data';
import SectionHeader from './SectionHeader';

type Pillar = {
  id: string;
  label: string;
  cmd: string;
  title: string;
  body: string;
  bullets: string[];
  quote: string;
  tags: string[];
};

const pillars: Pillar[] = [
  {
    id: 'build',
    label: 'build',
    cmd: 'cat build.md',
    title: 'What I build',
    body: 'Agentic AI workflows, hybrid RAG systems, and cloud-native tools. I take proof-of-concepts and turn them into production-grade systems people actually use.',
    bullets: [
      'multi-agent orchestration with LangGraph',
      'hybrid retrieval (vector + BM25) with reranking',
      'cloud-native pipelines on AWS & Azure',
      'AI services that ship and scale',
    ],
    quote: 'production-first, always',
    tags: ['Agentic AI', 'RAG', 'Cloud-native', 'Multi-agent'],
  },
  {
    id: 'think',
    label: 'think',
    cmd: 'cat think.md',
    title: 'How I think',
    body: 'Systems thinking first. I obsess over correctness, cost, and clarity. The fun part is the architecture; the win is the system staying up at 3am.',
    bullets: [
      'design for the failure case, not the happy path',
      'observability is not optional',
      'cost is a feature, not an afterthought',
      'clarity beats cleverness',
    ],
    quote: "if it breaks at scale, it didn't ship",
    tags: ['Systems', 'Production-first', 'Cost-aware'],
  },
  {
    id: 'stack',
    label: 'stack',
    cmd: 'cat stack.md',
    title: 'My stack',
    body: 'Real tools for real problems. AWS and Azure on the cloud side. Python, TypeScript, LangChain, LangGraph, and vector DBs for the AI side.',
    bullets: [
      'AWS · Bedrock · S3 · Lambda · ECS',
      'Azure · OpenAI · Functions · AI Search',
      'Python · TypeScript · Bash',
      'LangChain · LangGraph · ChromaDB · BM25',
    ],
    quote: 'real tools, real problems',
    tags: ['AWS', 'Azure', 'Python', 'LangGraph'],
  },
  {
    id: 'beyond',
    label: 'beyond',
    cmd: 'cat beyond.md',
    title: 'Beyond code',
    body: 'I write to learn out loud. AI engineering is part craft, part empathy. Coffee, terminals, and good design make the work better.',
    bullets: [
      'writing about what I build & break',
      'thinking deeply about agentic UX',
      'side-quests in design & typography',
      'forever curious, forever shipping',
    ],
    quote: 'engineering meets craft',
    tags: ['Writing', 'Curiosity', 'Craft'],
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Luv Pahwa — Cloud and AI Engineer"
      className="relative pb-20 md:pb-32"
    >
      {/* Cinematic chapter header */}
      <SectionHeader
        label="Origin"
        heading="The engineer behind the screen."
        headingAccent="behind the screen."
        tagline="Cloud by day, systems by night — building with curiosity and intent."
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 mt-16 md:mt-24">
        {/* Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20 border border-border rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] p-6 md:p-10 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,255,136,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.5) 1px,transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden
          />
          <div className="relative flex flex-col md:flex-row items-start gap-8">
            <Avatar />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs md:text-sm text-accent mb-3 tracking-widest uppercase">
                identity
              </p>
              <h3 className="font-mono text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
                {profile.name}
              </h3>
              <p className="font-mono text-base md:text-lg text-white/90 mb-6">
                {profile.role} &mdash; {profile.tagline}
              </p>
              <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                {profile.bio} Currently focused on agentic AI, hybrid RAG architectures,
                and cloud automation &mdash; turning proof-of-concepts into production-grade
                systems.
              </p>
              <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 font-mono text-sm">
                <MetaItem label="location" value={profile.location} />
                <MetaItem label="focus" value="AI · Cloud" />
                <MetaItem
                  label="status"
                  value={
                    <span className="flex items-center gap-2 text-accent">
                      <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-60 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                      </span>
                      available
                    </span>
                  }
                />
              </dl>
            </div>
          </div>
        </motion.div>

        {/* Interactive Terminal Pillars */}
        <div className="mb-6">
          <p className="font-mono text-xs md:text-sm text-accent mb-2 tracking-widest uppercase">
            // pillars
          </p>
          <h3 className="font-mono text-xl md:text-2xl font-bold text-white">
            click a tab to explore
          </h3>
        </div>
        <PillarsTerminal />

        {/* SEO-friendly hidden description */}
        <p className="sr-only">
          Luv Pahwa is a Cloud and AI Engineer based in {profile.location}, specializing in
          agentic AI workflows, retrieval augmented generation (RAG) systems, AWS, Azure,
          LangChain, LangGraph, and cloud-native architectures. Open to opportunities in
          AI engineering and cloud infrastructure roles.
        </p>
      </div>
    </section>
  );
}

/* ----------------------- Avatar ----------------------- */
function Avatar() {
  const initials = 'LP';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative shrink-0"
    >
      <div
        className="absolute inset-0 rounded-2xl bg-accent/20 blur-2xl animate-pulse"
        aria-hidden
      />
      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 border-accent/40 bg-[#0a0a0a] flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(0,255,136,0.2)]">
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
          className="absolute inset-[-2px] rounded-2xl"
          style={{
            background:
              'conic-gradient(from 0deg, transparent, rgba(0,255,136,0.6), transparent 60%)',
          }}
        />
        <div className="absolute inset-[3px] rounded-[14px] bg-[#0a0a0a] flex flex-col items-center justify-center">
          <span className="font-mono text-xs text-accent/70 tracking-widest mb-1">
            ~/agent
          </span>
          <span className="font-mono text-4xl md:text-5xl font-bold text-white tracking-tight">
            {initials}
          </span>
          <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-accent">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            online
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MetaItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-white/50 text-xs uppercase tracking-widest mb-1">{label}</dt>
      <dd className="text-white/95">{value}</dd>
    </div>
  );
}

/* ----------------------- Interactive Terminal ----------------------- */
function PillarsTerminal() {
  const [activeId, setActiveId] = useState(pillars[0].id);
  const active = pillars.find((p) => p.id === activeId) ?? pillars[0];

  // Sequenced typing stages: 0 = cmd, 1 = title, 2 = body, 3 = bullets, 4 = quote, 5 = done
  const [stage, setStage] = useState(0);
  useEffect(() => {
    setStage(0);
  }, [activeId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border border-border rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-[0_0_60px_rgba(0,255,136,0.05)]"
    >
      {/* Terminal chrome */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-border bg-[#0d0d0d]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <p className="font-mono text-xs text-white/60">~/about — zsh</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-accent">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
          <span className="hidden sm:inline">connected</span>
        </div>
      </div>

      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Pillars"
        className="flex items-center gap-1 px-3 md:px-5 pt-3 pb-0 border-b border-border bg-[#0a0a0a] overflow-x-auto terminal-scroll"
      >
        {pillars.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(p.id)}
              className={`relative font-mono text-xs md:text-sm px-4 py-2 rounded-t-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-accent bg-[#0d0d0d] border border-b-0 border-accent/30'
                  : 'text-white/60 hover:text-white border border-transparent'
              }`}
            >
              {isActive ? <span className="text-accent/80 mr-1">●</span> : null}
              {p.label}
              {isActive && (
                <motion.span
                  layoutId="pillar-tab-glow"
                  className="absolute inset-x-2 -bottom-px h-[2px] bg-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Terminal body */}
      <div className="p-5 md:p-8 font-mono text-sm md:text-base min-h-[460px] md:min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Stage 0 — Command prompt */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent">luv@portfolio:~$</span>
              <Typed
                text={active.cmd}
                speed={26}
                showCursor={stage === 0}
                onDone={() => setStage(1)}
              />
            </div>

            {/* Stage 1 — Title */}
            {stage >= 1 && (
              <h4 className="text-white text-lg md:text-2xl font-bold mb-4 leading-tight">
                <span className="text-accent">##</span>{' '}
                <Typed
                  text={active.title}
                  speed={22}
                  showCursor={stage === 1}
                  onDone={() => setStage(2)}
                />
              </h4>
            )}

            {/* Stage 2 — Body */}
            {stage >= 2 && (
              <p className="text-white/85 leading-relaxed mb-6 max-w-3xl">
                <Typed
                  text={active.body}
                  speed={8}
                  showCursor={stage === 2}
                  onDone={() => setStage(3)}
                />
              </p>
            )}

            {/* Stage 3 — Bullets */}
            {stage >= 3 && (
              <>
                <p className="text-accent text-xs md:text-sm mb-3 tracking-widest uppercase">
                  $ list --features
                </p>
                <BulletList
                  items={active.bullets}
                  onDone={() => setStage(4)}
                />
              </>
            )}

            {/* Stage 4 — Quote */}
            {stage >= 4 && (
              <p className="text-accent/80 italic text-sm md:text-base mb-6">
                <Typed
                  text={`// ${active.quote}`}
                  speed={18}
                  showCursor={stage === 4}
                  onDone={() => setStage(5)}
                />
              </p>
            )}

            {/* Stage 5 — Tags fade in */}
            {stage >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap gap-2 text-xs"
              >
                {active.tags.map((t) => (
                  <span
                    key={t}
                    className="text-accent/90 border border-accent/30 bg-accent/5 px-2 py-1 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <div className="px-5 py-2 border-t border-border bg-[#0d0d0d] text-[10px] md:text-xs text-white/50 font-mono flex items-center justify-between">
        <span>tip: click a tab above to switch context</span>
        <span className="hidden sm:inline">
          {pillars.findIndex((p) => p.id === activeId) + 1} / {pillars.length}
        </span>
      </div>
    </motion.div>
  );
}

/* ----------------------- Bullet List with typing ----------------------- */
function BulletList({ items, onDone }: { items: string[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  return (
    <ul className="space-y-2 mb-6">
      {items.slice(0, idx + 1).map((b, i) => (
        <li
          key={b}
          className="flex items-start gap-3 text-white/90 text-sm md:text-base"
        >
          <span className="text-accent mt-1 shrink-0">▸</span>
          <span>
            <Typed
              text={b}
              speed={6}
              showCursor={i === idx}
              onDone={() => {
                if (i < items.length - 1) {
                  setTimeout(() => setIdx(i + 1), 80);
                } else {
                  setTimeout(onDone, 220);
                }
              }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------- Typewriter ----------------------- */
function Typed({
  text,
  speed = 18,
  showCursor = false,
  onDone,
}: {
  text: string;
  speed?: number;
  showCursor?: boolean;
  onDone?: () => void;
}) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(t);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);
  return (
    <span>
      {out}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.85 }}
          className="inline-block w-[7px] h-[14px] bg-accent ml-1 align-middle"
        />
      )}
    </span>
  );
}