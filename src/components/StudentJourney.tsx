"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, BookOpen, Wrench, Sparkles, TrendingUp } from "lucide-react";

interface Milestone {
  number: string;
  name: string;
  category: string;
  headline: string;
  action: string;
  detail: string;
}

export const StudentJourney: React.FC = () => {
  const milestones: Milestone[] = [
    {
      number: "01",
      name: "DISCOVER",
      category: "ASSESSMENT & MAPPING",
      headline: "Deconstruct your technology direction",
      action: "Skill Gap Analysis • Track Exploration • Mentor Diagnostic",
      detail: "Identify high-leverage domains (AI, Web, Data, Cloud) that match your natural aptitude and career intent.",
    },
    {
      number: "02",
      name: "LEARN",
      category: "CONCEPTUAL RIGOR",
      headline: "Master core engineering theory",
      action: "First-Principles Theory • Live Socratic Workshops • Deep Dives",
      detail: "Build rigorous foundational models with guidance from experienced engineers who practice what they teach.",
    },
    {
      number: "03",
      name: "BUILD",
      category: "HANDS-ON REPOSITORIES",
      headline: "Create production-grade repositories",
      action: "Git Workflows • Automated CI/CD • Clean Code Standards",
      detail: "Transform conceptual knowledge into real software repositories, neural architectures, and data pipelines.",
    },
    {
      number: "04",
      name: "INNOVATE",
      category: "OPEN-ENDED PROBLEM SOLVING",
      headline: "Tackle real-world industry capstones",
      action: "Architectural Design • Peer Code Review • Performance Tuning",
      detail: "Solve unscripted technical challenges, build portfolio-grade artifacts, and present your work to mentors.",
    },
    {
      number: "05",
      name: "GROW",
      category: "CAREER CONFIDENCE",
      headline: "Step into global engineering roles",
      action: "Verified Proof of Work • Portfolio Presentation • Lifelong Agency",
      detail: "Graduate with verified engineering capability, authentic repositories, and the confidence to lead tomorrow.",
    },
  ];

  const [activeStep, setActiveStep] = useState(2); // Default on BUILD
  const current = milestones[activeStep];
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#FAFBFC] text-[#101536] select-none border-b border-[#101536]/08">
      {/* Background Schematic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#101536" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-3 border-b border-[#101536]/10 gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#119E9D] uppercase block mb-1">
              SLIDE 04 // THE CAPABILITY BLUEPRINT
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#101536]">
              INTERACTIVE PROGRESSION MAP<span className="text-[#EFAF32]">.</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5E6675]">
            5 MILESTONES // CLICK ANY PHASE
          </span>
        </div>

        {/* PROGRESSIVE HORIZONTAL LINE WITH 5 MILESTONES */}
        <div className="relative my-6 sm:my-10">
          {/* Base Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#101536]/10 -translate-y-1/2" />

          {/* Active Animated Fill Line */}
          <motion.div
            animate={{ width: `${(activeStep / (milestones.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: cubicEase }}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#119E9D] via-[#119E9D] to-[#EFAF32] -translate-y-1/2"
          />

          {/* 5 Milestone Nodes */}
          <div className="relative flex justify-between items-center z-10">
            {milestones.map((m, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep >= idx;

              return (
                <button
                  key={m.number}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-[#101536] text-white ring-4 ring-[#119E9D]/30 scale-110 shadow-md"
                        : isPast
                        ? "bg-[#119E9D] text-white"
                        : "bg-white border-2 border-[#101536]/20 text-[#5E6675] hover:border-[#101536]"
                    }`}
                  >
                    {m.number}
                  </div>

                  <span
                    className={`mt-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                      isActive ? "text-[#101536]" : "text-[#5E6675] group-hover:text-[#101536]"
                    }`}
                  >
                    {m.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE MILESTONE SCHEMATIC DISPLAY (Architectural & Clean, Zero Generic Cards) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: cubicEase }}
            className="mt-6 pt-6 border-t border-[#101536]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-8">
              <span className="text-[10px] font-mono font-bold text-[#119E9D] uppercase tracking-widest block mb-1">
                PHASE {current.number} // {current.category}
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#101536] tracking-tight mb-2">
                {current.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed max-w-2xl">
                {current.detail}
              </p>
            </div>

            <div className="lg:col-span-4 p-4 bg-[#F1F2EF] border border-[#101536]/10 rounded-xl font-mono text-xs text-[#101536]">
              <span className="text-[9px] font-bold uppercase text-[#119E9D] block mb-1">
                DELIVERABLE WORKFLOW
              </span>
              <p className="text-[11px] leading-relaxed font-semibold">
                {current.action}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
