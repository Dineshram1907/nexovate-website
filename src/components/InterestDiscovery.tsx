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
  Lightbulb,
  Rocket,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export interface InterestCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: "tech",
    name: "Technology",
    icon: <Laptop className="w-5 h-5 text-[#101536]" />,
    bgColor: "bg-[#E0F2FE]",
    borderColor: "border-[#38BDF8]/40",
    badgeBg: "bg-white",
  },
  {
    id: "design",
    name: "Design",
    icon: <Palette className="w-5 h-5 text-[#F97316]" />,
    bgColor: "bg-[#FFEDD5]",
    borderColor: "border-[#F97316]/40",
    badgeBg: "bg-white",
  },
  {
    id: "business",
    name: "Business",
    icon: <TrendingUp className="w-5 h-5 text-[#F59E0B]" />,
    bgColor: "bg-[#FEF3C7]",
    borderColor: "border-[#F59E0B]/40",
    badgeBg: "bg-white",
  },
  {
    id: "ai",
    name: "Data & AI",
    icon: <BrainCircuit className="w-5 h-5 text-[#6366F1]" />,
    bgColor: "bg-[#E0E7FF]",
    borderColor: "border-[#6366F1]/40",
    badgeBg: "bg-white",
  },
  {
    id: "science",
    name: "Science",
    icon: <Atom className="w-5 h-5 text-[#119E9D]" />,
    bgColor: "bg-[#CCFBF1]",
    borderColor: "border-[#119E9D]/40",
    badgeBg: "bg-white",
  },
  {
    id: "communication",
    name: "Communication",
    icon: <Megaphone className="w-5 h-5 text-[#EC4899]" />,
    bgColor: "bg-[#FCE7F3]",
    borderColor: "border-[#EC4899]/40",
    badgeBg: "bg-white",
  },
  {
    id: "arts",
    name: "Creative Arts",
    icon: <Music className="w-5 h-5 text-[#8B5CF6]" />,
    bgColor: "bg-[#EDE9FE]",
    borderColor: "border-[#8B5CF6]/40",
    badgeBg: "bg-white",
  },
  {
    id: "career",
    name: "Career Skills",
    icon: <Briefcase className="w-5 h-5 text-[#10B981]" />,
    bgColor: "bg-[#D1FAE5]",
    borderColor: "border-[#10B981]/40",
    badgeBg: "bg-white",
  },
  {
    id: "leadership",
    name: "Leadership",
    icon: <Lightbulb className="w-5 h-5 text-[#F59E0B]" />,
    bgColor: "bg-[#FEF3C7]",
    borderColor: "border-[#F59E0B]/40",
    badgeBg: "bg-white",
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    icon: <Rocket className="w-5 h-5 text-[#F97316]" />,
    bgColor: "bg-[#FFEDD5]",
    borderColor: "border-[#F97316]/40",
    badgeBg: "bg-white",
  },
];

export const InterestDiscovery: React.FC = () => {
  const { goToSection } = usePresentation();

  return (
    <div className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] border-b border-[#101536]/06 select-none overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        {/* Title with Hand-drawn Underline */}
        <div className="inline-block relative mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#101536] font-jakarta">
            EXPLORE WHAT <span className="text-[#6366F1] relative inline-block">
              INTERESTS YOU
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M 0 12 Q 50 20 100 10" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* 10 Category Grid Cards (matching input_file_0.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {INTEREST_CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              onClick={() => goToSection(2)}
              whileHover={{ y: -4, rotate: (idx % 2 === 0 ? 1 : -1) }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl ${cat.bgColor} border ${cat.borderColor} shadow-xs hover:shadow-md transition-all text-center focus:outline-none focus:ring-2 focus:ring-[#6366F1]`}
            >
              <div className={`w-12 h-12 rounded-full ${cat.badgeBg} flex items-center justify-center shadow-xs mb-3 border border-[#101536]/08`}>
                {cat.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#101536] font-jakarta">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Hand-Drawn Dotted Curved Arrow (Interests -> Journey) */}
        <div className="hidden md:flex justify-start pl-12 -mb-8 mt-6 pointer-events-none">
          <svg className="w-32 h-16" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M110 10 C 70 5, 30 25, 20 50 M 30 42 L 20 50 L 14 38" stroke="#F97316" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
