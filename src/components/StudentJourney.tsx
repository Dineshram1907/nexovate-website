"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Search, BookOpen, Puzzle, Rocket } from "lucide-react";

export const StudentJourney: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Explore what excites you across diverse tech & creative domains.",
      badgeColor: "bg-[#6366F1] text-white",
      icon: <Compass className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      num: "02",
      title: "EXPLORE",
      desc: "Connect your curiosity with structured curriculum roadmaps.",
      badgeColor: "bg-[#F97316] text-white",
      icon: <Search className="w-5 h-5 text-[#F97316]" />,
    },
    {
      num: "03",
      title: "LEARN",
      desc: "Master high-impact skills with experienced industry mentors.",
      badgeColor: "bg-[#119E9D] text-white",
      icon: <BookOpen className="w-5 h-5 text-[#119E9D]" />,
    },
    {
      num: "04",
      title: "BUILD",
      desc: "Ship real applications, working software, and live portfolios.",
      badgeColor: "bg-[#F59E0B] text-white",
      icon: <Puzzle className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      num: "05",
      title: "GROW",
      desc: "Graduate ready for internships, capstones, and modern tech careers.",
      badgeColor: "bg-[#8B5CF6] text-white",
      icon: <Rocket className="w-5 h-5 text-[#8B5CF6]" />,
    },
  ];

  return (
    <div
      id="experience"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-notebook-grid border-b border-[#101536]/06 select-none overflow-x-clip font-sans text-[#101536] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-block relative mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
            LEARNING METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] font-jakarta">
            HOW NEXOVATE <span className="relative inline-block text-[#6366F1]">
              WORKS
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M 0 10 Q 50 18 100 8" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
                <path d="M 0 16 Q 50 24 100 14" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[#F97316]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6675] font-medium max-w-lg mx-auto mt-3">
            A proven framework that transforms curiosity into independent building capability.
          </p>
        </div>

        {/* 5 Journey Steps Connected Horizontally */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex flex-col items-center relative text-center group">
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#101536]/10 shadow-xs flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {step.icon}
              </div>

              {/* Number Badge & Title */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-6 h-6 rounded-full font-bold text-[11px] flex items-center justify-center ${step.badgeColor}`}>
                  {step.num}
                </span>
                <span className="font-extrabold text-sm text-[#101536] font-jakarta">
                  {step.title}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5E6675] font-medium max-w-[170px] leading-relaxed">
                {step.desc}
              </p>

              {/* Desktop Dotted Connection Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 -right-6 w-12 h-6 pointer-events-none z-10">
                  <svg className="w-full h-full" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10 C 20 2, 35 18, 45 10 M 38 6 L 46 10 L 40 16" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dotted Downward Path */}
        <div className="hidden md:flex justify-end pr-12 -mb-8 mt-10 pointer-events-none">
          <svg className="w-32 h-16" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 C 50 5, 90 25, 100 50 M 90 42 L 100 50 L 106 38" stroke="#119E9D" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};
