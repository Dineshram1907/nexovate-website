import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";

const smoothEase = [0.16, 1, 0.3, 1] as const;

interface ProgramRow {
  number: string;
  title: string;
  subtitle: string;
  skills: string[];
  image: string;
  link: string;
}

const PROGRAMS_LIST: ProgramRow[] = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    subtitle: "Build interfaces, scalable products, and full-stack digital architectures.",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: IMAGE_REGISTRY.projects.fullStackWorkspace,
    link: "/programs",
  },
  {
    number: "02",
    title: "DATA & ARTIFICIAL INTELLIGENCE",
    subtitle: "Turn raw datasets into predictive models, LLM systems, and actionable intelligence.",
    skills: ["Python", "PyTorch", "HuggingFace", "BigQuery"],
    image: IMAGE_REGISTRY.institutions.innovationWorkshop,
    link: "/programs",
  },
  {
    number: "03",
    title: "CLOUD ARCHITECTURE & DEVOPS",
    subtitle: "Architect automated CI/CD pipelines, Kubernetes clusters, and resilient infrastructure.",
    skills: ["Kubernetes", "Docker", "Terraform", "AWS"],
    image: IMAGE_REGISTRY.programs.cloudInfrastructure,
    link: "/programs",
  },
  {
    number: "04",
    title: "CORE & EMBEDDED ENGINEERING",
    subtitle: "Master precision CAD design, ARM firmware, and real-time embedded systems.",
    skills: ["ARM Cortex", "AutoCAD", "RTOS", "C++"],
    image: IMAGE_REGISTRY.projects.aiPlatform,
    link: "/programs",
  },
];

export const ProgramsEditorialSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="programs"
      aria-label="Section 04: Programs"
      className="relative w-full bg-[#FBFAF7] text-[#071A2B] pt-32 pb-36 sm:pt-40 sm:pb-44 overflow-hidden select-none border-t border-[#071A2B]/10"
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
            04 — PROGRAMS
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#071A2B]/40 hidden sm:inline-block">
            TECHNICAL PATHWAYS
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: smoothEase }}
            className="font-sans font-bold text-[clamp(40px,6.5vw,104px)] leading-[0.94] tracking-[-0.06em] text-[#071A2B]"
          >
            Choose what you want <br />
            <span className="text-[#11AFC0]">to build.</span>
          </motion.h2>
        </div>

        {/* Editorial Rows */}
        <div className="w-full flex flex-col border-t border-[#071A2B]/10 divide-y divide-[#071A2B]/10">
          {PROGRAMS_LIST.map((program, idx) => (
            <motion.div
              key={program.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: smoothEase }}
            >
              <Link
                to={program.link}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="nx-program-row group"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 w-full pr-6">
                  {/* Row Number */}
                  <span className="font-mono text-sm font-semibold text-[#11AFC0] tracking-widest shrink-0">
                    {program.number}
                  </span>

                  {/* Program Title & Narrative */}
                  <div className="flex flex-col gap-2 max-w-xl">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold tracking-tight text-[#071A2B] group-hover:text-[#11AFC0] transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#68747D] font-normal leading-relaxed">
                      {program.subtitle}
                    </p>
                  </div>

                  {/* Skills Tags */}
                  <div className="hidden lg:flex items-center gap-2 flex-wrap ml-auto">
                    {program.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full bg-[#071A2B]/5 text-[#071A2B]/70 text-xs font-mono tracking-wide"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Action Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-xs font-mono font-semibold tracking-widest text-[#071A2B] group-hover:text-[#11AFC0] transition-colors uppercase">
                    EXPLORE
                  </span>
                  <span className="text-xl font-bold text-[#071A2B] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgramsEditorialSection;
