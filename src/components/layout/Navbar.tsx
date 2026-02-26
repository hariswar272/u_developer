"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    []
  );
  const activeSection = useScrollSpy(sectionIds, 80);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2"
            : "py-3"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-500",
              scrolled
                ? "h-14 bg-white/80 backdrop-blur-2xl border border-border/60 shadow-[0_8px_32px_rgba(108,99,255,0.08),0_2px_8px_rgba(0,0,0,0.04)]"
                : "h-16 bg-white/40 backdrop-blur-xl border border-white/40"
            )}
            layout
            transition={{ duration: 0.3 }}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group relative z-10">
              <motion.div
                className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-cyan flex items-center justify-center font-display font-bold text-white text-sm overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated shimmer on logo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
                <span className="relative z-10">MK</span>
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-sm text-foreground leading-none">
                  Mohan Krishna
                </span>
                <span className="text-[10px] text-foreground-subtle font-mono tracking-wider mt-0.5">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation — floating pill style */}
            <div className="hidden md:flex items-center gap-0.5 relative">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                const isHovered = hoveredLink === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(sectionId)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 z-10"
                  >
                    {/* Hover background pill */}
                    {isHovered && !isActive && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 bg-accent/[0.06] rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-cyan/10 rounded-lg border border-accent/10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Link text */}
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-300",
                        isActive
                          ? "text-accent font-semibold"
                          : "text-foreground-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                        layoutId="activeDot"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA + Mobile menu */}
            <div className="flex items-center gap-3">
              {/* Let's Talk button — desktop only */}
              <motion.a
                href="#contact"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-cyan text-white text-[13px] font-semibold shadow-[0_2px_12px_rgba(108,99,255,0.25)] hover:shadow-[0_4px_20px_rgba(108,99,255,0.35)] transition-shadow duration-300"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={12} />
                Let&apos;s Talk
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-accent/5 transition-all duration-300"
                aria-label="Open menu"
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={22} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
