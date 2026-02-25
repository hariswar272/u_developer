"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/\d/g, "");

    if (isNaN(numericPart)) {
      setDisplayValue(value);
      return;
    }

    let current = 0;
    const increment = Math.ceil(numericPart / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericPart) {
        current = numericPart;
        clearInterval(timer);
      }
      setDisplayValue(`${current}${suffix}`);
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
        {displayValue}
      </div>
      <div className="text-sm text-foreground-muted font-medium">{label}</div>
    </motion.div>
  );
}
