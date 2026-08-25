"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexovateLogo } from "./NexovateLogo";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export const Navbar: React.FC = () => {
  const { activeSectionIndex, goToSection } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact Ordered Sequence: Why Nexovate -> Programs -> Experience -> Projects -> Student Reviews -> Institutions -> About -> Contact
  const navItems = [
    { name: "Why Nexovate", sectionIndex: 1, number: "02", href: "#why-nexovate" },
    { name: "Programs", sectionIndex: 2, number: "03", href: "#programs" },
    { name: "Experience", sectionIndex: 3, number: "04", href: "#experience" },
    { name: "Projects", sectionIndex: 4, number: "05", href: "#projects" },
    { name: "Student Reviews", sectionIndex: 5, number: "06", href: "#reviews" },
    { name: "Institutions", sectionIndex: 6, number: "07", href: "#institutions" },
    { name: "About", sectionIndex: 7, number: "08", href: "#about" },
    { name: "Contact", sectionIndex: 8, number: "09", href: "#contact" },
  ];

  const mobileNavItems = [
    ...navItems,
    { name: "Get Started", sectionIndex: 8, number: "09", href: "#contact" },
  ];

  const handleNavClick = (index: number) => {
    goToSection(index);
    setMobileMenuOpen(false);
  };

  const progressPercent = ((activeSectionIndex + 1) / 10) * 100;
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FAFBFC]/85 backdrop-blur-md border-b border-[#101536]/06 select-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Exact Official Brand Logo */}
          <button
            onClick={() => handleNavClick(0)}
            className="focus:outline-none focus:ring-2 focus:ring-[#119E9D] rounded-lg transition-transform hover:opacity-90 text-left"
            aria-label="Go to Slide 01 (Hero)"
          >
            <NexovateLogo size={36} />
          </button>

          {/* Desktop Navigation Links with Interactive Active Indicator */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSectionIndex === item.sectionIndex;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.sectionIndex)}
                  className={`relative px-3 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#119E9D] ${
                    isActive ? "text-[#101536]" : "text-[#5E6675] hover:text-[#101536]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-[#101536]/06 rounded-full -z-10"
                    />
                  )}
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#119E9D]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick(8)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#101536] text-white hover:bg-[#119E9D] transition-colors duration-200 shadow-xs group focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#EFAF32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>

          {/* UNIQUE CUSTOM 3-STROKE NEXOVATE MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-11 h-11 rounded-2xl bg-[#101536]/05 hover:bg-[#101536]/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#119E9D] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: 45, y: 8, width: 22, backgroundColor: "#119E9D" }
                  : { rotate: 0, y: 0, width: 16, backgroundColor: "#101536" }
              }
              transition={{ duration: 0.45, ease: cubicEase }}
              className="h-[2.5px] rounded-full self-start ml-2.5"
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { opacity: 0, x: -10 }
                  : { opacity: 1, x: 0, width: 22, backgroundColor: "#101536" }
              }
              transition={{ duration: 0.35, ease: cubicEase }}
              className="h-[2.5px] rounded-full self-start ml-2.5"
            />
            <motion.span
              animate={
                mobileMenuOpen
                  ? { rotate: -45, y: -8, width: 22, backgroundColor: "#119E9D" }
                  : { rotate: 0, y: 0, width: 18, backgroundColor: "#101536" }
              }
              transition={{ duration: 0.45, ease: cubicEase }}
              className="h-[2.5px] rounded-full self-start ml-2.5"
            />
          </button>
        </div>

        {/* Presentation Hairline Progress Bar */}
        <div className="w-full h-[2px] bg-transparent overflow-hidden">
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#119E9D] via-[#119E9D] to-[#EFAF32]"
          />
        </div>
      </header>

      {/* FULLSCREEN DEEP NAVY MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: cubicEase }}
            className="lg:hidden fixed inset-0 z-40 bg-[#0B1028] text-white flex flex-col justify-between p-6 sm:p-8 pt-24 overflow-y-auto"
          >
            {/* Background Ambient Glow */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#119E9D]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#EFAF32]/05 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
              <NexovateLogo variant="dark" size={32} />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                NAVIGATION
              </span>
            </div>

            <nav className="relative z-10 flex flex-col gap-1.5 py-3">
              {mobileNavItems.map((item, idx) => {
                const isActive = activeSectionIndex === item.sectionIndex;
                const isGetStarted = item.name === "Get Started";

                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + idx * 0.035,
                      ease: cubicEase,
                    }}
                    onClick={() => handleNavClick(item.sectionIndex)}
                    className={`group text-left px-4 py-2 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                      isGetStarted
                        ? "bg-[#119E9D] text-white font-bold shadow-sm mt-2"
                        : isActive
                        ? "bg-white/10 text-white font-bold border border-white/15"
                        : "text-[#AEB7C7] hover:text-white hover:bg-white/05"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          isGetStarted ? "text-white/80" : "text-[#119E9D]"
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="text-sm font-semibold tracking-wide uppercase">
                        {item.name}
                      </span>
                    </div>

                    <span
                      className={`text-xs ${
                        isGetStarted
                          ? "text-[#EFAF32]"
                          : "text-[#EFAF32] opacity-0 group-hover:opacity-100 transition-opacity"
                      }`}
                    >
                      {isGetStarted ? <Sparkles className="w-3.5 h-3.5" /> : "→"}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 font-mono">
              <span>© 2026 NEXOVATE</span>
              <span>NEXT • LEARN • INNOVATE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
