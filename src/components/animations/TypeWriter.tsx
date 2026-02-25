"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypeWriter({
  words,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const isPausedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function tick() {
      const currentWord = words[wordIndexRef.current];

      if (isPausedRef.current) {
        isPausedRef.current = false;
        isDeletingRef.current = true;
        timeoutRef.current = setTimeout(tick, deletingSpeed);
        return;
      }

      if (!isDeletingRef.current) {
        charIndexRef.current++;
        setDisplayText(currentWord.substring(0, charIndexRef.current));

        if (charIndexRef.current === currentWord.length) {
          isPausedRef.current = true;
          timeoutRef.current = setTimeout(tick, pauseDuration);
          return;
        }

        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        charIndexRef.current--;
        setDisplayText(currentWord.substring(0, charIndexRef.current));

        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          timeoutRef.current = setTimeout(tick, typingSpeed);
          return;
        }

        timeoutRef.current = setTimeout(tick, deletingSpeed);
      }
    }

    timeoutRef.current = setTimeout(tick, typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="inline-block">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "steps(2)",
        }}
        className="inline-block w-[3px] h-[1.1em] ml-1 translate-y-[0.05em] rounded-full bg-gradient-to-b from-accent to-accent-cyan shadow-[0_0_8px_rgba(108,99,255,0.5)]"
      />
    </span>
  );
}
