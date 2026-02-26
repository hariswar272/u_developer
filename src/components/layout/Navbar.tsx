"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, ChevronRight } from "lucide-react";
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
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4"
      >
        <div className="max-w-6xl mx-auto pt-3">
          <motion.div
            className={cn(
              "relative flex items-center justify-between rounded-2xl transition-all duration-500 overflow-hidden",
              scrolled
                ? "h-14 px-4 sm:px-5 bg-white/75 backdrop-blur-2xl border border-border/50 shadow-[0_8px_40px_rgba(108,99,255,0.06),0_1px_3px_rgba(0,0,0,0.04)]"
                : "h-[3.5rem] px-4 sm:px-5 bg-white/50 backdrop-blur-xl border border-white/60"
            )}
            layout
            transition={{ duration: 0.3 }}
          >
            {/* Gradient shine across the top edge */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(108,99,255,0.2), rgba(0,198,255,0.2), rgba(255,107,157,0.15), transparent)",
              }}
              animate={{ opacity: scrolled ? 1 : 0.4 }}
              transition={{ duration: 0.5 }}
            />

            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2.5 group relative z-10"
            >
              <motion.div
                className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-accent via-accent-cyan to-accent flex items-center justify-center font-display font-bold text-white text-xs overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 text-[11px]">MK</span>
              </motion.div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-foreground leading-none">
                  Mohan Krishna
                </span>
                <motion.span
                  className="text-[9px] px-1.5 py-0.5 rounded-md bg-accent/8 text-accent font-mono font-medium tracking-wider"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                >
                  DEV
                </motion.span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-0.5 relative">
              {navLinks.map((link, index) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                const isHovered = hoveredLink === sectionId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(sectionId)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-3 py-1.5 text-[13px] font-medium z-10"
                  >
                    {/* Hover pill */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="navHover"
                          className="absolute inset-0 bg-accent/[0.05] rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg overflow-hidden"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent-cyan/8 to-accent/10" />
                        <div className="absolute inset-0 border border-accent/10 rounded-lg" />
                      </motion.div>
                    )}

                    {/* Text */}
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-200",
                        isActive
                          ? "text-accent font-semibold"
                          : "text-foreground-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </span>

                    {/* Active underline dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, #6c63ff, #00c6ff)",
                          boxShadow: "0 0 6px rgba(108,99,255,0.5)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* CTA button */}
              <motion.a
                href="#contact"
                className="hidden md:flex items-center gap-1.5 px-4 py-[6px] rounded-xl text-[12px] font-semibold text-white overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(135deg, #6c63ff, #00c6ff)",
                }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
                <Sparkles size={11} className="relative z-10" />
                <span className="relative z-10">Let&apos;s Talk</span>
                <ChevronRight
                  size={12}
                  className="relative z-10 -ml-0.5"
                />
              </motion.a>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-accent/5 transition-all duration-300"
                aria-label="Open menu"
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={20} />
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
