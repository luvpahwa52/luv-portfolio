"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface ColdOpenProps {
  onComplete: () => void;
}

type Phase = "gate" | "void" | "text" | "liba" | "expand" | "done";

export default function ColdOpen({ onComplete }: ColdOpenProps) {
  const [phase, setPhase] = useState<Phase>("gate");
  const startedRef = useRef(false);

  const unlockAudio = () => {
    if (startedRef.current) return;
    startedRef.current = true;

    try {
      const primer = new SpeechSynthesisUtterance(" ");
      primer.volume = 0;
      window.speechSynthesis.speak(primer);

      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        ctx.resume();
      }
    } catch {}

    setPhase("void");

    setTimeout(() => setPhase("text"), 800);
    setTimeout(() => setPhase("liba"), 3200);
    setTimeout(() => setPhase("expand"), 6500);
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 8200);
  };

  const line = "You've arrived.";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence>
            {phase === "gate" && (
              <motion.button
                onClick={unlockAudio}
                className="relative z-20 flex flex-col items-center gap-6 group cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.0 }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-white"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.p
                  className="text-white/70 text-xs tracking-[0.5em] uppercase group-hover:text-white transition-colors"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  tap to enter
                </motion.p>
                <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">
                  best with sound on
                </p>
              </motion.button>
            )}
          </AnimatePresence>

          {phase !== "gate" && (
            <>
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(120,160,255,0.12), transparent 60%)",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute w-2 h-2 rounded-full bg-white"
                animate={{
                  scale: phase === "liba" ? [1, 60, 1] : [1, 1.8, 1],
                  opacity: phase === "liba" ? [0.4, 1, 0] : [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.4,
                  repeat: phase === "liba" ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />

              <AnimatePresence>
                {phase === "text" && (
                  <motion.h1
                    className="relative z-10 text-white/90 text-3xl md:text-5xl font-light tracking-[0.2em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 1.2 }}
                  >
                    {line.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.6 }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.h1>
                )}
              </AnimatePresence>

              {phase === "expand" && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0, borderRadius: "100%" }}
                  animate={{
                    scale: 30,
                    opacity: [0, 0.15, 0],
                    borderRadius: "0%",
                  }}
                  transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                />
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}