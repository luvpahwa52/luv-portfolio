'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroAmbient() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const [ready, setReady] = useState(false);

  // Wait for intro to finish before showing ambient layer
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const introDone = sessionStorage.getItem('intro-done');
    const introWasPlayed = sessionStorage.getItem('intro-played');

    if (introDone) {
      setReady(true);
      return;
    }
    const waitMs = introWasPlayed ? 4200 : 4400;
    const t = setTimeout(() => setReady(true), waitMs);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const leave = () => setMouse({ x: -9999, y: -9999 });
    el.addEventListener('mousemove', handler);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', handler);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* base dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.5) 1.5px, transparent 1.6px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* accent glow layer — revealed by cursor */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(110,231,183,1) 2px, transparent 2.5px)',
          backgroundSize: '32px 32px',
          maskImage: `radial-gradient(260px circle at ${mouse.x}px ${mouse.y}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 75%)`,
          WebkitMaskImage: `radial-gradient(260px circle at ${mouse.x}px ${mouse.y}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 75%)`,
        }}
      />

      {/* soft halo around cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(420px circle at ${mouse.x}px ${mouse.y}px, rgba(110,231,183,0.10), transparent 60%)`,
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
    </motion.div>
  );
}