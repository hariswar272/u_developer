"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 md:py-36 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/40 to-background" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-accent/4 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-accent-cyan/4 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="My journey through learning, building, and growing"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Center Line with gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div className="w-full h-full bg-gradient-to-b from-accent/40 via-accent-cyan/30 to-accent-pink/20" />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isEducation = exp.id === "1";

              return (
                <FadeIn
                  key={exp.id}
                  direction={isLeft ? "left" : "right"}
                  delay={index * 0.15}
                >
                  <div
                    className={cn(
                      "relative flex items-start gap-8",
                      "md:gap-0",
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    )}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          "bg-white border-2 border-accent",
                          "shadow-[0_0_20px_rgba(108,99,255,0.2)]"
                        )}
                      >
                        {isEducation ? (
                          <GraduationCap size={16} className="text-accent" />
                        ) : (
                          <Briefcase size={14} className="text-accent" />
                        )}
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={cn(
                        "ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]",
                        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                      )}
                    >
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "p-6 md:p-7 rounded-2xl bg-white border border-border/60",
                          "shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
                          "hover:border-accent/20 hover:shadow-[0_12px_40px_rgba(108,99,255,0.1)]",
                          "transition-all duration-500"
                        )}
                      >
                        {/* Date pill */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/5 border border-accent/10 mb-4">
                          <span className="text-xs font-mono font-medium text-accent">
                            {exp.startDate} — {exp.endDate}
                          </span>
                        </div>

                        <h3 className="text-lg font-display font-bold text-foreground mb-1">
                          {exp.role}
                        </h3>

                        <p className="text-accent font-medium text-sm mb-3">
                          {exp.company}
                        </p>

                        <p className="text-foreground-muted text-sm leading-relaxed mb-5">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
