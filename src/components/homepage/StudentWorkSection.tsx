import React from "react";
import { motion } from "motion/react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const STUDENT_PROJECTS = [
  {
    id: "proj-01",
    tag: "FULL STACK ENGINEERING",
    title: "Distributed Financial Ledger & Real-Time Settlement Engine",
    description: "Built by Arjun Verma using React, TypeScript, Node.js, and PostgreSQL. Handles distributed transaction consensus, atomic updates, and interactive analytics.",
    image: IMAGE_REGISTRY.projects.fullStackWorkspace,
    author: "Arjun Verma",
    role: "Now at Tech Mahindra",
    span: "col-span-12 lg:col-span-10",
  },
  {
    id: "proj-02",
    tag: "AI & COMPUTER VISION",
    title: "Edge Defect Detection & Autonomous Vision Pipeline",
    description: "Built by Priya Sundaram with PyTorch and FastAPI. Processes real-time industrial camera feeds for millimeter-accurate defect classification.",
    image: IMAGE_REGISTRY.projects.aiPlatform,
    author: "Priya Sundaram",
    role: "Now at Cognizant",
    span: "col-span-12 lg:col-start-3 lg:col-span-10",
  },
  {
    id: "proj-03",
    tag: "DATA SCIENCE & ANALYTICS",
    title: "Multi-Echelon Supply Chain Demand Forecaster",
    description: "Built by Rahul Nambiar with Python, Pandas, and BigQuery. Predictive modeling across 50,000+ historical SKU demand distributions.",
    image: IMAGE_REGISTRY.projects.dataAnalytics,
    author: "Rahul Nambiar",
    role: "Now at Fractal Analytics",
    span: "col-span-12 lg:col-span-10",
  },
];

export const StudentWorkSection: React.FC = () => {
  return (
    <section
      id="student-work"
      aria-label="Section 05: Student Work"
      className="relative w-full bg-[#F6F5F0] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-48 overflow-hidden select-none border-t border-[#071A2B]/10"
    >
      <div className="nx-section-container">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center justify-between border-b border-[#071A2B]/10 pb-6 mb-16 sm:mb-20"
        >
          <span className="nx-editorial-label text-[#071A2B]/60">
            <span className="w-2 h-2 rounded-full bg-[#11AFC0]" />
            05 — STUDENT WORK
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#071A2B]/40 hidden sm:inline-block">
            VERIFIABLE CAPSTONES
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-20 sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(40px,6.5vw,104px)] leading-[0.94] tracking-[-0.06em] text-[#071A2B]"
          >
            Students don't just finish. <br />
            <span className="text-[#11AFC0]">They create.</span>
          </motion.h2>
        </div>

        {/* Asymmetrical Editorial Project Entries */}
        <div className="nx-editorial-grid gap-y-24 sm:gap-y-36">
          {STUDENT_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: smoothEase }}
              className={`${proj.span} flex flex-col gap-6`}
            >
              {/* Project Image Container */}
              <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-[#071A2B] border border-[#071A2B]/10 shadow-lg group">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-6 left-6">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#071A2B] text-[11px] font-mono font-bold tracking-widest uppercase">
                    0{idx + 1} // CAPSTONE
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#72D5DC]">
                    {proj.tag}
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase text-white/80 hidden sm:inline-block">
                    {proj.author} • {proj.role}
                  </span>
                </div>
              </div>

              {/* Project Metadata Narrative */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-2">
                <div className="flex flex-col gap-2 max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#071A2B] tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="text-base text-[#68747D] leading-relaxed font-normal">
                    {proj.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StudentWorkSection;
