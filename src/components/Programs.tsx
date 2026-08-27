"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import {
  aiMlImage,
  dataScienceImage,
  fullStackImage,
  cloudDevopsImage,
} from "@/assets";

export interface ProgramItem {
  id: string;
  selectorLabel: string;
  category: string;
  title: string;
  headline: string;
  description: string;
  duration: string;
  mode: string;
  level: string;
  fees: string;
  image: string;
  skills: string[];
  accentColor: string;
  accentBg: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "01",
    selectorLabel: "Technology",
    category: "SOFTWARE & WEB ARCHITECTURE",
    title: "Full Stack Web Engineering",
    headline: "Architect modern, production-grade web platforms.",
    description:
      "Design and deploy responsive web applications using React, TypeScript, Node.js APIs, relational databases, and scalable cloud workflows.",
    duration: "14 Weeks",
    mode: "Online & Labs",
    level: "Beginner → Intermediate",
    fees: "₹24,999",
    image: fullStackImage,
    skills: ["React & Next.js", "TypeScript", "Node.js API", "PostgreSQL", "Tailwind CSS"],
    accentColor: "#6366F1",
    accentBg: "bg-[#EEF2FF]",
  },
  {
    id: "02",
    selectorLabel: "Design",
    category: "CREATIVE & PRODUCT DESIGN",
    title: "UI/UX & Interactive Product Design",
    headline: "Craft intuitive, human-centered digital experiences.",
    description:
      "Master user research, interactive wireframing, Figma design systems, and rapid prototyping to build interfaces people love to use.",
    duration: "10 Weeks",
    mode: "Hybrid",
    level: "All Levels",
    fees: "₹21,999",
    image: fullStackImage,
    skills: ["UI/UX Design", "Figma Systems", "User Research", "Prototyping", "Design Systems"],
    accentColor: "#EC4899",
    accentBg: "bg-[#FCE7F3]",
  },
  {
    id: "03",
    selectorLabel: "Business",
    category: "PRODUCT & TECH BUSINESS",
    title: "Tech Business & Product Strategy",
    headline: "Turn creative concepts into scalable digital products.",
    description:
      "Learn product management essentials, customer discovery, market strategy, agile sprints, and growth analytics for emerging tech ventures.",
    duration: "8 Weeks",
    mode: "Online",
    level: "All Levels",
    fees: "₹19,999",
    image: cloudDevopsImage,
    skills: ["Product Strategy", "Market Analysis", "Agile Sprints", "Growth Metrics"],
    accentColor: "#F97316",
    accentBg: "bg-[#FFEDD5]",
  },
  {
    id: "04",
    selectorLabel: "Data & AI",
    category: "ARTIFICIAL INTELLIGENCE & DATA",
    title: "AI, Machine Learning & Analytics",
    headline: "Build predictive models and intelligent neural systems.",
    description:
      "Explore deep learning, computer vision, data visualization pipelines, and real-time inference models through practical Python repos.",
    duration: "14 Weeks",
    mode: "Online & Labs",
    level: "Beginner → Intermediate",
    fees: "₹27,999",
    image: aiMlImage,
    skills: ["Python", "PyTorch / ML", "Computer Vision", "Predictive Analytics", "FastAPI"],
    accentColor: "#119E9D",
    accentBg: "bg-[#CCFBF1]",
  },
  {
    id: "05",
    selectorLabel: "Science",
    category: "APPLIED COMPUTING & SCIENCE",
    title: "Data Science & Computational Analysis",
    headline: "Extract actionable intelligence from complex datasets.",
    description:
      "Transform real-world data into insight with statistical algorithms, geospatial mapping, automated pipelines, and interactive dashboards.",
    duration: "12 Weeks",
    mode: "Online",
    level: "Beginner → Intermediate",
    fees: "₹24,999",
    image: dataScienceImage,
    skills: ["Python Data Stack", "Pandas", "SQL", "Plotly", "Statistical Modeling"],
    accentColor: "#F59E0B",
    accentBg: "bg-[#FEF3C7]",
  },
  {
    id: "06",
    selectorLabel: "Career",
    category: "CLOUD & DEVOPS INFRASTRUCTURE",
    title: "Cloud Architecture & DevOps Systems",
    headline: "Deploy and orchestrate resilient distributed systems.",
    description:
      "Master container orchestration with Docker & Kubernetes, CI/CD automated deployment pipelines, and modern cloud infrastructure on GCP.",
    duration: "12 Weeks",
    mode: "Online & Mentorship",
    level: "Intermediate",
    fees: "₹24,999",
    image: cloudDevopsImage,
    skills: ["Cloud Architecture", "Docker", "Kubernetes", "CI/CD Pipelines", "Linux"],
    accentColor: "#8B5CF6",
    accentBg: "bg-[#EDE9FE]",
  },
];

export const Programs: React.FC = () => {
  const { activeProgramIndex, setActiveProgramIndex, enquireProgram } = usePresentation();
  const [currentIndex, setCurrentIndex] = useState(activeProgramIndex || 0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof activeProgramIndex === "number" && activeProgramIndex !== currentIndex) {
      setCurrentIndex(activeProgramIndex);
    }
  }, [activeProgramIndex]);

  const handleInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  }, []);

  const handleSelectProgram = (idx: number) => {
    setCurrentIndex(idx);
    setActiveProgramIndex(idx);
    handleInteraction();
  };

  const nextProgram = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIdx = (prev + 1) % PROGRAMS_DATA.length;
      setActiveProgramIndex(nextIdx);
      return nextIdx;
    });
  }, [setActiveProgramIndex]);

  const prevProgram = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIdx = (prev - 1 + PROGRAMS_DATA.length) % PROGRAMS_DATA.length;
      setActiveProgramIndex(prevIdx);
      return prevIdx;
    });
  }, [setActiveProgramIndex]);

  // Autoplay progression (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextProgram();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextProgram]);

  // Touch handlers for mobile
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    handleInteraction();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX < 0) {
        nextProgram();
      } else {
        prevProgram();
      }
    }
  };

  const current = PROGRAMS_DATA[currentIndex];
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div
      id="programs"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] border-b border-[#101536]/06 select-none overflow-x-clip font-sans scroll-mt-20"
      onMouseEnter={handleInteraction}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#101536]/08 gap-3">
          <div className="text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
              CURATED LEARNING PATHWAYS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] leading-tight font-jakarta">
              FEATURED PROGRAMS<span className="text-[#F97316]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs sm:text-sm text-[#5E6675] font-medium max-w-sm text-left sm:text-right hidden sm:block">
              Practitioner-led tracks designed to take you from fundamentals to deploying real capstones.
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  prevProgram();
                  handleInteraction();
                }}
                aria-label="Previous program"
                className="w-9 h-9 rounded-xl bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  nextProgram();
                  handleInteraction();
                }}
                aria-label="Next program"
                className="w-9 h-9 rounded-xl bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SINGLE FEATURED PROGRAM CARD CONTAINER */}
        <div className="bg-white border border-[#101536]/10 rounded-3xl p-6 sm:p-10 shadow-lg mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: cubicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* LEFT 52% — One Large Realistic Photograph */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-md bg-[#0B1028] border border-[#101536]/10">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1028]/80 via-transparent to-transparent" />

                  {/* Micro Category Overlay Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                    {current.category}
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <p className="font-semibold">{current.headline}</p>
                  </div>
                </div>
              </div>

              {/* RIGHT 48% — Clean Program Information & Action */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                {/* Discipline Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#F97316]">
                    0{currentIndex + 1} / 0{PROGRAMS_DATA.length}
                  </span>
                  <span className="text-[#101536]/30">•</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold uppercase tracking-wider">
                    {current.selectorLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-[#101536] mb-3 leading-snug font-jakarta">
                  {current.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-6 font-medium">
                  {current.description}
                </p>

                {/* Specs Matrix: Duration, Mode, Level, Tuition */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full p-4 rounded-2xl bg-[#FAFBFC] border border-[#101536]/08 mb-6 text-xs">
                  <div>
                    <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">DURATION</span>
                    <span className="font-bold text-[#101536]">{current.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">MODE</span>
                    <span className="font-bold text-[#101536]">{current.mode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">LEVEL</span>
                    <span className="font-bold text-[#101536]">{current.level}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">TUITION</span>
                    <span className="font-bold text-[#6366F1]">{current.fees}</span>
                  </div>
                </div>

                {/* Skills Learned */}
                <div className="mb-6 w-full">
                  <span className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-2">
                    CORE SKILLS YOU'LL BUILD
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-white border border-[#101536]/12 text-[#101536] text-[11px] font-semibold shadow-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Enquiry CTA */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#101536]/10 w-full">
                  <button
                    onClick={() => enquireProgram(current.title, currentIndex)}
                    className="min-h-[46px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all shadow-md cursor-pointer"
                  >
                    <span>Enquire for Track</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <a
                    href="#contact"
                    className="text-xs font-bold text-[#5E6675] hover:text-[#101536] transition-colors"
                  >
                    Ask a Question →
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* HORIZONTAL PROGRAM SELECTOR (01 Tech, 02 Design, 03 Business, 04 Data & AI, 05 Science, 06 Career) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {PROGRAMS_DATA.map((prog, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={prog.id}
                onClick={() => handleSelectProgram(idx)}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#101536] text-white shadow-md ring-2 ring-[#6366F1]"
                    : "bg-white text-[#5E6675] border border-[#101536]/10 hover:text-[#101536] hover:bg-[#F6F8F9]"
                }`}
              >
                <span className="text-[#F97316] mr-1.5">{prog.id}</span>
                <span>{prog.selectorLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
