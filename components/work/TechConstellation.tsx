'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function TechConstellation({
  stack,
  accent,
}: {
  stack: string[];
  accent: string;
}) {
  const nodes = useMemo(() => {
    const radius = 130;
    const cx = 200;
    const cy = 200;
    return stack.map((label, i) => {
      const angle = (i / stack.length) * Math.PI * 2 - Math.PI / 2;
      return {
        label,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    });
  }, [stack]);

  return (
    <div className={`relative w-full max-w-md aspect-square rounded-3xl border border-white/10 bg-gradient-to-br ${accent} overflow-hidden`}>
      <div className="absolute inset-0 bg-black/50" />
      <svg viewBox="0 0 400 400" className="relative w-full h-full">
        {/* connecting lines from center */}
        {nodes.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1={200}
            y1={200}
            x2={n.x}
            y2={n.y}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
          />
        ))}

        {/* center node */}
        <motion.circle
          cx={200}
          cy={200}
          r={14}
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
        <motion.circle
          cx={200}
          cy={200}
          r={28}
          fill="none"
          stroke="white"
          strokeOpacity={0.3}
          animate={{ r: [28, 40, 28], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />

        {/* outer nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
          >
            <circle cx={n.x} cy={n.y} r={6} fill="white" />
            <foreignObject
              x={n.x - 60}
              y={n.y + 10}
              width={120}
              height={30}
            >
              <div className="text-center text-[11px] text-white/85 font-medium">
                {n.label}
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}