'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseout', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: pos.x - 200,
        y: pos.y - 200,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block"
      style={{
        width: 400,
        height: 400,
        background:
          'radial-gradient(circle, rgba(122,162,247,0.15) 0%, rgba(187,154,247,0.08) 30%, transparent 70%)',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
      }}
    />
  );
}