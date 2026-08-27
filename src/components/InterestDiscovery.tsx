"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Laptop,
  Palette,
  TrendingUp,
  BrainCircuit,
  Atom,
  Megaphone,
  Music,
  Briefcase,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export interface InterestCategory {
  id: string;
  name: string;
  programIndex: number;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: "tech",
    name: "Technology",
    programIndex: 0,
    icon: <Laptop className="w-5 h-5 text-[#6366F1]" />,
    bgColor: "bg-[#EEF2FF]",
    borderColor: "border-[#6366F1]/30",
    badgeBg: "bg-white",
  },
  {
    id: "design",
    name: "Design",
    programIndex: 1,
    icon: <Palette className="w-5 h-5 text-[#EC4899]" />,
    bgColor: "bg-[#FCE7F3]",
    borderColor: "border-[#EC4899]/30",
    badgeBg: "bg-white",
  },
  {
    id: "business",
    name: "Business",
    programIndex: 2,
    icon: <TrendingUp className="w-5 h-5 text-[#F97316]" />,
    bgColor: "bg-[#FFEDD5]",
    borderColor: "border-[#F97316]/30",
    badgeBg: "bg-white",
  },
  {
    id: "ai",
    name: "Data & AI",
    programIndex: 3,
    icon: <BrainCircuit className="w-5 h-5 text-[#119E9D]" />,
    bgColor: "bg-[#CCFBF1]",
    borderColor: "border-[#119E9D]/30",
    badgeBg: "bg-white",
  },
  {
    id: "science",
    name: "Science",
    programIndex: 4,
    icon: <Atom className="w-5 h-5 text-[#F59E0B]" />,
    bgColor: "bg-[#FEF3C7]",
    borderColor: "border-[#F59E0B]/30",
    badgeBg: "bg-white",
  },
  {
    id: "career",
    name: "Career Skills",
    programIndex: 5,
    icon: <Briefcase className="w-5 h-5 text-[#8B5CF6]" />,
    bgColor: "bg-[#EDE9FE]",
    borderColor: "border-[#8B5CF6]/30",
    badgeBg: "bg-white",
  },
  {
    id: "communication",
    name: "Communication",
    programIndex: 2,
    icon: <Megaphone className="w-5 h-5 text-[#EC4899]" />,
    bgColor: "bg-[#FCE7F3]",
    borderColor: "border-[#EC4899]/30",
    badgeBg: "bg-white",
  },
  {
    id: "arts",
    name: "Creative Arts",
    programIndex: 1,
    icon: <Music className="w-5 h-5 text-[#6366F1]" />,
    bgColor: "bg-[#EEF2FF]",
    borderColor: "border-[#6366F1]/30",
    badgeBg: "bg-white",
  },
];

export const InterestDiscovery: React.FC = () => {
  const { setActiveProgramIndex } = usePresentation();

  const handleSelectInterest = (progIdx: number) => {
    setActiveProgramIndex(progIdx);
    const element = document.getElementById("programs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="explore"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] border-b border-[#101536]/06 select-none overflow-x-clip font-sans"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        {/* Title with Hand-drawn Underline */}
        <div className="inline-block relative mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
            EXPLORATION DOMAINS
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] font-jakarta">
            EXPLORE WHAT <span className="text-[#6366F1] relative inline-block">
              INTERESTS YOU
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M 0 12 Q 50 20 100 10" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[#F97316]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6675] font-medium max-w-md mx-auto mt-3">
            Choose a field of interest to see tailored foundational tracks, hands-on lab projects, and mentor support.
          </p>
        </div>

        {/* Compact 8-Category Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {INTEREST_CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              onClick={() => handleSelectInterest(cat.programIndex)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl ${cat.bgColor} border ${cat.borderColor} shadow-xs hover:shadow-md transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#6366F1] cursor-pointer group`}
            >
              <div className={`w-12 h-12 rounded-xl ${cat.badgeBg} flex items-center justify-center shadow-xs mb-3 border border-[#101536]/08 group-hover:scale-105 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-sm font-bold text-[#101536] font-jakarta">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Dotted Connection Arrow */}
        <div className="hidden md:flex justify-start pl-12 -mb-8 mt-10 pointer-events-none">
          <svg className="w-32 h-16" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M110 10 C 70 5, 30 25, 20 50 M 30 42 L 20 50 L 14 38" stroke="#F97316" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
