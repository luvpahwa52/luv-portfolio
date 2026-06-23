'use client';

import ScrollProgress from '@/components/cinematic/ScrollProgress';
import { useState, createContext, useEffect, lazy, Suspense } from 'react';
import ColdOpen from '@/components/cinematic/ColdOpen';
import Navbar from '@/components/Navbar';
const AuroraBackground = lazy(() => import('@/components/cinematic/AuroraBackground'));
const FilmGrain = lazy(() => import('@/components/cinematic/FilmGrain'));
const Vignette = lazy(() => import('@/components/cinematic/Vignette'));
const ColorGrade = lazy(() => import('@/components/cinematic/ColorGrade'));
const CursorLens = lazy(() => import('@/components/cinematic/CursorLens'));
const TouchRipple = lazy(() => import('@/components/cinematic/TouchRipple'));

export const ArrivalContext = createContext(false);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [arrived, setArrived] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(mobile);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
    setIsLowPower(reduced || lowCores);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setArrived(true), 0);
    return () => clearTimeout(t);
  }, []);

  const showHeavyEffects = arrived && !isMobile && !isLowPower;
  const showLightEffects = arrived && isMobile && !isLowPower;

  return (
    <ArrivalContext.Provider value={arrived}>
      {mounted && !arrived && <ColdOpen onComplete={() => setArrived(true)} />}

      {arrived && <ScrollProgress />}
      {arrived && <Navbar />}

      {showHeavyEffects && (
        <Suspense fallback={null}>
          <AuroraBackground />
          <FilmGrain />
          <Vignette />
          <ColorGrade />
          <CursorLens />
        </Suspense>
      )}

      {showLightEffects && (
        <Suspense fallback={null}>
          <Vignette />
          <TouchRipple />
        </Suspense>
      )}

      <main
        style={{
          opacity: arrived ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
          pointerEvents: arrived ? 'auto' : 'none',
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
        }}
      >
        {children}
      </main>
    </ArrivalContext.Provider>
  );
}