"use client";

import React from "react";
import { motion } from "framer-motion";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  detail: string;
}

export const WhyNexovate: React.FC = () => {
  const pillars: Pillar[] = [
    {
      number: "01",
      title: "PRACTICAL",
      subtitle: "Learn by building.",
      detail:
        "Knowledge becomes capability through action. Students gain experience through practical projects and hands-on application.",
    },
    {
      number: "02",
      title: "INDUSTRY-ALIGNED",
      subtitle: "Learn skills relevant to the real world.",
      detail:
        "Our curriculum focuses on modern tools, frameworks, and workflows actively utilized in technology industries today.",
    },
    {
      number: "03",
      title: "MENTOR-LED",
      subtitle: "Learn from people who understand the field.",
      detail:
        "Guidance from experienced engineers and tech practitioners who provide real-world insights and constructive feedback.",
    },
    {
      number: "04",
      title: "FUTURE-READY",
      subtitle: "Prepare for what comes next.",
      detail:
        "Cultivate adaptable skills, critical engineering principles, and continuous learning habits for long-term growth.",
    },
  ];

  return (
    <section id="why-nexovate" className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="subheading-label mb-3 block">SECTION 04 — WHY NEXOVATE</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101536]">
            MORE THAN A COURSE.
          </h2>
        </div>

        {/* 4 Typography-Driven Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-2xl border border-[#101536]/08 p-8 md:p-10 flex flex-col justify-between hover:border-[#119E9D]/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="subheading-label text-[#119E9D]">
                    PRINCIPLE {pillar.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#EFAF32]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101536] mb-2">
                  {pillar.title}
                </h3>

                <p className="text-lg font-semibold text-[#119E9D] mb-4">
                  {pillar.subtitle}
                </p>

                <p className="text-base text-[#5E6675] leading-relaxed">
                  {pillar.detail}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#101536]/06 text-right">
                <span className="text-xs font-mono text-[#5E6675]/60">
                  NEXOVATE PRINCIPLE // {pillar.number}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
