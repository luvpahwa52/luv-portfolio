'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function StaggerParent({ children, stagger = 0.12 }: { children: ReactNode; stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}