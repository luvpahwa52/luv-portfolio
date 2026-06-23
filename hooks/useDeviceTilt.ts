"use client";

import { useEffect, useState } from "react";

export function useDeviceTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!isTouch) return;

    const handler = (e: DeviceOrientationEvent) => {
      const beta = e.beta ?? 0;    // front-back tilt (-180 → 180)
      const gamma = e.gamma ?? 0;  // left-right tilt (-90 → 90)

      // normalize to -1..1 and clamp
      const x = Math.max(-1, Math.min(1, gamma / 30));
      const y = Math.max(-1, Math.min(1, (beta - 45) / 30));

      setTilt({ x, y });
    };

    // iOS 13+ requires permission — try silently, fail gracefully
    const start = () => {
      window.addEventListener("deviceorientation", handler);
    };

    const anyEvent = (window as any).DeviceOrientationEvent;
    if (anyEvent && typeof anyEvent.requestPermission === "function") {
      // iOS — skip silently to avoid intrusive prompt
      // (user said skip the prompt)
    } else {
      start();
    }

    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  return tilt;
}