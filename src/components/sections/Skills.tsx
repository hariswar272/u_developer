"use client";

import { motion } from "framer-motion";
import * as SiIcons from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { fadeInUp } from "@/lib/constants";
import { skills, skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

function getIcon(iconName: string) {
  const Icon = (SiIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName];
  return Icon ? <Icon size={28} /> : null;
}

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-36 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/40 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent/3 via-transparent to-accent-cyan/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies I work with to bring ideas to life"
        />

        <div className="space-y-14">
          {skillCategories.map((category, catIndex) => {
            const categorySkills = skills.filter(
              (s) => s.category === category.key
            );

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
              >
                <h3 className="text-lg font-display font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent-cyan rounded-full" />
                  {category.label}
                </h3>

                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={fadeInUp}
                      whileHover={{
                        y: -6,
                        transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
                      }}
                      className={cn(
                        "group relative flex flex-col items-center gap-3 p-5 rounded-2xl",
                        "bg-white border border-border/60",
                        "shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
                        "hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(108,99,255,0.12)]",
                        "transition-all duration-500 cursor-default"
                      )}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative text-foreground-muted group-hover:text-accent transition-colors duration-300">
                        {getIcon(skill.icon)}
                      </div>
                      <span className="relative text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
