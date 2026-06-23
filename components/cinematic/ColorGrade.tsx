"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ColorGrade() {
  const { scrollYProgress } = useScroll();

  const tint = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(20, 30, 60, 0.0)",
      "rgba(30, 40, 70, 0.08)",
      "rgba(60, 40, 30, 0.06)",
      "rgba(40, 30, 50, 0.08)",
      "rgba(10, 10, 15, 0.12)",
    ]
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] mix-blend-color"
      style={{ backgroundColor: tint }}
    />
  );
}