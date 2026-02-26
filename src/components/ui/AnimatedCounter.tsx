"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useInView,
} from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

function SpringNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    motionValue.set(target);
  }, [motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const rounded = Math.round(latest);
      setDisplay(rounded);
      if (rounded === target) {
        setDone(true);
      }
    });
    return unsubscribe;
  }, [springValue, target]);

  return (
    <motion.span
      className="inline-flex items-baseline tabular-nums"
      animate={done ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <span>{display}</span>
      {suffix && (
        <span className="text-accent-cyan">{suffix}</span>
      )}
    </motion.span>
  );
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericPart = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "");
  const isValid = !isNaN(numericPart);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="relative">
        {/* Glow behind number */}
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold gradient-text blur-lg opacity-20 select-none pointer-events-none"
          aria-hidden="true"
        >
          {value}
        </div>

        <div className="relative text-4xl md:text-5xl font-bold gradient-text mb-2 tabular-nums">
          {isValid && isInView ? (
            <SpringNumber target={numericPart} suffix={suffix} />
          ) : isValid ? (
            <span>0{suffix}</span>
          ) : (
            value
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-sm text-foreground-muted font-medium tracking-wide"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
