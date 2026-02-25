"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
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
          {/* Backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-white/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Decorative gradient orbs */}
          <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-gradient-to-br from-accent-cyan/10 to-transparent rounded-full blur-3xl" />

          {/* Close Button */}
          <div className="relative flex justify-end p-5">
            <motion.button
              onClick={onClose}
              className="p-2.5 rounded-xl text-foreground-muted hover:text-foreground hover:bg-accent/5 transition-all duration-300"
              aria-label="Close menu"
              whileTap={{ scale: 0.9, rotate: 90 }}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="relative flex flex-col items-center justify-center gap-6 mt-12">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.1 + index * 0.07,
                  duration: 0.5,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="relative text-2xl font-display font-semibold text-foreground-muted hover:text-accent transition-colors duration-300 py-2"
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div
                  className="absolute bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-cyan rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            {/* CTA button in mobile menu */}
            <motion.a
              href="#contact"
              onClick={onClose}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + navLinks.length * 0.07 + 0.1,
                duration: 0.5,
              }}
              className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-accent to-accent-cyan text-white font-semibold shadow-[0_4px_20px_rgba(108,99,255,0.3)]"
            >
              <Sparkles size={16} />
              Let&apos;s Talk
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
