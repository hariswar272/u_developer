"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as SiIcons from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

function getIcon(
  iconName: string
): React.ComponentType<{ size?: number; className?: string }> | null {
  const Icon = (
    SiIcons as Record<
      string,
      React.ComponentType<{ size?: number; className?: string }>
    >
  )[iconName];
  return Icon || null;
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-24 md:py-36 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/40 to-background" />

      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,99,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-[20%] right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-accent/4 via-transparent to-transparent rounded-full blur-[100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-accent-cyan/4 via-transparent to-transparent rounded-full blur-[80px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies I work with to bring ideas to life"
        />

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              activeCategory === "all"
                ? "text-white"
                : "text-foreground-muted hover:text-foreground bg-white/60 border border-border/40 hover:border-accent/20"
            )}
          >
            {activeCategory === "all" && (
              <motion.div
                layoutId="activeSkillTab"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent-cyan shadow-[0_4px_16px_rgba(108,99,255,0.25)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">All</span>
          </button>
          {skillCategories.map((cat) => {
            const count = skills.filter(
              (s) => s.category === cat.key
            ).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  activeCategory === cat.key
                    ? "text-white"
                    : "text-foreground-muted hover:text-foreground bg-white/60 border border-border/40 hover:border-accent/20"
                )}
              >
                {activeCategory === cat.key && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent-cyan shadow-[0_4px_16px_rgba(108,99,255,0.25)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {cat.label}
                  <span className="ml-1.5 text-xs opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const IconComponent = getIcon(skill.icon);

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.03,
                    ease: [0.25, 0.4, 0.25, 1],
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.25 },
                  }}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default overflow-hidden",
                    "bg-white/80 backdrop-blur-sm border border-border/50",
                    "shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
                    "hover:border-accent/25 hover:shadow-[0_16px_48px_rgba(108,99,255,0.12)]",
                    "transition-all duration-400"
                  )}
                >
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Background glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.04] to-accent-cyan/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon with animated ring */}
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 rounded-full border border-accent/0 group-hover:border-accent/15 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="relative w-10 h-10 flex items-center justify-center text-foreground-muted group-hover:text-accent transition-colors duration-300">
                      {IconComponent && <IconComponent size={28} />}
                    </div>
                  </div>

                  {/* Name */}
                  <span className="relative text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors duration-300 text-center leading-tight">
                    {skill.name}
                  </span>

                  {/* Category tag */}
                  <span className="absolute top-2 right-2 text-[8px] font-mono text-foreground-subtle/0 group-hover:text-foreground-subtle/50 transition-colors duration-500 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom stat line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex items-center justify-center gap-8 text-sm text-foreground-subtle"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan" />
            <span className="font-mono">
              {skills.length} Technologies
            </span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-pink to-accent-orange" />
            <span className="font-mono">
              {skillCategories.length} Categories
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
