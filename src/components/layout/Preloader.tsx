"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 500);
    const t2 = setTimeout(() => setPhase(3), 1600);
    const t3 = setTimeout(() => setPhase(4), 2800);
    const t4 = setTimeout(() => onComplete(), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // Smooth counter 0 → 100
  useEffect(() => {
    const start = performance.now();
    const duration = 2600;
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const brand = "Ruthless Coder";
  const isExiting = phase === 4;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#fafbff" }}
      animate={
        isExiting
          ? { opacity: 0, scale: 1.05 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Background blobs — pure CSS animations (was Framer Motion) */}
      <div
        className="absolute rounded-full animate-[morph-blob_6s_ease-in-out_infinite]"
        style={{
          width: 400, height: 400, left: "15%", top: "10%",
          background: "rgba(108,99,255,0.08)",
          filter: "blur(240px)",
          willChange: "transform, opacity",
        }}
      />
      <div
        className="absolute rounded-full animate-[morph-blob_6s_ease-in-out_infinite]"
        style={{
          width: 350, height: 350, left: "60%", top: "55%",
          background: "rgba(0,198,255,0.06)",
          filter: "blur(210px)",
          animationDelay: "0.5s",
          willChange: "transform, opacity",
        }}
      />
      <div
        className="absolute rounded-full animate-[morph-blob_6s_ease-in-out_infinite]"
        style={{
          width: 300, height: 300, left: "35%", top: "65%",
          background: "rgba(255,107,157,0.05)",
          filter: "blur(180px)",
          animationDelay: "1s",
          willChange: "transform, opacity",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(108,99,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Concentric rings — one-time entrance only */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[120, 160, 200].map((r, i) => (
          <motion.div
            key={r}
            className="absolute rounded-full border"
            style={{
              width: r * 2,
              height: r * 2,
              borderColor: `rgba(108,99,255,${0.08 - i * 0.02})`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2 + i * 0.15,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          />
        ))}

        {/* Rotating dashed ring — CSS (was Framer Motion) */}
        <div
          className="absolute rounded-full border border-dashed border-accent/10 animate-[spin_20s_linear_infinite]"
          style={{ width: 280, height: 280 }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo mark — one-time entrance */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.25, 0.4, 0.25, 1],
            rotate: { duration: 1.2, ease: [0.25, 0.4, 0.25, 1] },
          }}
        >
          {/* Glow — CSS (was Framer Motion) */}
          <div
            className="absolute -inset-4 rounded-[28px] animate-[pulse-glow-soft_3s_ease-in-out_infinite]"
            style={{
              background: "linear-gradient(135deg, #6c63ff, #00c6ff, #ff6b9d)",
              filter: "blur(30px)",
              willChange: "transform, opacity",
            }}
          />

          {/* Logo container */}
          <div
            className="relative w-24 h-24 rounded-[22px] flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #6c63ff 0%, #00c6ff 50%, #ff6b9d 100%)",
            }}
          >
            {/* Shimmer sweep — CSS (was Framer Motion) */}
            <div
              className="absolute inset-0 animate-[shimmer-slide_4s_ease-in-out_infinite]"
              style={{
                background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)",
              }}
            />
            <span className="relative text-white font-display font-bold text-[2.2rem] tracking-tight">
              RC
            </span>
          </div>
        </motion.div>

        {/* Brand name — letter by letter with stagger (one-time entrance) */}
        <div className="flex items-center justify-center gap-[2px] mb-3">
          {brand.split("").map((char, i) => (
            <motion.span
              key={`br-${i}`}
              className="text-3xl md:text-4xl font-display font-bold inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #6c63ff 0%, #00c6ff 50%, #ff6b9d 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{
                y: 60,
                opacity: 0,
                scale: 0.3,
                rotateY: 90,
              }}
              animate={
                phase >= 2
                  ? { y: 0, opacity: 1, scale: 1, rotateY: 0 }
                  : {}
              }
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Animated gradient underline — one-time entrance, CSS infinite shift */}
        <motion.div
          className="h-[2px] rounded-full mb-6 overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={phase >= 2 ? { width: 160, opacity: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: 0.7,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          <div
            className="w-full h-full animate-[gradient-shift_2s_linear_infinite]"
            style={{
              background: "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d, #6c63ff)",
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>

        {/* Tagline — one-time entrance */}
        <motion.div
          className="flex items-center gap-2 text-sm font-mono tracking-widest mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-foreground-subtle">
            Full-Stack Developer
          </span>
          <span className="text-accent/40">|</span>
          <span className="text-foreground-subtle">Cyber Security</span>
        </motion.div>

        {/* Progress section — one-time entrance */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Percentage with glow */}
          <div className="relative">
            <span
              className="absolute inset-0 flex items-center justify-center text-lg font-mono font-bold blur-md select-none"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              aria-hidden="true"
            >
              {count}%
            </span>
            <span
              className="relative text-lg font-mono font-bold tabular-nums"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {count}%
            </span>
          </div>

          {/* Premium progress bar */}
          <div className="relative w-64 h-[4px] bg-border/20 rounded-full overflow-hidden">
            <motion.div
              className="relative h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.6,
                delay: 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {/* Shimmer on bar — CSS (was Framer Motion) */}
              <div
                className="absolute inset-0 animate-[shimmer-slide_1.5s_linear_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                }}
              />
            </motion.div>
          </div>

          {/* Loading text — CSS conditional (was Framer Motion) */}
          <span
            className={`text-[11px] font-mono text-foreground-subtle/60 tracking-[0.2em] uppercase transition-opacity duration-500 ${
              phase >= 3 ? "animate-pulse opacity-60" : "opacity-0"
            }`}
          >
            Loading Experience
          </span>
        </motion.div>
      </div>

      {/* Corner brackets — one-time entrance */}
      {[
        { pos: "top-5 left-5", border: "border-l-[2px] border-t-[2px]", round: "rounded-tl-lg", color: "border-accent/12", delay: 0.2 },
        { pos: "top-5 right-5", border: "border-r-[2px] border-t-[2px]", round: "rounded-tr-lg", color: "border-accent-cyan/12", delay: 0.3 },
        { pos: "bottom-5 left-5", border: "border-l-[2px] border-b-[2px]", round: "rounded-bl-lg", color: "border-accent-pink/12", delay: 0.4 },
        { pos: "bottom-5 right-5", border: "border-r-[2px] border-b-[2px]", round: "rounded-br-lg", color: "border-accent-orange/12", delay: 0.5 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} w-12 h-12 ${c.border} ${c.color} ${c.round}`}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: c.delay,
            duration: 0.7,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        />
      ))}

      {/* Horizontal scan line — CSS (was Framer Motion) */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none animate-[scan-line_5s_linear_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(108,99,255,0.1) 50%, transparent 95%)",
        }}
      />
    </motion.div>
  );
}
