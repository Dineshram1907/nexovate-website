import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Lightbulb, ArrowDown } from "lucide-react";
import { HeroIllustration } from "./HeroIllustration";
import { usePresentation } from "@/context/PresentationContext";

export const Hero: React.FC = () => {
  const { goToSection } = usePresentation();

  const handleExplorePrograms = () => {
    const el = document.getElementById("programs");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeHowItWorks = () => {
    const el = document.getElementById("experience");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div id="hero" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-notebook-grid select-none overflow-x-clip border-b border-[#101536]/06 scroll-mt-20">
      {/* Background Soft Pastel Gradient Blurs */}
      <div className="absolute top-10 left-8 w-80 h-80 bg-[#E0E7FF]/60 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-8 w-96 h-96 bg-[#FEF3C7]/60 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* LEFT 55% — Eyebrow Pill, 4-Color Headline, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Handwritten Label Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: cubicEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 mb-4 shadow-xs"
            >
              <span className="text-xs font-bold text-[#101536] tracking-tight">
                YOUR NEXT IDEA STARTS HERE.
              </span>
              <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
            </motion.div>

            {/* 4-Word Headline in Multi-Colors (as in input_file_0.png) */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] xl:text-[78px] font-black tracking-tight leading-[1.02] mb-4 font-jakarta">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: cubicEase }}
                className="block text-[#101536]"
              >
                DISCOVER.
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: cubicEase }}
                className="block text-[#6366F1]"
              >
                LEARN.
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: cubicEase }}
                className="block text-[#F97316]"
              >
                CREATE.
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: cubicEase }}
                className="block text-[#119E9D]"
              >
                GROW.
              </motion.span>
            </h1>

            {/* Student-Focused Copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: cubicEase }}
              className="text-sm sm:text-base lg:text-lg text-[#5E6675] max-w-lg font-medium leading-relaxed mb-6 sm:mb-8"
            >
              Nexovate helps students explore what they love, build real skills, and create a future they're excited about.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: cubicEase }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                onClick={handleExplorePrograms}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all duration-200 shadow-md group focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={handleSeeHowItWorks}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#101536]/15 text-[#101536] font-bold text-xs uppercase tracking-wider hover:bg-[#F6F8F9] hover:border-[#6366F1] transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              >
                <div className="w-5 h-5 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>See How It Works</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT 45% — Real Photography Photo Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <HeroIllustration />
          </div>
        </div>

        {/* Hand-Drawn Dotted Curved Arrow Transition (Hero -> Interests) */}
        <div className="hidden md:flex justify-end pr-12 -mb-8 mt-4 pointer-events-none">
          <svg className="w-32 h-16" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 C 50 5, 90 25, 100 50 M 90 42 L 100 50 L 106 38" stroke="#6366F1" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
