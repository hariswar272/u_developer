"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Geometric particle that orbits and fades
function OrbitDot({
  radius,
  duration,
  delay,
  size,
  color,
}: {
  radius: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: radius * 2, height: radius * 2, left: "50%", top: "50%", marginLeft: -radius, marginTop: -radius }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ opacity: { duration: 0.4, delay }, rotate: { duration, repeat: Infinity, ease: "linear", delay } }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
          top: 0,
          left: "50%",
          marginLeft: -size / 2,
          boxShadow: `0 0 ${size * 3}px ${color}`,
        }}
      />
    </motion.div>
  );
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase(2), 600);
    const t2 = setTimeout(() => setPhase(3), 1800);
    const t3 = setTimeout(() => setPhase(4), 3000);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  // Counter animation 0 → 100
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1;
      });
    }, 28);
    return () => clearInterval(interval);
  }, []);

  const brand = "Ruthless Coder";
  const isExiting = phase === 4;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: "#fafbff" }}
        animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* ──── Animated background mesh ──── */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(108,99,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,198,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(255,107,157,0.04) 0%, transparent 50%)",
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ──── Grid lines ──── */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* ──── Orbiting particles ──── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <OrbitDot radius={100} duration={6} delay={0} size={5} color="rgba(108,99,255,0.6)" />
          <OrbitDot radius={100} duration={6} delay={2} size={4} color="rgba(0,198,255,0.5)" />
          <OrbitDot radius={100} duration={6} delay={4} size={4} color="rgba(255,107,157,0.5)" />
          <OrbitDot radius={140} duration={10} delay={0.5} size={3} color="rgba(108,99,255,0.35)" />
          <OrbitDot radius={140} duration={10} delay={3.5} size={3} color="rgba(0,198,255,0.3)" />
          <OrbitDot radius={140} duration={10} delay={7} size={3} color="rgba(255,154,86,0.3)" />
          <OrbitDot radius={70} duration={4} delay={0.3} size={6} color="rgba(108,99,255,0.4)" />
          <OrbitDot radius={70} duration={4} delay={2.3} size={5} color="rgba(255,107,157,0.35)" />
        </div>

        {/* ──── Outer ring ──── */}
        <svg className="absolute" width="300" height="300" viewBox="0 0 300 300" style={{ left: "50%", top: "50%", marginLeft: -150, marginTop: -150 }}>
          <motion.circle
            cx="150" cy="150" r="130"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            strokeDasharray="816"
            initial={{ strokeDashoffset: 816, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <motion.circle
            cx="150" cy="150" r="110"
            fill="none"
            stroke="url(#ringGrad2)"
            strokeWidth="0.5"
            strokeDasharray="690"
            initial={{ strokeDashoffset: 690, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#00c6ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00c6ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6c63ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* ──── Center content ──── */}
        <div className="relative z-10 flex flex-col items-center">

          {/* Hexagonal logo */}
          <motion.div
            className="relative mb-10"
            initial={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Glow behind logo */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{ background: "linear-gradient(135deg, #6c63ff, #00c6ff, #ff6b9d)", filter: "blur(25px)" }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo box */}
            <motion.div
              className="relative w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg, #6c63ff 0%, #00c6ff 50%, #ff6b9d 100%)" }}
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Inner shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
              <span className="relative text-white font-display font-bold text-3xl tracking-tight">
                RC
              </span>
            </motion.div>
          </motion.div>

          {/* Brand name — staggered letter reveal */}
          <div className="relative flex items-center gap-[1px] mb-3">
            {brand.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="text-3xl md:text-4xl font-display font-bold inline-block"
                style={{
                  background: "linear-gradient(135deg, #6c63ff 0%, #00c6ff 40%, #ff6b9d 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ y: 50, opacity: 0, scale: 0.3, filter: "blur(12px)" }}
                animate={
                  phase >= 2
                    ? { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: i * 0.04,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Animated underline */}
          <motion.div
            className="h-[2px] rounded-full mb-5"
            style={{ background: "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={phase >= 2 ? { width: 120, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          />

          {/* Tagline — typed style */}
          <motion.div
            className="flex items-center gap-1 text-sm font-mono text-foreground-subtle tracking-widest mb-10"
            initial={{ opacity: 0 }}
            animate={phase >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
              className="text-accent"
            >
              &gt;
            </motion.span>
            <span>crafting digital experiences</span>
          </motion.div>

          {/* Progress section */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Percentage counter */}
            <motion.span
              className="text-xs font-mono font-medium tracking-widest"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {count}%
            </motion.span>

            {/* Progress bar */}
            <div className="w-56 h-[3px] bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>
          </motion.div>
        </div>

        {/* ──── Corner decorations ──── */}
        {[
          { pos: "top-6 left-6", border: "border-l-2 border-t-2", round: "rounded-tl-xl", color: "border-accent/15", delay: 0.3 },
          { pos: "top-6 right-6", border: "border-r-2 border-t-2", round: "rounded-tr-xl", color: "border-accent-cyan/15", delay: 0.4 },
          { pos: "bottom-6 left-6", border: "border-l-2 border-b-2", round: "rounded-bl-xl", color: "border-accent-pink/15", delay: 0.5 },
          { pos: "bottom-6 right-6", border: "border-r-2 border-b-2", round: "rounded-br-xl", color: "border-accent-orange/15", delay: 0.6 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className={`absolute ${c.pos} w-16 h-16 ${c.border} ${c.color} ${c.round}`}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: c.delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          />
        ))}

        {/* ──── Scan line effect ──── */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.12), transparent)" }}
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* ──── Floating dots across screen ──── */}
        {[
          { left: "10%", top: "20%", delay: 0, dur: 5 },
          { left: "85%", top: "15%", delay: 1.5, dur: 6 },
          { left: "75%", top: "75%", delay: 0.8, dur: 5.5 },
          { left: "20%", top: "80%", delay: 2, dur: 4.5 },
          { left: "50%", top: "10%", delay: 0.5, dur: 7 },
          { left: "90%", top: "50%", delay: 1, dur: 5 },
        ].map((d, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent/20"
            style={{ left: d.left, top: d.top }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -30, 0] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
