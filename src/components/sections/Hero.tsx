"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
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

// Twinkling star particle (CSS-based for performance)
function StarParticle({
  x,
  y,
  size,
  delay,
  color,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
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
        boxShadow: `0 0 ${size * 3}px ${color}`,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.3, 0.8],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Floating 2D diamond shape (for layered depth)
function FloatingDiamond2D({
  x,
  y,
  size,
  delay,
  color,
  duration,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
  color: string;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="border backdrop-blur-sm"
        style={{
          width: size,
          height: size,
          transform: "rotate(45deg)",
          borderColor: color,
          background: `${color}08`,
          boxShadow: `0 0 ${size}px ${color}20`,
        }}
      />
    </motion.div>
  );
}

export function Hero() {
  const stagger = (i: number) => 0.15 + i * 0.15;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Soft radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f0ff] via-white to-[#f5f8ff]" />

      {/* Subtle radial glow behind globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-accent/8 via-accent/3 to-transparent rounded-full blur-[60px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[500px] h-[500px] bg-gradient-radial from-accent-cyan/6 via-transparent to-transparent rounded-full blur-[80px]" />

      {/* Animated gradient orbs (subtle for light theme) */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-gradient-to-br from-accent/8 to-transparent rounded-full blur-[80px]"
      />
      <motion.div
        animate={{ x: [0, -35, 25, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-accent-pink/6 to-transparent rounded-full blur-[100px]"
      />

      {/* Twinkling star particles */}
      <StarParticle x="8%" y="15%" size={3} delay={0} color="rgba(108,99,255,0.6)" />
      <StarParticle x="92%" y="20%" size={2} delay={0.5} color="rgba(0,198,255,0.5)" />
      <StarParticle x="15%" y="75%" size={2.5} delay={1.0} color="rgba(255,107,157,0.5)" />
      <StarParticle x="85%" y="70%" size={2} delay={1.5} color="rgba(108,99,255,0.5)" />
      <StarParticle x="50%" y="8%" size={2} delay={0.3} color="rgba(0,198,255,0.6)" />
      <StarParticle x="25%" y="40%" size={2.5} delay={0.8} color="rgba(108,99,255,0.4)" />
      <StarParticle x="75%" y="45%" size={2} delay={1.3} color="rgba(255,107,157,0.4)" />
      <StarParticle x="40%" y="88%" size={3} delay={0.2} color="rgba(0,198,255,0.5)" />
      <StarParticle x="60%" y="12%" size={2} delay={1.8} color="rgba(108,99,255,0.5)" />
      <StarParticle x="5%" y="50%" size={2.5} delay={2.0} color="rgba(255,154,86,0.5)" />
      <StarParticle x="95%" y="55%" size={2} delay={0.7} color="rgba(108,99,255,0.4)" />
      <StarParticle x="35%" y="25%" size={2} delay={1.2} color="rgba(0,198,255,0.4)" />
      <StarParticle x="70%" y="85%" size={2.5} delay={0.4} color="rgba(255,107,157,0.5)" />
      <StarParticle x="18%" y="60%" size={2} delay={1.6} color="rgba(108,99,255,0.5)" />
      <StarParticle x="82%" y="35%" size={3} delay={0.9} color="rgba(0,198,255,0.6)" />

      {/* Floating 2D diamonds for layered depth */}
      <FloatingDiamond2D x="6%" y="22%" size={16} delay={0} color="rgba(108,99,255,0.3)" duration={8} />
      <FloatingDiamond2D x="90%" y="18%" size={12} delay={1} color="rgba(0,198,255,0.25)" duration={9} />
      <FloatingDiamond2D x="12%" y="72%" size={10} delay={2} color="rgba(255,107,157,0.25)" duration={7} />
      <FloatingDiamond2D x="88%" y="68%" size={14} delay={0.5} color="rgba(108,99,255,0.2)" duration={10} />
      <FloatingDiamond2D x="20%" y="35%" size={8} delay={1.5} color="rgba(0,198,255,0.2)" duration={8.5} />
      <FloatingDiamond2D x="78%" y="80%" size={10} delay={3} color="rgba(255,154,86,0.2)" duration={9.5} />
      <FloatingDiamond2D x="45%" y="5%" size={12} delay={2.5} color="rgba(108,99,255,0.2)" duration={7.5} />
      <FloatingDiamond2D x="55%" y="92%" size={10} delay={1.8} color="rgba(0,198,255,0.2)" duration={11} />

      {/* 3D Scene: central globe + 3D diamonds + star dots */}
      <Scene />

      {/* Subtle overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50 pointer-events-none" />

      {/* Content — centered over the globe */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: stagger(0), ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-accent/15 text-accent text-sm font-semibold mb-8 shadow-[0_4px_30px_rgba(108,99,255,0.12)]"
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

        {/* Name — letter by letter with 3D perspective */}
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

        {/* Animated gradient divider */}
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

        {/* Typing effect */}
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

      {/* Scroll indicator */}
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
