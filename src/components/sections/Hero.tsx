"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download, Sparkles, Code2, Braces, Terminal } from "lucide-react";
import { TypeWriter } from "@/components/animations/TypeWriter";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 mesh-gradient" />
    ),
  }
);

// Floating particle component
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
      style={{ left: x, top: y, width: size, height: size, background: color }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.4, 0.8, 0],
        scale: [0, 1, 0.8, 1, 0],
        y: [0, -40, -20, -60, -80],
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

export function Hero() {
  // Stagger timing
  const stagger = (i: number) => 0.15 + i * 0.15;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] w-72 h-72 bg-gradient-to-br from-accent/20 to-accent-cyan/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 20, -40, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-gradient-to-br from-accent-pink/15 to-accent-orange/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent-cyan/10 to-accent/5 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} x="15%" y="30%" size={6} color="rgba(108,99,255,0.4)" />
      <FloatingParticle delay={1} x="80%" y="25%" size={4} color="rgba(0,198,255,0.4)" />
      <FloatingParticle delay={2} x="70%" y="60%" size={5} color="rgba(255,107,157,0.35)" />
      <FloatingParticle delay={3} x="25%" y="70%" size={4} color="rgba(108,99,255,0.3)" />
      <FloatingParticle delay={1.5} x="50%" y="20%" size={3} color="rgba(0,198,255,0.35)" />
      <FloatingParticle delay={4} x="90%" y="45%" size={5} color="rgba(108,99,255,0.25)" />
      <FloatingParticle delay={2.5} x="10%" y="55%" size={4} color="rgba(255,154,86,0.3)" />

      {/* Floating code icons */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[22%] right-[15%] p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/40 shadow-lg hidden md:flex"
      >
        <Code2 size={24} className="text-accent" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -8, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[28%] left-[12%] p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/40 shadow-lg hidden md:flex"
      >
        <Braces size={24} className="text-accent-cyan" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[60%] right-[8%] p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/40 shadow-lg hidden lg:flex"
      >
        <Terminal size={22} className="text-accent-pink" />
      </motion.div>

      {/* 3D Background */}
      <Scene />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: stagger(0), ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-accent/15 text-accent text-sm font-medium mb-8 shadow-[0_2px_20px_rgba(108,99,255,0.1)]"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={14} />
          </motion.span>
          <span>Student at VVIT &mdash; Cyber Security</span>
        </motion.div>

        {/* Greeting with blur-in */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: stagger(1), ease: [0.25, 0.4, 0.25, 1] }}
          className="text-foreground-muted text-lg md:text-xl mb-4 font-mono tracking-wide"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name — letter by letter stagger */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold font-display mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: stagger(2) }}
        >
          <span className="inline-flex overflow-hidden">
            {profile.name.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="gradient-text inline-block"
                initial={{ y: 80, opacity: 0, rotateX: 90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: stagger(2) + i * 0.04,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Typing Effect with blur-in */}
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

        {/* Tagline with blur-in */}
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="primary" size="lg" href="#projects">
              View My Work
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="outline" size="lg" href="/resume.pdf">
              <Download size={18} className="mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground-subtle hover:text-accent transition-colors duration-300"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-foreground-subtle/40 flex justify-center pt-1"
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-accent"
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
