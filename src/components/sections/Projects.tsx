"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const filters = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
] as const;

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent-pink/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent-cyan/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A selection of my recent work and side projects"
        />

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 cursor-pointer",
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-accent to-accent-cyan text-white shadow-[0_4px_20px_rgba(108,99,255,0.3)]"
                  : "bg-white text-foreground-muted border border-border/60 hover:border-accent/30 hover:text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className={cn(
                  "group relative rounded-2xl overflow-hidden border border-border/60 bg-white",
                  "shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
                  "hover:border-accent/20 hover:shadow-[0_20px_60px_rgba(108,99,255,0.12)]",
                  "transition-all duration-500",
                  project.featured && "md:col-span-2 lg:col-span-2"
                )}
              >
                {/* Project Image Placeholder */}
                <div className="relative aspect-video bg-gradient-to-br from-background-secondary to-background-tertiary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent-cyan/8 flex items-center justify-center">
                    <span className="text-5xl font-display font-bold text-foreground-subtle/20">
                      {project.title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-cyan text-white shadow-[0_4px_20px_rgba(108,99,255,0.3)] hover:shadow-[0_8px_30px_rgba(108,99,255,0.4)] transition-shadow"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3.5 rounded-xl bg-foreground text-white shadow-[0_4px_20px_rgba(26,26,46,0.2)] hover:shadow-[0_8px_30px_rgba(26,26,46,0.3)] transition-shadow"
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-accent to-accent-cyan text-white shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-foreground-subtle opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex-shrink-0 mt-1"
                    />
                  </div>
                  <p className="text-foreground-muted text-sm mb-5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
