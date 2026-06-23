'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BLOB_SHAPES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 70% 70% 30% / 50% 60% 30% 60%',
  '70% 30% 50% 50% / 30% 50% 70% 50%',
  '40% 60% 60% 40% / 70% 30% 70% 30%',
  '50% 50% 35% 65% / 55% 45% 55% 45%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
];

export default function JarvisReplayButton() {
  const [visible, setVisible] = useState(false);
  const [hint, setHint] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const check = () => setVisible(!!sessionStorage.getItem('jarvis_intro_shown'));
    check();
    const onDismissed = () => check();
    const onReplay = () => {
      setVisible(false);
      setHint(false);
    };
    window.addEventListener('jarvis-dismissed', onDismissed);
    window.addEventListener('jarvis-replay', onReplay);
    return () => {
      window.removeEventListener('jarvis-dismissed', onDismissed);
      window.removeEventListener('jarvis-replay', onReplay);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const showHint = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setHint(true);
  };

  const hideHint = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHint(false), 120);
  };

  const replay = () => {
    if (typeof window === 'undefined') return;
    setHint(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    sessionStorage.removeItem('jarvis_intro_shown');
    window.dispatchEvent(new Event('jarvis-replay'));
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 18 }}
      className="fixed bottom-6 right-6 z-[150] flex items-center gap-3"
      onMouseLeave={hideHint}
    >
      {/* Tooltip — pointer-events: none prevents flicker */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-black border border-accent/30 text-accent text-[10px] uppercase tracking-[0.2em] px-3 py-2 whitespace-nowrap font-mono pointer-events-none select-none"
          >
            ↺ wake Liba
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini liquid blob button */}
      <button
        onClick={replay}
        onMouseEnter={showHint}
        onMouseLeave={hideHint}
        onFocus={showHint}
        onBlur={hideHint}
        aria-label="Replay assistant intro"
        className="relative w-14 h-14 group"
        data-hover
      >
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/40 pointer-events-none"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/30 pointer-events-none"
          animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.45) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-2 group-hover:inset-1 transition-all pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #00ff88, #00aa55 60%, transparent)',
            filter: 'blur(4px)',
            opacity: 0.9,
          }}
          animate={{ borderRadius: BLOB_SHAPES, rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-3 group-hover:inset-2 transition-all pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 40% 35%, #ffffff, #d4ffea 25%, #00ff88 70%, transparent)',
            filter: 'blur(2px)',
          }}
          animate={{ borderRadius: [...BLOB_SHAPES].reverse(), rotate: [360, 180, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, white, transparent 70%)',
            left: '32%', top: '28%',
          }}
        />
      </button>
    </motion.div>
  );
}