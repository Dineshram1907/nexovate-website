"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexovateLogo } from "./NexovateLogo";
import { ArrowRight, Sparkles } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { NAV_ITEMS } from "@/constants/navigation";

export const Navbar: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  // Passive scroll listener for subtle navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Passive IntersectionObserver to reflect current section without hijacking scrolling
  useEffect(() => {
    const observedIds = ["hero", ...NAV_ITEMS.map((item) => item.sectionId)];
    const elements = observedIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
      e.preventDefault();
      const targetId = target.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    },
    []
  );

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 select-none font-sans ${
        isScrolled
          ? "bg-[#FAFBFC]/95 backdrop-blur-md border-b border-[#101536]/10 shadow-[0_4px_20px_-4px_rgba(16,21,54,0.06)] py-2 sm:py-2.5"
          : "bg-[#FAFBFC] border-b border-[#101536]/06 py-3 sm:py-3.5"
      }`}
    >
      {/* Top Subtle Notebook Accent Ribbon */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1]/30 via-[#F97316]/30 via-[#119E9D]/30 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* BRAND LOGO */}
        <a
          href="#hero"
          onClick={(e) => handleAnchorClick(e, "#hero")}
          className="focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 rounded-xl transition-all duration-200 hover:opacity-95 text-left py-1 shrink-0 cursor-pointer"
          aria-label="Nexovate Home"
        >
          <NexovateLogo size={36} showTagline={true} />
        </a>

        {/* DESKTOP EDITORIAL NAVIGATION (Exact single-source order) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full bg-[#101536]/[0.03] border border-[#101536]/[0.06]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href={item.target}
                onClick={(e) => handleAnchorClick(e, item.target)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 cursor-pointer ${
                  isActive
                    ? "text-[#101536] font-bold"
                    : "text-[#5E6675] hover:text-[#101536] hover:bg-black/[0.03]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white shadow-xs border border-[#101536]/10 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                  {item.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] inline-block" />
                  )}
                </span>
              </a>
            );
          })}
        </nav>

        {/* DESKTOP GET STARTED ACTION */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={() => openEnquiryModal()}
            className="group relative min-h-[42px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#101536] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#6366F1] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6366F1] cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* CUSTOM ANIMATED MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative w-11 h-11 rounded-2xl bg-white border border-[#101536]/10 shadow-xs flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-all cursor-pointer"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span
            className={`w-5 h-[2px] bg-[#101536] rounded-full transition-all duration-300 origin-center ${
              mobileMenuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-[#101536] rounded-full transition-all duration-200 ${
              mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-5 h-[2px] bg-[#101536] rounded-full transition-all duration-300 origin-center ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* EDITORIAL MOBILE MENU DRAWER (Exact single-source order) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#FAFBFC] border-b border-[#101536]/12 shadow-2xl"
          >
            <div className="max-w-md mx-auto px-6 pt-4 pb-8 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-[#101536]/08">
                <span className="text-[11px] font-bold text-[#6366F1] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  NAVIGATION
                </span>
                <span className="text-[10px] text-[#5E6675] font-semibold">NEXOVATE EDTECH</span>
              </div>

              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <motion.a
                    key={item.label}
                    href={item.target}
                    onClick={(e) => handleAnchorClick(e, item.target)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    className={`min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-[#6366F1]/10 text-[#6366F1]"
                        : "text-[#101536] hover:bg-[#101536]/05"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                    ) : (
                      <span className="text-[#101536]/25 text-xs">→</span>
                    )}
                  </motion.a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#101536]/08">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEnquiryModal();
                  }}
                  className="w-full min-h-[48px] px-5 py-3.5 rounded-2xl bg-[#101536] hover:bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-[#EFAF32]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
