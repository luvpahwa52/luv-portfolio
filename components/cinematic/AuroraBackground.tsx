"use client";

import { useEffect, useState } from "react";

export default function AuroraBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div className="aurora-blob blob-1" />
      <div className="aurora-blob blob-2" />
      {!isMobile && (
        <>
          <div className="aurora-blob blob-3" />
          <div className="aurora-blob blob-4" />
        </>
      )}
    </div>
  );
}