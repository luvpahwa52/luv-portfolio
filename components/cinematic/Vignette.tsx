"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Vignette() {
  const { scrollYProgress } = useScroll();
  const intensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.25, 0.6]);
  const bg = useTransform(
    intensity,
    (v) => `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${v}) 100%)`
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[85]"
      style={{ background: bg }}
    />
  );
}