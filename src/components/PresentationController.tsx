"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

export interface SlideItem {
  id: string;
  label: string;
  number: string;
}

export const SLIDES: SlideItem[] = [
  { id: "hero", label: "Hero", number: "01" },
  { id: "the-idea", label: "The Idea", number: "02" },
  { id: "programs", label: "Programs", number: "03" },
  { id: "experience", label: "Experience", number: "04" },
  { id: "reviews", label: "Student Reviews", number: "05" },
  { id: "institutions", label: "For Institutions", number: "06" },
  { id: "about", label: "About", number: "07" },
  { id: "contact", label: "Contact", number: "08" },
  { id: "final-cta", label: "Get Started", number: "09" },
];

export const PresentationController: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const index = SLIDES.findIndex((s) => s.id === entry.target.id);
          if (index !== -1) {
            setActiveSlideIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.5],
    });

    SLIDES.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs or textareas
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(SLIDES.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideIndex]);

  const goToSlide = (index: number) => {
    const targetSlide = SLIDES[index];
    if (targetSlide) {
      const el = document.getElementById(targetSlide.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const goToNextSlide = () => {
    if (activeSlideIndex < SLIDES.length - 1) {
      goToSlide(activeSlideIndex + 1);
    } else {
      goToSlide(0); // Loop back to top on final slide
    }
  };

  const goToPrevSlide = () => {
    if (activeSlideIndex > 0) {
      goToSlide(activeSlideIndex - 1);
    }
  };

  const currentSlide = SLIDES[activeSlideIndex] || SLIDES[0];
  const isLastSlide = activeSlideIndex === SLIDES.length - 1;

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP SIDE PROGRESS INDICATOR (Minimal Vertical Dots)        */}
      {/* ------------------------------------------------------------- */}
      <aside
        aria-label="Presentation slide progress"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 select-none"
      >
        {SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlideIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Jump to slide ${slide.number}: ${slide.label}`}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none focus:ring-2 focus:ring-[#119E9D] rounded-full"
            >
              {/* Tooltip Label on Hover */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-[#101536] text-white text-[10px] font-mono font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                {slide.number} • {slide.label}
              </span>

              {/* Dot Graphic */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-7 bg-[#119E9D] shadow-sm shadow-[#119E9D]/40"
                    : "w-2 h-2 bg-[#101536]/20 hover:bg-[#101536]/50 group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* FUTURISTIC FLOATING BOTTOM SCROLL CONTROL                      */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-6 right-6 sm:right-10 z-40 select-none">
        <button
          onClick={goToNextSlide}
          aria-label={isLastSlide ? "Return to top slide" : "Advance to next slide"}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#101536]/10 text-[#101536] shadow-md hover:border-[#119E9D]/40 hover:bg-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
        >
          {/* Active / Total Slide Number */}
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider">
            <span className="text-[#119E9D]">{currentSlide.number}</span>
            <span className="text-[#5E6675]/40">/</span>
            <span className="text-[#5E6675]">09</span>
          </div>

          {/* Vertical Separator */}
          <div className="w-px h-3.5 bg-[#101536]/10" />

          {/* Animated Arrow Icon */}
          <div className="w-6 h-6 rounded-full bg-[#FAFBFC] border border-[#101536]/08 flex items-center justify-center text-[#119E9D] group-hover:bg-[#119E9D] group-hover:text-white transition-colors">
            <AnimatePresence mode="wait">
              {isLastSlide ? (
                <motion.div
                  key="up"
                  initial={{ y: 2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -2, opacity: 0 }}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="down"
                  initial={{ y: -2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 2, opacity: 0 }}
                  className="group-hover:translate-y-0.5 transition-transform"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </>
  );
};
