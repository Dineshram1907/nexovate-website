import React from "react";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const PRINCIPLES = [
  {
    tag: "01",
    label: "PRACTICAL",
    headline: "Learn by doing.",
    description: "No shallow multiple-choice quizzes or surface-level syntax drills. Every concept is tested by building real software from day one.",
  },
  {
    tag: "02",
    label: "PROJECT-DRIVEN",
    headline: "Build things worth showing.",
    description: "Leave with substantial, deployed production systems with end-to-end telemetry that command respect during senior technical interviews.",
  },
  {
    tag: "03",
    label: "MENTORED",
    headline: "Get guidance when it matters.",
    description: "Receive weekly architectural feedback and Git pull request reviews from active engineers working at top tech enterprises.",
  },
  {
    tag: "04",
    label: "REAL-WORLD",
    headline: "Turn learning into evidence.",
    description: "Convert abstract theoretical knowledge into verifiable capstone artifacts, open-source contributions, and undeniable career leverage.",
  },
];

export const WhyNexovateSection: React.FC = () => {
  return (
    <section
      id="why-nexovate"
      aria-label="Section 07: Why Nexovate"
      className="relative w-full bg-[#F6F5F0] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none border-t border-[#071A2B]/10"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-[#071A2B]/10 pb-6 mb-16 sm:mb-24"
        >
          <span className="nx-editorial-label text-[#071A2B]/60">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            07 — WHY NEXOVATE
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#071A2B]/40 hidden sm:inline-block">
            PHILOSOPHY IN PRACTICE
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(44px,7vw,112px)] leading-[0.92] tracking-[-0.065em] text-[#071A2B]"
          >
            Why learners <br />
            <span className="text-[#11AFC0]">choose Nexovate.</span>
          </motion.h2>
        </div>

        {/* Four Editorial Statements / Rows */}
        <div className="w-full flex flex-col border-t border-[#071A2B]/10 divide-y divide-[#071A2B]/10">
          {PRINCIPLES.map((principle, idx) => (
            <motion.div
              key={principle.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: smoothEase }}
              className="py-10 sm:py-14 nx-editorial-grid items-baseline"
            >
              {/* Tag indicator */}
              <div className="col-span-2 sm:col-span-1">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#11AFC0]">
                  {principle.tag}
                </span>
              </div>

              {/* Dominant Keyword & Headline */}
              <div className="col-span-10 sm:col-span-4 lg:col-span-4 flex flex-col gap-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#071A2B]/50 font-semibold">
                  {principle.label}
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-4xl tracking-[-0.04em] text-[#071A2B]">
                  {principle.headline}
                </h3>
              </div>

              {/* Editorial Description */}
              <div className="col-span-12 sm:col-span-7 lg:col-span-7 mt-4 sm:mt-0">
                <p className="text-[clamp(16px,1.3vw,19px)] text-[#68747D] font-normal leading-relaxed tracking-[-0.01em] max-w-xl">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyNexovateSection;
