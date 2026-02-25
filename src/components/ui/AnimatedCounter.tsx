"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

function SpringNumber({ target, suffix }: { target: number; suffix: string }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 18,
    mass: 1,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    motionValue.set(target);
  }, [motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(`${Math.round(latest)}${suffix}`);
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <>{display}</>;
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
        {/* Glow effect behind number */}
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold gradient-text blur-lg opacity-25 select-none pointer-events-none"
          aria-hidden="true"
        >
          {value}
        </div>

        <div className="relative text-4xl md:text-5xl font-bold gradient-text mb-2 tabular-nums">
          {isValid && isInView ? (
            <SpringNumber target={numericPart} suffix={suffix} />
          ) : isValid ? (
            `0${suffix}`
          ) : (
            value
          )}
        </div>
      </div>
      <div className="text-sm text-foreground-muted font-medium tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}
