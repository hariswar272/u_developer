"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Morphing blob that slowly shifts shape
function MorphBlob({
  color,
  size,
  left,
  top,
  delay,
}: {
  color: string;
  size: number;
  left: string;
  top: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: color,
        filter: `blur(${size * 0.6}px)`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.4, 0.6],
        scale: [0.6, 1.2, 0.9, 1.1],
        x: [0, 20, -15, 0],
        y: [0, -15, 10, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Particle that rises and fades
function RisingParticle({
  left,
  delay,
  duration,
  size,
  color,
}: {
  left: string;
  delay: number;
  duration: number;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full"
      style={{
        left,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [0, -400, -600],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

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
      // Ease out cubic
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
    <AnimatePresence>
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
        {/* Morphing background blobs */}
        <MorphBlob color="rgba(108,99,255,0.08)" size={400} left="15%" top="10%" delay={0} />
        <MorphBlob color="rgba(0,198,255,0.06)" size={350} left="60%" top="55%" delay={0.5} />
        <MorphBlob color="rgba(255,107,157,0.05)" size={300} left="35%" top="65%" delay={1} />
        <MorphBlob color="rgba(255,154,86,0.04)" size={250} left="70%" top="15%" delay={1.5} />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(108,99,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Rising particles */}
        <RisingParticle left="15%" delay={0} duration={3.5} size={3} color="rgba(108,99,255,0.5)" />
        <RisingParticle left="30%" delay={0.8} duration={4} size={2} color="rgba(0,198,255,0.4)" />
        <RisingParticle left="50%" delay={0.3} duration={3.8} size={2.5} color="rgba(255,107,157,0.4)" />
        <RisingParticle left="70%" delay={1.2} duration={3.2} size={3} color="rgba(108,99,255,0.4)" />
        <RisingParticle left="85%" delay={0.5} duration={4.2} size={2} color="rgba(0,198,255,0.5)" />
        <RisingParticle left="40%" delay={1.5} duration={3.6} size={2} color="rgba(255,154,86,0.4)" />
        <RisingParticle left="60%" delay={2} duration={3} size={2.5} color="rgba(108,99,255,0.3)" />
        <RisingParticle left="25%" delay={1} duration={4.5} size={2} color="rgba(255,107,157,0.3)" />

        {/* Concentric rings */}
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

          {/* Rotating dashed ring */}
          <motion.div
            className="absolute rounded-full border border-dashed border-accent/10"
            style={{ width: 280, height: 280 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              scale: { duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] },
              opacity: { duration: 0.8, delay: 0.4 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo mark */}
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
            {/* Glow */}
            <motion.div
              className="absolute -inset-4 rounded-[28px]"
              style={{
                background:
                  "linear-gradient(135deg, #6c63ff, #00c6ff, #ff6b9d)",
                filter: "blur(30px)",
              }}
              animate={{
                opacity: [0.25, 0.5, 0.25],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo container */}
            <motion.div
              className="relative w-24 h-24 rounded-[22px] flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #6c63ff 0%, #00c6ff 50%, #ff6b9d 100%)",
              }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)",
                }}
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
              <span className="relative text-white font-display font-bold text-[2.2rem] tracking-tight">
                RC
              </span>
            </motion.div>
          </motion.div>

          {/* Brand name — letter by letter with stagger */}
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
                  filter: "blur(12px)",
                }}
                animate={
                  phase >= 2
                    ? {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        filter: "blur(0px)",
                      }
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

          {/* Animated gradient underline */}
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
            <motion.div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d, #6c63ff)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="flex items-center gap-2 text-sm font-mono tracking-widest mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.span
              className="inline-block w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-foreground-subtle">
              Full-Stack Developer
            </span>
            <span className="text-accent/40">|</span>
            <span className="text-foreground-subtle">Cyber Security</span>
          </motion.div>

          {/* Progress section */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Percentage with glow */}
            <div className="relative">
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-lg font-mono font-bold blur-md select-none"
                style={{
                  background:
                    "linear-gradient(135deg, #6c63ff, #00c6ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                aria-hidden="true"
              >
                {count}%
              </motion.span>
              <motion.span
                className="relative text-lg font-mono font-bold tabular-nums"
                style={{
                  background:
                    "linear-gradient(135deg, #6c63ff, #00c6ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {count}%
              </motion.span>
            </div>

            {/* Premium progress bar */}
            <div className="relative w-64 h-[4px] bg-border/20 rounded-full overflow-hidden">
              {/* Track glow */}
              <motion.div
                className="absolute -inset-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(108,99,255,0.15), rgba(0,198,255,0.15), rgba(255,107,157,0.15))",
                  filter: "blur(4px)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: count > 10 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Fill */}
              <motion.div
                className="relative h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.6,
                  delay: 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {/* Shimmer on bar */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.span
              className="text-[11px] font-mono text-foreground-subtle/60 tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 3 ? [0.4, 0.8, 0.4] : 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading Experience
            </motion.span>
          </motion.div>
        </div>

        {/* Corner brackets */}
        {[
          {
            pos: "top-5 left-5",
            border: "border-l-[2px] border-t-[2px]",
            round: "rounded-tl-lg",
            color: "border-accent/12",
            delay: 0.2,
          },
          {
            pos: "top-5 right-5",
            border: "border-r-[2px] border-t-[2px]",
            round: "rounded-tr-lg",
            color: "border-accent-cyan/12",
            delay: 0.3,
          },
          {
            pos: "bottom-5 left-5",
            border: "border-l-[2px] border-b-[2px]",
            round: "rounded-bl-lg",
            color: "border-accent-pink/12",
            delay: 0.4,
          },
          {
            pos: "bottom-5 right-5",
            border: "border-r-[2px] border-b-[2px]",
            round: "rounded-br-lg",
            color: "border-accent-orange/12",
            delay: 0.5,
          },
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

        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(108,99,255,0.1) 50%, transparent 95%)",
          }}
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
