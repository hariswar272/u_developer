"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostman,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiRedis,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
  SiVercel,
  SiVscodium,
  SiFigma,
} from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

// Direct icon map — avoids importing the entire react-icons/si barrel
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPostman,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiRedis,
  SiGit,
  SiDocker,
  SiAmazonwebservices,
  SiVercel,
  SiVscodium,
  SiFigma,
};

// Accent colors per category
const categoryColors: Record<string, { from: string; to: string; accent: string }> = {
  frontend: { from: "from-blue-500/10", to: "to-cyan-500/10", accent: "text-blue-500" },
  backend: { from: "from-emerald-500/10", to: "to-green-500/10", accent: "text-emerald-500" },
  database: { from: "from-orange-500/10", to: "to-amber-500/10", accent: "text-orange-500" },
  tools: { from: "from-violet-500/10", to: "to-purple-500/10", accent: "text-violet-500" },
};

const categoryAccentBorder: Record<string, string> = {
  frontend: "group-hover:border-blue-400/30",
  backend: "group-hover:border-emerald-400/30",
  database: "group-hover:border-orange-400/30",
  tools: "group-hover:border-violet-400/30",
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills = useMemo(
    () =>
      activeCategory === "all"
        ? skills
        : skills.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="skills" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/30 to-background" />
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(108,99,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Static gradient orbs — no Framer Motion, pure CSS */}
      <div className="absolute top-[15%] right-[5%] w-[450px] h-[450px] bg-gradient-to-br from-accent/5 via-transparent to-transparent rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-gradient-to-br from-accent-cyan/5 via-transparent to-transparent rounded-full blur-[80px] animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies I work with to bring ideas to life"
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-14"
        >
          {[{ key: "all", label: "All" }, ...skillCategories].map((cat) => {
            const isActive = activeCategory === cat.key;
            const count =
              cat.key === "all"
                ? skills.length
                : skills.filter((s) => s.category === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  isActive
                    ? "text-white shadow-[0_4px_20px_rgba(108,99,255,0.3)]"
                    : "text-foreground-muted hover:text-foreground bg-white border border-border/50 hover:border-accent/20 hover:shadow-sm"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="skillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat.label}
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                      isActive
                        ? "bg-white/20"
                        : "bg-accent/5 text-accent"
                    )}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon];
              const colors = categoryColors[skill.category] || categoryColors.frontend;
              const borderColor = categoryAccentBorder[skill.category] || "";

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.025,
                    ease: [0.25, 0.4, 0.25, 1],
                    layout: {
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    },
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default overflow-hidden",
                    "bg-white border border-border/40",
                    "shadow-[0_1px_8px_rgba(0,0,0,0.03)]",
                    "hover:shadow-[0_12px_40px_rgba(108,99,255,0.1)]",
                    borderColor,
                    "transition-all duration-300"
                  )}
                >
                  {/* Top accent line */}
                  <div
                    className={cn(
                      "absolute top-0 left-[20%] right-[20%] h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:left-[10%] group-hover:right-[10%]",
                      `bg-gradient-to-r ${colors.from.replace("/10", "/60")} ${colors.to.replace("/10", "/60")}`
                    )}
                    style={{
                      background: skill.category === "frontend"
                        ? "linear-gradient(90deg, #3b82f6, #06b6d4)"
                        : skill.category === "backend"
                        ? "linear-gradient(90deg, #10b981, #22c55e)"
                        : skill.category === "database"
                        ? "linear-gradient(90deg, #f97316, #f59e0b)"
                        : "linear-gradient(90deg, #8b5cf6, #a855f7)",
                    }}
                  />

                  {/* Background glow on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-400",
                      colors.from,
                      colors.to
                    )}
                  />

                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                        "bg-gradient-to-br",
                        colors.from,
                        colors.to,
                        "group-hover:scale-110"
                      )}
                    >
                      <div
                        className={cn(
                          "transition-colors duration-300 text-foreground-muted",
                          `group-hover:${colors.accent}`
                        )}
                        style={{
                          color: undefined,
                        }}
                      >
                        {IconComponent && (
                          <IconComponent size={24} className="text-inherit group-hover:text-current" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <span className="relative text-[13px] font-semibold text-foreground-muted group-hover:text-foreground transition-colors duration-300 text-center leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-white/60 border border-border/40 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan animate-pulse" />
              <span className="text-sm font-mono text-foreground-muted">
                <span className="font-bold text-foreground">{skills.length}</span> Technologies
              </span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-accent-pink to-accent-orange animate-pulse" />
              <span className="text-sm font-mono text-foreground-muted">
                <span className="font-bold text-foreground">{skillCategories.length}</span> Categories
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
