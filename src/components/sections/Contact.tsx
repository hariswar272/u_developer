"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Linkedin, Send, CheckCircle, XCircle, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { sendEmail } from "@/lib/emailjs";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await sendEmail(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background-secondary/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-accent-cyan/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together to make it happen"
        />

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <SlideIn direction="left" className="md:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-accent" />
                Let&apos;s Connect
              </h3>
              <p className="text-foreground-muted leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border/60 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(108,99,255,0.1)] transition-all duration-400 group"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent-cyan/10 text-accent group-hover:from-accent/20 group-hover:to-accent-cyan/20 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider">Email</p>
                  <p className="text-foreground font-medium">{profile.email}</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border/60 shadow-[0_2px_15px_rgba(0,0,0,0.04)]"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent-cyan/10 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider">Location</p>
                  <p className="text-foreground font-medium">
                    {profile.location}
                  </p>
                </div>
              </motion.div>

              <motion.a
                href={
                  profile.social.find((s) => s.icon === "linkedin")?.url || "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border/60 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(108,99,255,0.1)] transition-all duration-400 group"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent-cyan/10 text-accent group-hover:from-accent/20 group-hover:to-accent-cyan/20 transition-colors">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-xs text-foreground-subtle font-medium uppercase tracking-wider">LinkedIn</p>
                  <p className="text-foreground font-medium">Connect with me</p>
                </div>
              </motion.a>
            </div>
          </SlideIn>

          {/* Contact Form */}
          <FadeIn delay={0.2} className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 md:p-8 rounded-2xl bg-white border border-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <Input
                id="subject"
                name="subject"
                label="Subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              <Textarea
                id="message"
                name="message"
                label="Message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 text-sm font-medium p-3 rounded-xl bg-green-50 border border-green-200"
                  >
                    <CheckCircle size={16} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-600 text-sm font-medium p-3 rounded-xl bg-red-50 border border-red-200"
                  >
                    <XCircle size={16} />
                    Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
