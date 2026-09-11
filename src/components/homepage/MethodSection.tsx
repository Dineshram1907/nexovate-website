import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const smoothEase = [0.16, 1, 0.3, 1] as const;

interface MethodStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string[];
  imageSrc: string;
  tag: string;
}

const STAGES: MethodStage[] = [
  {
    id: "discover",
    step: "01 / 03",
    title: "DISCOVER",
    subtitle: "Architecture & First Principles",
    description: [
      "Understand the problem deeply before writing a line of code.",
      "Find the direction with real-world engineering constraints.",
      "Build a rock-solid foundation grounded in modern system architecture.",
    ],
    imageSrc: "/assets/discovery/discovery-stage-1.png",
    tag: "FOUNDATION",
  },
  {
    id: "build",
    step: "02 / 03",
    title: "BUILD",
    subtitle: "Applied Production Systems",
    description: [
      "Turn abstract knowledge into something tangible and resilient.",
      "Develop end-to-end production projects and complex experiments.",
      "Iterate directly alongside senior practitioners.",
    ],
    imageSrc: "/assets/discovery/discovery-stage-2.png",
    tag: "EXECUTION",
  },
  {
    id: "ship",
    step: "03 / 03",
    title: "SHIP",
    subtitle: "Public Deployment & Proof",
    description: [
      "Take your engineering work beyond the sandbox.",
      "Deploy live artifacts, open-source repositories, and verified systems.",
      "Showcase verifiable evidence to industry leaders.",
    ],
    imageSrc: "/assets/discovery/discovery-stage-3.jpg",
    tag: "DEPLOYMENT",
  },
];

export const MethodSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveStageIndex(index);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveStageIndex((prev) => (prev - 1 + STAGES.length) % STAGES.length);
    }
  };

  return (
    <section
      id="method"
      aria-label="Section 02: The Nexovate Method"
      className="relative w-full bg-[#071A2B] text-[#FFFFFF] pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-20"
        >
          <span className="nx-editorial-label text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            02 — THE NEXOVATE METHOD
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-white/40 hidden sm:inline-block">
            PROCESS // STAGES
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(40px,6.5vw,104px)] leading-[0.94] tracking-[-0.06em] text-white"
          >
            Learn less. <br />
            Build more. <br />
            <span className="text-[#72D5DC]">Ship something real.</span>
          </motion.h2>
        </div>

        {/* Integrated Editorial Composition */}
        <div className="nx-editorial-grid items-center gap-12 lg:gap-16">
          
          {/* Left Column: Interactive 3-Stage Progression */}
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="flex flex-col" role="tablist" aria-label="Method Progression Stages">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={stage.id}
                    role="tab"
                    id={`stage-tab-${stage.id}`}
                    aria-selected={isActive}
                    aria-controls={`stage-panel-${stage.id}`}
                    tabIndex={0}
                    onClick={() => setActiveStageIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="nx-stage-item group"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span
                        className={`font-mono text-xs tracking-widest transition-colors duration-300 ${
                          isActive ? "text-[#11AFC0] font-semibold" : "text-white/40 group-hover:text-white/60"
                        }`}
                      >
                        {stage.step}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.18em] transition-opacity duration-300 ${
                          isActive ? "opacity-80 text-[#72D5DC]" : "opacity-0"
                        }`}
                      >
                        {stage.tag}
                      </span>
                    </div>

                    <h3
                      className={`font-sans font-bold text-2xl sm:text-4xl tracking-[-0.04em] transition-all duration-300 ${
                        isActive ? "text-white" : "text-white/35 group-hover:text-white/70"
                      }`}
                    >
                      {stage.title}
                    </h3>

                    {/* Active Expanded Narrative */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          id={`stage-panel-${stage.id}`}
                          role="tabpanel"
                          aria-labelledby={`stage-tab-${stage.id}`}
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.45, ease: smoothEase }}
                          className="overflow-hidden flex flex-col gap-3 pt-2"
                        >
                          <p className="text-sm font-semibold text-white/90 tracking-tight">
                            {stage.subtitle}
                          </p>
                          <ul className="flex flex-col gap-2 text-[14px] text-white/65 leading-relaxed font-normal">
                            {stage.description.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC0] mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Single Dominant Art-Directed Visual */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-[#102B40]/60 border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.75, ease: smoothEase }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={activeStage.imageSrc}
                    alt={`${activeStage.title} - ${activeStage.subtitle}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Cinematic vignette & editorial overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Micro Metadata Badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071A2B]/80 backdrop-blur-md border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC0] animate-pulse" />
                      <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase">
                        STAGE / {activeStage.step.split(" ")[0]}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-white/60 uppercase hidden sm:inline-block">
                      NEXOVATE METHODOLOGY
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MethodSection;
