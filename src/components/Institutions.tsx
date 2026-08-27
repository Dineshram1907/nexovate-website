"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, GraduationCap, Users2, ArrowRight, Check, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export const Institutions: React.FC = () => {
  const { enquireInstitution } = usePresentation();
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const tracks = [
    {
      title: "Undergraduate Curriculum Labs",
      category: "COLLEGES & INSTITUTES",
      icon: GraduationCap,
      specs: "Integrated 14-week applied emerging tech tracks embedded into college lab semesters.",
      outcomes: ["Hands-on Project Lab", "Practitioner Mentorship", "Capstone Verification"],
    },
    {
      title: "Centers of Excellence",
      category: "UNIVERSITIES",
      icon: Building2,
      specs: "Campus-wide emerging innovation hubs, advanced AI sandboxes, and faculty enablement.",
      outcomes: ["Campus AI Sandbox", "Faculty Enablement", "Industry Certification"],
    },
    {
      title: "Hiring & Talent Pipelines",
      category: "INDUSTRY ECOSYSTEM",
      icon: Users2,
      specs: "Direct production simulation pipelines connecting skilled student builders with tech employers.",
      outcomes: ["Sponsored Capstones", "Candidate Portfolios", "Direct Hiring Access"],
    },
  ];

  return (
    <div
      id="institutions"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] text-[#101536] select-none border-b border-[#101536]/06 overflow-x-clip font-sans scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-4 border-b border-[#101536]/10 gap-4">
          <div className="text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
              ACADEMIC & INDUSTRY PARTNERSHIPS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] leading-tight font-jakarta">
              PARTNERING WITH INSTITUTIONS<span className="text-[#F97316]">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6675] font-medium mt-2 max-w-xl">
              We collaborate with colleges, universities, and enterprise ecosystems to bring hands-on industry standards directly to classrooms.
            </p>
          </div>
          <button
            onClick={() => enquireInstitution()}
            className="min-h-[46px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#6366F1] cursor-pointer shrink-0"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* 3 High Contrast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 text-left">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: cubicEase }}
                className="p-6 sm:p-8 bg-white border border-[#101536]/10 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-wider text-[#F97316] uppercase">
                      {track.category}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#101536] mb-2 font-jakarta">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-6 font-medium">
                    {track.specs}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#101536]/10 space-y-2 text-xs text-[#101536]">
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
