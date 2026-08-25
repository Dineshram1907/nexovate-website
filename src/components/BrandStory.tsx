"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePresentation } from "@/context/PresentationContext";

export const BrandStory: React.FC = () => {
  const principles = [
    {
      number: "01",
      title: "THEORY WITHOUT PRACTICE EXPIRES",
      desc: "Information is cheap; applied competence is rare. We replace rote memorization with verified engineering output.",
    },
    {
      number: "02",
      title: "PROOF BEATS CREDENTIALS",
      desc: "Companies no longer hire for grades. They hire for functional repositories, deployed pipelines, and solved problems.",
    },
    {
      number: "03",
      title: "MOMENTUM COMPOUNDS RAPIDLY",
      desc: "Moving from curiosity to building once creates lifelong agency. You stop asking for permission and start creating.",
    },
  ];

  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-16 sm:py-20 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#F1F2EF] text-[#101536] select-none border-b border-[#101536]/08">
      {/* Oversized Background Editorial Typography */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04] font-serif font-black text-[220px] sm:text-[320px] lg:text-[420px] leading-none text-[#101536]">
        WHY
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Editorial Subheading */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#119E9D] uppercase">
            SLIDE 02 // THE NEXOVATE MANIFESTO
          </span>
          <span className="h-[1px] w-12 bg-[#119E9D]/40" />
        </div>

        {/* Asymmetrical Editorial Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-8 lg:mb-12">
          {/* Left Column: Bold Editorial Headline */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-[62px] font-serif font-extrabold tracking-tight text-[#101536] leading-[1.04]">
              WHY SHOULD <br />
              LEARNING <br />
              STOP AT <span className="italic text-[#119E9D]">KNOWING?</span>
            </h2>
          </div>

          {/* Right Column: Thoughtful Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            <p className="text-sm sm:text-base lg:text-lg text-[#333B4E] leading-relaxed font-light mb-4">
              Traditional education was engineered for an era of information scarcity. Today, knowledge is everywhere — but the capability to turn concepts into real software, AI architectures, and functional products remains desperately rare.
            </p>
            <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed">
              Nexovate is built to bridge that exact void: transforming student curiosity into proven, portfolio-grade capability.
            </p>
          </div>
        </div>

        {/* 3 Clean Horizontal Editorial Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 pt-6 border-t border-[#101536]/15">
          {principles.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: cubicEase }}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[#119E9D]">
                  {item.number}
                </span>
                <h3 className="text-xs font-bold font-mono tracking-wider text-[#101536] uppercase">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-[#5E6675] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
