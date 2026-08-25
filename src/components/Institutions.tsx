"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Building2, Briefcase, Check } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export const Institutions: React.FC = () => {
  const { enquireInstitution } = usePresentation();

  const tracks = [
    {
      icon: GraduationCap,
      category: "COLLEGES & INSTITUTES",
      title: "Undergraduate Curriculum Labs",
      specs: "Integrated semester-long emerging tech modules with hands-on lab work.",
      outcomes: ["Hands-on Project Lab", "Practitioner Mentorship", "Capstone Verification"],
    },
    {
      icon: Building2,
      category: "UNIVERSITIES",
      title: "Centers of Excellence",
      specs: "Campus-wide technology innovation hubs, advanced AI bootcamps, and faculty upskilling.",
      outcomes: ["Campus AI Sandbox", "Faculty Enablement", "Global Certification"],
    },
    {
      icon: Briefcase,
      category: "INDUSTRY ECOSYSTEM",
      title: "Hiring & Talent Pipelines",
      specs: "Directly align engineering curriculum with modern production standards and hiring stacks.",
      outcomes: ["Sponsored Capstones", "Direct Candidate Review", "Portfolio Evaluation"],
    },
  ];

  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-16 sm:py-20 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#101536] text-white select-none border-b border-white/08">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Architectural Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 pb-4 border-b border-white/15 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#EFAF32]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#EFAF32] uppercase">
                SLIDE 07 // INSTITUTIONAL PARTNERSHIPS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              BRING THE FUTURE TO YOUR CAMPUS<span className="text-[#EFAF32]">.</span>
            </h2>
          </div>

          <button
            onClick={enquireInstitution}
            className="self-start lg:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-none border border-[#EFAF32] bg-[#EFAF32] text-[#101536] font-bold text-xs font-mono uppercase tracking-widest hover:bg-transparent hover:text-[#EFAF32] transition-colors"
          >
            <span>PARTNER WITH US</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Structured Architectural Columns (Sharp Corners, Serious Discipline) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: cubicEase }}
                className="p-5 sm:p-6 bg-white/04 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#EFAF32] uppercase">
                      {track.category}
                    </span>
                    <Icon className="w-4 h-4 text-white/50" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {track.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed mb-4 font-light">
                    {track.specs}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1.5 font-mono text-[11px] text-white/80">
                  {track.outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-[#119E9D]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
