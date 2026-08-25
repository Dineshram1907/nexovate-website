"use client";

import React from "react";
import { motion } from "framer-motion";

interface PhilosophyStep {
  number: string;
  title: string;
  description: string;
  accentColor: string;
}

export const Philosophy: React.FC = () => {
  const steps: PhilosophyStep[] = [
    {
      number: "01",
      title: "NEXT",
      description: "Discover what is changing.",
      accentColor: "#119E9D",
    },
    {
      number: "02",
      title: "LEARN",
      description: "Build the knowledge that matters.",
      accentColor: "#101536",
    },
    {
      number: "03",
      title: "INNOVATE",
      description: "Turn knowledge into ideas.",
      accentColor: "#EFAF32",
    },
    {
      number: "04",
      title: "EVOLVE",
      description: "Keep moving forward.",
      accentColor: "#119E9D",
    },
  ];

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#FAFBFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 text-left"
        >
          <span className="subheading-label mb-3 block">SECTION 02 — PHILOSOPHY</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101536]">
            OUR CORE PHILOSOPHY.
          </h2>
        </motion.div>

        {/* 4 Cards Grid / Horizontal Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-2xl border border-[#101536]/08 p-8 flex flex-col justify-between h-full hover:border-[#119E9D]/30 hover:shadow-sm transition-all duration-300 group"
            >
              <div>
                {/* Number & Accent Line */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-semibold text-[#5E6675] tracking-widest">
                    {step.number}
                  </span>
                  <div
                    className="w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: step.accentColor }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-[#101536] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#5E6675] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Subtle Geometric Indicator */}
              <div className="mt-8 pt-4 border-t border-[#101536]/05 flex items-center justify-end">
                <span className="text-xs text-[#5E6675] font-mono opacity-60">
                  NEXOVATE // {step.number}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
