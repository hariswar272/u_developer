"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Sparkles,
  Code2,
  Braces,
  Terminal,
  Zap,
  Globe,
} from "lucide-react";
import { TypeWriter } from "@/components/animations/TypeWriter";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 mesh-gradient" />,
  }
);

// Glowing floating particle
function FloatingParticle({
  delay,
  x,
  y,
  size,
  color,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.5, 1, 0],
        scale: [0, 1.2, 0.8, 1.2, 0],
        y: [0, -50, -25, -70, -100],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Animated grid line component
function AnimatedGridLine({
  direction,
  position,
  delay,
}: {
  direction: "horizontal" | "vertical";
  position: string;
  delay: number;
}) {
  const isHorizontal = direction === "horizontal";
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        [isHorizontal ? "top" : "left"]: position,
        [isHorizontal ? "left" : "top"]: 0,
        [isHorizontal ? "right" : "bottom"]: 0,
        [isHorizontal ? "height" : "width"]: "1px",
        background: isHorizontal
          ? "linear-gradient(90deg, transparent, rgba(108,99,255,0.08), rgba(0,198,255,0.06), transparent)"
          : "linear-gradient(180deg, transparent, rgba(108,99,255,0.08), rgba(0,198,255,0.06), transparent)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
    />
  );
}

export function Hero() {
  const stagger = (i: number) => 0.15 + i * 0.15;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Premium aurora background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 aurora-bg" />

      {/* Animated subtle grid */}
      <AnimatedGridLine direction="horizontal" position="20%" delay={0.5} />
      <AnimatedGridLine direction="horizontal" position="40%" delay={0.7} />
      <AnimatedGridLine direction="horizontal" position="60%" delay={0.9} />
      <AnimatedGridLine direction="horizontal" position="80%" delay={1.1} />
      <AnimatedGridLine direction="vertical" position="20%" delay={0.6} />
      <AnimatedGridLine direction="vertical" position="40%" delay={0.8} />
      <AnimatedGridLine direction="vertical" position="60%" delay={1.0} />
      <AnimatedGridLine direction="vertical" position="80%" delay={1.2} />

      {/* Large animated gradient orbs with glow */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-accent/15 via-accent-cyan/8 to-transparent rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.85, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-accent-pink/12 via-accent-orange/8 to-transparent rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 25, -35, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-gradient-to-br from-accent-cyan/10 to-accent/5 rounded-full blur-[80px]"
      />

      {/* Floating glowing particles */}
      <FloatingParticle delay={0} x="12%" y="28%" size={5} color="rgba(108,99,255,0.5)" />
      <FloatingParticle delay={0.8} x="82%" y="22%" size={4} color="rgba(0,198,255,0.5)" />
      <FloatingParticle delay={1.6} x="72%" y="58%" size={5} color="rgba(255,107,157,0.4)" />
      <FloatingParticle delay={2.4} x="22%" y="68%" size={3} color="rgba(108,99,255,0.4)" />
      <FloatingParticle delay={1.2} x="48%" y="18%" size={3} color="rgba(0,198,255,0.45)" />
      <FloatingParticle delay={3.2} x="88%" y="42%" size={4} color="rgba(108,99,255,0.35)" />
      <FloatingParticle delay={2.0} x="8%" y="52%" size={4} color="rgba(255,154,86,0.4)" />
      <FloatingParticle delay={0.4} x="65%" y="12%" size={3} color="rgba(255,107,157,0.35)" />
      <FloatingParticle delay={3.6} x="35%" y="82%" size={4} color="rgba(0,198,255,0.35)" />

      {/* Floating code icon cards with glass effect */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[13%] p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(108,99,255,0.12)] hidden md:flex"
      >
        <Code2 size={24} className="text-accent" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -8, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[26%] left-[10%] p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,198,255,0.12)] hidden md:flex"
      >
        <Braces size={24} className="text-accent-cyan" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 6, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[58%] right-[7%] p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(255,107,157,0.12)] hidden lg:flex"
      >
        <Terminal size={22} className="text-accent-pink" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -5, 5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[15%] left-[8%] p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(108,99,255,0.1)] hidden lg:flex"
      >
        <Zap size={20} className="text-accent-orange" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 4, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[35%] right-[18%] p-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,198,255,0.1)] hidden xl:flex"
      >
        <Globe size={20} className="text-accent-cyan" />
      </motion.div>

      {/* 3D Background */}
      <Scene />

      {/* Premium overlay with grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/70 pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: stagger(0), ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-accent/15 text-accent text-sm font-semibold mb-8 shadow-[0_4px_30px_rgba(108,99,255,0.12)] hover:shadow-[0_8px_40px_rgba(108,99,255,0.18)] transition-shadow duration-500"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={15} />
          </motion.span>
          <span>Student at VVIT &mdash; Cyber Security</span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: stagger(1), ease: [0.25, 0.4, 0.25, 1] }}
          className="text-foreground-muted text-lg md:text-xl mb-4 font-mono tracking-wider"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name — premium letter stagger with 3D flip */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold font-display mb-4 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: stagger(2) }}
        >
          <span className="inline-flex overflow-hidden" style={{ perspective: "600px" }}>
            {profile.name.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="gradient-text inline-block"
                initial={{ y: 100, opacity: 0, rotateX: 90, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: stagger(2) + i * 0.045,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Animated gradient divider line */}
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: stagger(4), ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="relative h-[2px] w-32 md:w-48 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d, #6c63ff)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: stagger(5), ease: [0.25, 0.4, 0.25, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-foreground-muted mb-5 h-12 font-light"
        >
          <TypeWriter
            words={profile.roles}
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2000}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: stagger(6), ease: [0.25, 0.4, 0.25, 1] }}
          className="text-foreground-muted max-w-2xl mx-auto mb-12 text-base sm:text-lg leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: stagger(7), ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button variant="primary" size="lg" href="#projects">
              View My Work
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" size="lg" href="/resume.pdf">
              <Download size={18} className="mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground-subtle hover:text-accent transition-colors duration-300 group"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div className="w-6 h-10 rounded-full border-2 border-foreground-subtle/30 group-hover:border-accent/50 flex justify-center pt-1.5 transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-accent to-accent-cyan"
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
