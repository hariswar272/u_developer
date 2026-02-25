"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Zap } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="py-24 md:py-36 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-cyan/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="Get to know the person behind the code"
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Avatar with morphing border */}
          <SlideIn direction="left">
            <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem]">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-cyan/15 to-accent-pink/20 rounded-[2rem] blur-2xl animate-pulse-glow" />

              {/* Morphing shape */}
              <motion.div
                className="relative w-full h-full bg-gradient-to-br from-accent/10 via-background-secondary to-accent-cyan/10 border border-border/50 overflow-hidden shadow-xl animate-morph"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl md:text-8xl font-display font-bold gradient-text select-none">
                    GU
                  </span>
                </div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-3 -right-3 w-16 h-16 rounded-full border-2 border-dashed border-accent/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full border-2 border-dashed border-accent-cyan/20"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 -left-6 w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center shadow-lg"
              >
                <Zap size={16} className="text-white" />
              </motion.div>
            </div>
          </SlideIn>

          {/* Text */}
          <SlideIn direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground leading-snug">
                A passionate developer crafting{" "}
                <span className="gradient-text">digital experiences</span>
              </h3>

              <p className="text-foreground-muted leading-relaxed text-base md:text-lg">
                {profile.bio}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm text-green-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for freelance
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/15 text-sm text-accent font-medium">
                  <GraduationCap size={14} />
                  VVIT &mdash; Cyber Security
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background-secondary border border-border text-sm text-foreground-muted font-medium">
                  <MapPin size={14} />
                  {profile.location}
                </div>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Stats */}
        <FadeIn delay={0.3} className="mt-20 md:mt-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {profile.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 md:p-8 rounded-2xl bg-white border border-border/60 shadow-[0_2px_20px_rgba(0,0,0,0.04)] text-center group hover:shadow-[0_8px_40px_rgba(108,99,255,0.08)] hover:border-accent/20 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/3 to-accent-cyan/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <AnimatedCounter value={stat.value} label={stat.label} />
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
