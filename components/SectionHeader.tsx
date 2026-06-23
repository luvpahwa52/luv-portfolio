'use client';

import { motion } from 'framer-motion';

type Props = {
  label: string;          // "Origin"
  heading: string;        // "The engineer behind the screen."
  headingAccent?: string; // italic muted part
  tagline: string;
};

export default function SectionHeader({
  label,
  heading,
  headingAccent,
  tagline,
}: Props) {
  const mainHeading = headingAccent
    ? heading.replace(headingAccent, '').trim()
    : heading;

  return (
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
          Chapter — {label}
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
        {mainHeading}{' '}
        {headingAccent && (
          <span className="text-white/50 italic">{headingAccent}</span>
        )}
      </motion.h2>

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-5 max-w-xl text-base md:text-lg text-zinc-300 leading-relaxed"
      >
        {tagline}
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
  );
}