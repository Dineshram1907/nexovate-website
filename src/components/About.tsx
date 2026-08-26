"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Target, Sparkles } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { brandCreatorImage } from "@/assets";

export const About: React.FC = () => {
  const { goToSection } = usePresentation();
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] text-[#101536] select-none border-b border-[#101536]/06 overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Editorial Subheading */}
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#101536]/10">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#119E9D] uppercase">
            OUR MISSION
          </span>
          <span className="h-[1px] w-12 bg-[#119E9D]/40" />
        </div>

        {/* Human Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT 60% — Genuine Company Manifesto & Core Beliefs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-[#101536] leading-tight mb-4">
              WHY NEXOVATE <br />
              <span className="italic text-[#119E9D]">EXISTS.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#333B4E] leading-relaxed mb-4 font-light">
              We started Nexovate with a simple conviction: every student has potential. What they need is not just isolated lectures, but a place to explore their interests, experiment, learn practical skills, and build their future across technology, design, and innovation.
            </p>

            {/* Founder Quote Card */}
            <div className="p-4 sm:p-5 bg-white border-l-4 border-[#119E9D] shadow-xs mb-6 w-full">
              <p className="text-xs sm:text-sm font-serif italic text-[#101536] leading-relaxed">
                "Our measure of success isn't how many lectures a student sits through, but what they are capable of discovering, building, and creating independently when they graduate."
              </p>
              <span className="text-[10px] font-mono font-bold text-[#5E6675] uppercase block mt-2">
                — NEXOVATE ACADEMIC BOARD
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-[#101536]/10 font-mono text-xs">
              <div>
                <span className="text-[9px] text-[#5E6675] uppercase block">FOUNDED</span>
                <span className="font-bold text-[#101536]">CHENNAI, INDIA</span>
              </div>
              <div>
                <span className="text-[9px] text-[#5E6675] uppercase block">FOCUS</span>
                <span className="font-bold text-[#101536]">APPLIED EDTECH</span>
              </div>
              <div>
                <span className="text-[9px] text-[#5E6675] uppercase block">STANDARDS</span>
                <span className="font-bold text-[#101536]">INDUSTRY-GRADE</span>
              </div>
            </div>
          </div>

          {/* RIGHT 40% — Authentic Maker Studio Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#101536]/10 bg-[#101536]">
              <img
                src={brandCreatorImage}
                alt="Nexovate Innovation Studio"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101536]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white font-mono text-[10px]">
                <span className="text-[#EFAF32] font-bold block">INNOVATION LAB</span>
                <span>Students collaborating on open-source repositories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
