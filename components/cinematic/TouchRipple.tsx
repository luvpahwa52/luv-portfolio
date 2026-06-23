"use client";

import { useEffect, useState } from "react";

type Ripple = { id: number; x: number; y: number };

export default function TouchRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let nextId = 0;
    const handle = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const id = nextId++;
      setRipples((r) => [...r, { id, x: t.clientX, y: t.clientY }]);
      setTimeout(() => {
        setRipples((r) => r.filter((rip) => rip.id !== id));
      }, 900);
    };
    window.addEventListener("touchstart", handle, { passive: true });
    return () => window.removeEventListener("touchstart", handle);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 88,
        pointerEvents: "none",
      }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="touch-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}