"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, GraduationCap, Users2, ArrowRight, Check } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export const Institutions: React.FC = () => {
  const { enquireInstitution } = usePresentation();
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const tracks = [
    {
      title: "Undergraduate Curriculum Labs",
      category: "COLLEGES & INSTITUTES",
      icon: GraduationCap,
      specs: "Integrated 14-week applied emerging tech tracks with hands-on lab work.",
      outcomes: ["Hands-on Project Lab", "Practitioner Mentorship", "Capstone Verification"],
    },
    {
      title: "Centers of Excellence",
      category: "UNIVERSITIES",
      icon: Building2,
      specs: "Campus-wide emerging innovation labs, advanced AI sandboxes, and faculty upskilling.",
      outcomes: ["Campus AI Sandbox", "Faculty Enablement", "Global Certification"],
    },
    {
      title: "Hiring & Talent Pipelines",
      category: "INDUSTRY ECOSYSTEM",
      icon: Users2,
      specs: "Direct high-order hiring pipelines with industry production simulation and capstone evaluation.",
      outcomes: ["Sponsored Capstones", "Direct Candidate Review", "Portfolio Evaluation"],
    },
  ];

  return (
    <div className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-notebook-grid text-[#101536] select-none border-b border-[#101536]/06 overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-4 border-b border-[#101536]/10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#6366F1] uppercase block mb-1">
              FOR INSTITUTIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] leading-tight font-jakarta">
              PARTNERING WITH INSTITUTIONS<span className="text-[#F97316]">.</span>
            </h2>
          </div>
          <button
            onClick={() => enquireInstitution()}
            className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* 3 High Contrast White Paper Cards */}
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
                className="p-6 sm:p-8 bg-white border border-[#101536]/12 rounded-3xl shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#F97316] uppercase">
                      {track.category}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#101536] mb-3 font-jakarta">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-6 font-medium">
                    {track.specs}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#101536]/10 space-y-2 font-mono text-xs text-[#101536]">
                  {track.outcomes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0 font-bold" />
                      <span className="font-semibold">{item}</span>
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
