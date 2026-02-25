"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <FadeIn className={cn("mb-16 md:mb-20", className)}>
      <div
        className={cn(
          align === "center" && "text-center",
          align === "left" && "text-left"
        )}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
        >
          <span className="gradient-text">{title}</span>
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-foreground-muted text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          className={cn(
            "mt-6 h-1 w-20 bg-gradient-to-r from-accent via-accent-cyan to-accent-pink rounded-full",
            align === "center" && "mx-auto"
          )}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
        />
      </div>
    </FadeIn>
  );
}
