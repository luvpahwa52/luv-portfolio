'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CinematicIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // play once per tab session
    if (sessionStorage.getItem('intro-played')) {
      setShow(false);
      document.documentElement.style.overflow = '';
      return;
    }

    sessionStorage.setItem('intro-played', '1');
    setShow(true);
    
    document.documentElement.style.overflow = 'hidden';


    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3200);
    const t5 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 4000);

    // safety net — force unlock no matter what
    const safety = setTimeout(() => {
      document.body.style.overflow = '';
      setShow(false);
    }, 6000);

    return () => {
      [t1, t2, t3, t4, t5, safety].forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  const skip = () => {
    setShow(false);
    document.body.style.overflow = '';
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        onClick={skip}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] bg-black cursor-pointer overflow-hidden"
      >
        {/* film grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* letterbox bars */}
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: phase >= 1 && phase < 4 ? '0%' : '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 right-0 h-[18vh] bg-black z-10"
          style={{ boxShadow: '0 6px 30px rgba(0,0,0,0.8)' }}
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase >= 1 && phase < 4 ? '0%' : '100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[18vh] bg-black z-10"
          style={{ boxShadow: '0 -6px 30px rgba(0,0,0,0.8)' }}
        />

        {/* center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
          <AnimatePresence>
            {phase >= 2 && phase < 4 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="flex items-center gap-4 mb-8"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block h-px w-10 bg-white/70 origin-left"
                />
                <p className="text-[11px] tracking-[0.5em] text-white/80 uppercase font-light">
                  LP — 001
                </p>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block h-px w-10 bg-white/70 origin-right"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase >= 3 && phase < 4 && (
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-4xl font-light tracking-tight text-white text-center max-w-2xl"
              >
                Engineering,{' '}
                <span className="text-white/50 italic">with intent.</span>
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 && phase < 4 ? 0.4 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-[10vh] text-[10px] tracking-[0.4em] text-white/40 uppercase"
          >
            click anywhere to skip
          </motion.p>
        </div>

        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}