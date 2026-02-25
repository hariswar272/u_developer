"use client";

import { Github, Linkedin, Twitter, Mail, Heart, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { profile } from "@/data/profile";

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  mail: <Mail size={20} />,
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-background-secondary/30 to-background-secondary/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FadeIn direction="up" blur={false}>
          <div className="flex flex-col items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {profile.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl text-foreground-muted hover:text-accent hover:bg-accent/5 border border-transparent hover:border-accent/15 transition-all duration-300"
                  aria-label={social.name}
                >
                  {socialIcons[social.icon]}
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-foreground-subtle flex items-center gap-1.5">
              &copy; {new Date().getFullYear()} {profile.name}. Built with
              <Heart size={14} className="text-accent-pink fill-accent-pink" />
              using Next.js
            </p>

            {/* Developed by Ruthless Coder */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 text-xs text-foreground-subtle/70"
            >
              <Code2 size={12} className="text-accent/50" />
              <span>
                Developed by{" "}
                <span className="font-semibold gradient-text">
                  Ruthless Coder
                </span>
              </span>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
