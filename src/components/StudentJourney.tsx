import React from "react";
import { motion } from "framer-motion";
import { Compass, Search, BookOpen, Puzzle, Send } from "lucide-react";

export const StudentJourney: React.FC = () => {
  const steps = [
    {
      num: "1",
      title: "DISCOVER",
      desc: "Explore your interests",
      color: "bg-[#6366F1] text-white",
      icon: <Compass className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      num: "2",
      title: "EXPLORE",
      desc: "Find the right path for you",
      color: "bg-[#F97316] text-white",
      icon: <Search className="w-5 h-5 text-[#F97316]" />,
    },
    {
      num: "3",
      title: "LEARN",
      desc: "Build skills with experts",
      color: "bg-[#119E9D] text-white",
      icon: <BookOpen className="w-5 h-5 text-[#119E9D]" />,
    },
    {
      num: "4",
      title: "BUILD",
      desc: "Work on real projects",
      color: "bg-[#F59E0B] text-white",
      icon: <Puzzle className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: "5",
      title: "GROW",
      desc: "Get ready for what's next",
      color: "bg-[#8B5CF6] text-white",
      icon: <Send className="w-5 h-5 text-[#8B5CF6]" />,
    },
  ];

  return (
    <div className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-notebook-grid border-b border-[#101536]/06 select-none overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        {/* Title */}
        <div className="inline-block relative mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#101536] font-jakarta">
            THE NEXOVATE <span className="relative inline-block text-[#6366F1]">
              JOURNEY
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M 0 10 Q 50 18 100 8" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
                <path d="M 0 16 Q 50 24 100 14" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* 5 Journey Steps Connected horizontally on Desktop & vertically on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex flex-col items-center relative text-center group">
              {/* Icon Circle */}
              <div className="w-12 h-12 rounded-full bg-white border border-[#101536]/10 shadow-xs flex items-center justify-center mb-3">
                {step.icon}
              </div>

              {/* Number Badge & Title */}
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center ${step.color}`}>
                  {step.num}
                </span>
                <span className="font-extrabold text-sm text-[#101536] font-jakarta">
                  {step.title}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5E6675] font-medium max-w-[140px]">
                {step.desc}
              </p>

              {/* Desktop Dotted Connection Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-6 w-12 h-6 pointer-events-none z-10">
                  <svg className="w-full h-full" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10 C 20 2, 35 18, 45 10 M 38 6 L 46 10 L 40 16" stroke="#5E6675" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hand-Drawn Dotted Curved Arrow Transition (Journey -> Programs) */}
        <div className="hidden md:flex justify-end pr-12 -mb-8 mt-8 pointer-events-none">
          <svg className="w-32 h-16" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 C 50 5, 90 25, 100 50 M 90 42 L 100 50 L 106 38" stroke="#119E9D" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
