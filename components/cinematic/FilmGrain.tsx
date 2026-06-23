"use client";

import { useEffect, useState } from "react";

export default function FilmGrain() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const cores = (navigator as any).hardwareConcurrency || 4;
    setEnabled(!isMobile && cores >= 4);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        animation: "grain 0.8s steps(6) infinite",
      }}
    />
  );
}