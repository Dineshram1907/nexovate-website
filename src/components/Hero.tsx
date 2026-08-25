"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ArrowDown } from "lucide-react";
import { HeroIllustration } from "./HeroIllustration";
import { usePresentation } from "@/context/PresentationContext";

export const Hero: React.FC = () => {
  const { goToSection, setActiveProgramIndex, nextSection } = usePresentation();

  const handleExplorePrograms = () => {
    setActiveProgramIndex(0);
    goToSection(2); // Slide 03 Programs
  };

  const handleSeeHowItWorks = () => {
    goToSection(3); // Slide 04 Experience
  };

  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#FAFBFC] select-none">
      <div className="max-w-7xl mx-auto w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT 55% — Headline, Eyebrow, Supporting Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: cubicEase }}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#F2F5F6] border border-[#101536]/08 mb-4 sm:mb-6"
            >
              <span className="w-3.5 h-0.5 rounded-full bg-[#119E9D]" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                FUTURE-READY LEARNING
              </span>
            </motion.div>

            {/* Main Headline Sequence */}
            <h1 className="text-3xl sm:text-5xl lg:text-[70px] xl:text-[76px] font-extrabold tracking-tight text-[#101536] leading-[1.05] mb-4 sm:mb-6">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: cubicEase }}
                className="block text-[#101536]"
              >
                YOUR NEXT SKILL
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: cubicEase }}
                className="block text-[#101536]"
              >
                CAN CHANGE
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: cubicEase }}
                className="block text-[#119E9D] relative"
              >
                EVERYTHING
                <span className="text-[#EFAF32] ml-0.5">.</span>
              </motion.span>
            </h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: cubicEase }}
              className="text-sm sm:text-base lg:text-lg text-[#5E6675] max-w-xl font-normal leading-relaxed mb-6 sm:mb-8"
            >
              Nexovate helps students learn future-ready skills, build real projects and move toward what's next.
            </motion.p>

            {/* Responsive Touch-Friendly CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: cubicEase }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                onClick={handleExplorePrograms}
                className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#101536] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#119E9D] hover:-translate-y-0.5 transition-all duration-200 shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                className="min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-[#101536]/15 text-[#101536] font-bold text-xs uppercase tracking-widest hover:bg-[#F2F5F6] hover:border-[#119E9D] transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
              >
                <div className="w-5 h-5 rounded-full bg-[#119E9D]/10 flex items-center justify-center text-[#119E9D] group-hover:bg-[#119E9D] group-hover:text-white transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>SEE HOW IT WORKS</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT 45% — Cinematic Portal Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Hook */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="max-w-7xl mx-auto w-full flex items-center justify-start z-10 pt-4"
      >
        <button
          onClick={nextSection}
          className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.2em] text-[#5E6675] hover:text-[#119E9D] uppercase transition-colors group focus:outline-none focus:ring-1 focus:ring-[#119E9D] rounded-full p-1"
        >
          <div className="w-4 h-6 rounded-full border border-[#101536]/20 flex items-start justify-center p-1 group-hover:border-[#119E9D] transition-colors">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-[#119E9D] rounded-full"
            />
          </div>
          <span>DISCOVER WHAT'S NEXT</span>
          <ArrowDown className="w-3 h-3 text-[#119E9D] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
