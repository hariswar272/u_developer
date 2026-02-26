"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Sparkles, ArrowRight, Terminal } from "lucide-react";
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

export function Hero() {
  const s = (step: number) => 0.1 + step * 0.12;
  const taglineWords = profile.tagline.split(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0ff] via-white to-[#f5f8ff]" />

      {/* Tech grid — pure CSS, no JS overhead */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glows — static, no animation needed */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/8 via-accent/3 to-transparent rounded-full blur-[60px]" />
      <div className="absolute top-[30%] left-[15%] w-[300px] h-[300px] bg-gradient-to-br from-accent/6 to-transparent rounded-full blur-[80px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-gradient-to-br from-accent-cyan/5 to-transparent rounded-full blur-[80px]" />

      {/* CSS-animated star particles (no Framer Motion, hardware accelerated) */}
      {[
        { x: "8%", y: "15%", s: 3, d: "3s", c: "rgba(108,99,255,0.5)" },
        { x: "92%", y: "20%", s: 2.5, d: "4s", c: "rgba(0,198,255,0.4)" },
        { x: "15%", y: "75%", s: 2, d: "3.5s", c: "rgba(255,107,157,0.4)" },
        { x: "85%", y: "65%", s: 2.5, d: "4.5s", c: "rgba(108,99,255,0.4)" },
        { x: "50%", y: "8%", s: 2, d: "3s", c: "rgba(0,198,255,0.5)" },
        { x: "25%", y: "45%", s: 3, d: "5s", c: "rgba(108,99,255,0.3)" },
        { x: "75%", y: "80%", s: 2, d: "3.8s", c: "rgba(255,107,157,0.4)" },
        { x: "40%", y: "90%", s: 2.5, d: "4.2s", c: "rgba(0,198,255,0.4)" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            background: p.c,
            boxShadow: `0 0 ${p.s * 3}px ${p.c}`,
            animationDuration: p.d,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* 3D Scene */}
      <Scene />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: s(0), ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 border border-accent/15 text-accent text-sm font-semibold mb-8 shadow-[0_4px_24px_rgba(108,99,255,0.1)]"
        >
          <Sparkles size={15} className="animate-spin-slow" />
          <span>Student at VVIT &mdash; Cyber Security</span>
        </motion.div>

        {/* Greeting */}
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, delay: s(2), ease: [0.25, 0.4, 0.25, 1] }}
            className="text-foreground-muted text-lg md:text-xl font-mono tracking-wider"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: s(2) + 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mr-2"
            >
              <Terminal size={18} className="inline text-accent" />
            </motion.span>
            Hello, I&apos;m
          </motion.p>
        </div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold font-display mb-4 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: s(4) }}
        >
          <span className="inline-flex flex-wrap justify-center" style={{ perspective: "800px" }}>
            {profile.name.split("").map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="gradient-text inline-block"
                initial={{ y: 100, opacity: 0, rotateX: 80, scale: 0.4 }}
                animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: s(4) + i * 0.04,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Gradient underline */}
          <motion.div
            className="mx-auto mt-2 h-[3px] rounded-full overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "50%", opacity: 1 }}
            transition={{
              duration: 1,
              delay: s(4) + profile.name.length * 0.04 + 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <div
              className="h-full w-full rounded-full animate-gradient-shift"
              style={{
                background: "linear-gradient(90deg, #6c63ff, #00c6ff, #ff6b9d, #6c63ff)",
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: s(10), ease: [0.25, 0.4, 0.25, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-foreground-muted mb-5 h-12 font-light"
        >
          <TypeWriter words={profile.roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2000} />
        </motion.div>

        {/* Tagline */}
        <div className="max-w-2xl mx-auto mb-12 text-base sm:text-lg leading-relaxed">
          <span className="flex flex-wrap justify-center gap-x-[0.35em]">
            {taglineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block text-foreground-muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: s(12) + i * 0.05,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: s(15), ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button variant="primary" size="lg" href="#projects">
              View My Work
              <ArrowRight size={18} className="ml-1" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outline" size="lg" href="/resume.pdf">
              <Download size={18} className="mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-foreground-subtle hover:text-accent transition-colors duration-300 group"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-foreground-subtle/30 group-hover:border-accent/50 flex justify-center pt-1.5 transition-colors duration-300">
            <div className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-accent to-accent-cyan animate-bounce-slow" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
