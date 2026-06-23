"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorLens() {
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.innerWidth < 768;
    if (isTouch) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);
    };
    const hide = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, [x, y, hidden]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[95]"
      style={{ x: sx, y: sy, opacity: hidden ? 0 : 1 }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(140,180,255,0.22) 0%, rgba(140,180,255,0.08) 35%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </motion.div>
  );
}