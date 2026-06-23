'use client';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type Variant = 'fade' | 'slide' | 'scale' | 'tilt' | 'blur' | 'stagger';

const variants: Record<Variant, Variants> = {
  fade: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, x: -80 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1 },
  },
  tilt: {
    hidden: { opacity: 0, rotateX: -20, y: 60, transformPerspective: 1000 },
    show: { opacity: 1, rotateX: 0, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(20px)', y: 30 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  stagger: {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  },
};

export default function Reveal({
  children,
  variant = 'fade',
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}