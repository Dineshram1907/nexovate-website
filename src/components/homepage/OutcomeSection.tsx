import React from "react";
import { motion } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const OUTCOME_STAGES = [
  {
    step: "01",
    term: "LEARN",
    description: "Build the foundation from real practitioner workflows, not shallow syntax drills.",
  },
  {
    step: "02",
    term: "BUILD",
    description: "Turn architectural knowledge into tangible, testable production software.",
  },
  {
    step: "03",
    term: "PROVE",
    description: "Create verifiable evidence through deployed systems, code reviews, and live demos.",
  },
  {
    step: "04",
    term: "MOVE",
    description: "Step into high-leverage engineering and leadership roles with undeniable capability.",
  },
];

export const OutcomeSection: React.FC = () => {
  return (
    <section
      id="outcome"
      aria-label="Section 04: The Outcome"
      className="relative w-full bg-[#F6F5F0] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none"
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
            04 — THE OUTCOME
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#071A2B]/40 hidden sm:inline-block">
            CAREER LEVERAGE
          </span>
        </motion.div>

        {/* Monumental Headline */}
        <div className="max-w-4xl mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(44px,7.5vw,120px)] leading-[0.92] tracking-[-0.065em] text-[#071A2B]"
          >
            Your work should <br />
            <span className="text-[#11AFC0]">open doors.</span>
          </motion.h2>
        </div>

        {/* Typography-Led Progression (LEARN → BUILD → PROVE → MOVE) */}
        <div className="w-full flex flex-col divide-y divide-[#071A2B]/10 border-t border-b border-[#071A2B]/10">
          {OUTCOME_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.term}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: smoothEase }}
              className="py-8 sm:py-12 nx-editorial-grid items-baseline"
            >
              {/* Step indicator */}
              <div className="col-span-2 sm:col-span-1">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#11AFC0]">
                  {stage.step}
                </span>
              </div>

              {/* Dominant Term */}
              <div className="col-span-10 sm:col-span-4 lg:col-span-4">
                <h3 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.05em] text-[#071A2B]">
                  {stage.term}
                </h3>
              </div>

              {/* Editorial Descriptor */}
              <div className="col-span-12 sm:col-span-7 lg:col-span-7 mt-3 sm:mt-0">
                <p className="text-[clamp(16px,1.3vw,19px)] text-[#68747D] font-normal leading-relaxed tracking-[-0.01em] max-w-xl">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OutcomeSection;
