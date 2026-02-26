"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] md:hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-white/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

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
            className="absolute top-[15%] left-[5%] w-72 h-72 bg-gradient-to-br from-accent/8 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[5%] w-56 h-56 bg-gradient-to-br from-accent-cyan/8 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Close Button */}
          <div className="relative flex justify-end p-5">
            <motion.button
              onClick={onClose}
              className="p-2.5 rounded-xl text-foreground-muted hover:text-foreground hover:bg-accent/5 transition-all duration-300"
              aria-label="Close menu"
              whileTap={{ scale: 0.9, rotate: 90 }}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="relative flex flex-col items-center justify-center gap-5 mt-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.08 + index * 0.06,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="group flex items-center gap-3 text-2xl font-display font-semibold text-foreground-muted hover:text-accent transition-colors duration-300 py-1.5"
              >
                <motion.span
                  className="inline-block w-0 group-hover:w-5 overflow-hidden transition-all duration-300"
                >
                  <ArrowUpRight size={18} className="text-accent" />
                </motion.span>
                <span>{link.label}</span>
              </motion.a>
            ))}

            {/* CTA */}
            <motion.a
              href="#contact"
              onClick={onClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08 + navLinks.length * 0.06 + 0.1,
                duration: 0.5,
              }}
              className="mt-6 relative inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-white font-semibold overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-150%", "150%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
              <Sparkles size={16} className="relative z-10" />
              <span className="relative z-10">Let&apos;s Talk</span>
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
