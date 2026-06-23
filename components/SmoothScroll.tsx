'use client';
import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    setIsTouch(touch);
    setMounted(true);
  }, []);

  // Until mounted, render plain children (SSR-safe, no hydration mismatch)
  if (!mounted) return <>{children}</>;

  // Mobile / touch devices → native scroll, no Lenis
  if (isTouch) return <>{children}</>;

  // Desktop → smooth scroll
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}