"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";
import { Hero } from "./Hero";
import { BrandStory } from "./BrandStory";
import { Programs } from "./Programs";
import { StudentJourney } from "./StudentJourney";
import { Projects } from "./Projects";
import { StudentReviews } from "./StudentReviews";
import { Institutions } from "./Institutions";
import { About } from "./About";
import { Contact } from "./Contact";
import { FinalCTA } from "./FinalCTA";

export const PresentationViewport: React.FC = () => {
  const { activeSectionIndex, sections, isDesktop } = usePresentation();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const currentSection = sections[activeSectionIndex] || sections[0];

  // =========================================================================
  // MOBILE / TABLET MODE (< 1024px): NATURAL NATIVE CONTINUOUS SCROLLING
  // =========================================================================
  if (!isDesktop) {
    return (
      <div className="relative w-full min-h-screen bg-[#FAFBFC] overflow-x-hidden">
        {/* SLIDE 01 // HERO */}
        <section id="hero" className="w-full min-h-[100svh] flex flex-col justify-center">
          <Hero />
        </section>

        {/* SLIDE 02 // WHY NEXOVATE */}
        <section id="why-nexovate" className="w-full min-h-[100svh] flex flex-col justify-center">
          <BrandStory />
        </section>

        {/* SLIDE 03 // PROGRAMS */}
        <section id="programs" className="w-full min-h-[100svh] flex flex-col justify-center">
          <Programs />
        </section>

        {/* SLIDE 04 // EXPERIENCE */}
        <section id="experience" className="w-full min-h-[100svh] flex flex-col justify-center">
          <StudentJourney />
        </section>

        {/* SLIDE 05 // PROJECTS */}
        <section id="projects" className="w-full min-h-[100svh] flex flex-col justify-center">
          <Projects />
        </section>

        {/* SLIDE 06 // STUDENT REVIEWS */}
        <section id="reviews" className="w-full min-h-[100svh] flex flex-col justify-center">
          <StudentReviews />
        </section>

        {/* SLIDE 07 // INSTITUTIONS */}
        <section id="institutions" className="w-full min-h-[100svh] flex flex-col justify-center">
          <Institutions />
        </section>

        {/* SLIDE 08 // ABOUT */}
        <section id="about" className="w-full min-h-[100svh] flex flex-col justify-center">
          <About />
        </section>

        {/* SLIDE 09 // CONTACT */}
        <section id="contact" className="w-full min-h-[100svh] flex flex-col justify-center">
          <Contact />
        </section>

        {/* SLIDE 10 // FINAL CTA & FOOTER */}
        <section id="final-cta" className="w-full min-h-[100svh] flex flex-col justify-between">
          <FinalCTA />
        </section>
      </div>
    );
  }

  // =========================================================================
  // DESKTOP MODE (>= 1024px): 100svh PRESENTATION-STYLE SLIDING STACK
  // =========================================================================
  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#FAFBFC] select-none">
      <motion.div
        animate={{ y: `-${activeSectionIndex * 100}%` }}
        transition={{
          duration: reducedMotion ? 0 : 0.75,
          ease: cubicEase,
        }}
        className="w-full h-full"
      >
        {/* SLIDE 01 // HERO */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <Hero />
        </div>

        {/* SLIDE 02 // WHY NEXOVATE */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <BrandStory />
        </div>

        {/* SLIDE 03 // PROGRAMS */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <Programs />
        </div>

        {/* SLIDE 04 // EXPERIENCE */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <StudentJourney />
        </div>

        {/* SLIDE 05 // PROJECTS */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <Projects />
        </div>

        {/* SLIDE 06 // STUDENT REVIEWS */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <StudentReviews />
        </div>

        {/* SLIDE 07 // INSTITUTIONS */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <Institutions />
        </div>

        {/* SLIDE 08 // ABOUT */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <About />
        </div>

        {/* SLIDE 09 // CONTACT */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <Contact />
        </div>

        {/* SLIDE 10 // FINAL CTA & FOOTER */}
        <div className="w-full h-[100svh] flex-shrink-0 flex items-center justify-center overflow-hidden">
          <FinalCTA />
        </div>
      </motion.div>

      {/* QUIET BOTTOM-CENTER CHAPTER INDICATOR (Desktop Only) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#101536]/10 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#119E9D] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#101536]">
            {currentSection.number}
            <span className="text-[#5E6675]/50 mx-1">/</span>
            10
          </span>
          <span className="text-[10px] font-mono text-[#5E6675]/80 hidden sm:inline">
            • {currentSection.shortTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
