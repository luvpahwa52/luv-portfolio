'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-accent/40 bg-[#0d0d0d]/80 backdrop-blur-md text-accent font-mono shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:bg-accent/10 transition-colors"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}