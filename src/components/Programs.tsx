"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";

// DEMO PROGRAM DATA — Replace with verified Nexovate data before production.

interface ProgramItem {
  id: string;
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
  accent: "teal" | "gold";
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "01",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "Artificial Intelligence & Machine Learning",
    headline: "Build intelligent systems and neural architectures.",
    description:
      "Master deep learning, computer vision, and transformer models through hands-on Python repositories and real-world datasets.",
    duration: "12 WEEKS",
    mode: "HYBRID",
    level: "BEGINNER → INTERMEDIATE",
    fees: "₹24,999",
    image: "/programs/ai-ml.jpg",
    skills: ["Python", "PyTorch", "Computer Vision", "Neural Networks"],
    accent: "teal",
  },
  {
    id: "02",
    category: "SOFTWARE ENGINEERING",
    title: "Full Stack Web Engineering",
    headline: "Architect scalable, production-grade applications.",
    description:
      "Design and deploy modern full-stack web platforms using Next.js, Node.js, TypeScript, PostgreSQL, and scalable cloud backends.",
    duration: "16 WEEKS",
    mode: "HYBRID",
    level: "BEGINNER → INTERMEDIATE",
    fees: "₹29,999",
    image: "/programs/fullstack.jpg",
    skills: ["React & Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    accent: "gold",
  },
  {
    id: "03",
    category: "DATA SCIENCE",
    title: "Data Science & Analytics",
    headline: "Extract predictive intelligence from complex data.",
    description:
      "Transform raw data into strategic insights with statistical modeling, predictive algorithms, automated pipelines, and visualization.",
    duration: "14 WEEKS",
    mode: "ONLINE",
    level: "BEGINNER → INTERMEDIATE",
    fees: "₹27,999",
    image: "/programs/data-science.jpg",
    skills: ["Python Data Stack", "SQL", "Predictive Analytics", "Tableau"],
    accent: "teal",
  },
  {
    id: "04",
    category: "CLOUD INFRASTRUCTURE",
    title: "Cloud Computing & DevOps",
    headline: "Deploy and manage resilient distributed architectures.",
    description:
      "Learn cloud architecture, container orchestration with Kubernetes, Docker, automated CI/CD pipelines, and infrastructure-as-code.",
    duration: "12 WEEKS",
    mode: "ONLINE",
    level: "INTERMEDIATE",
    fees: "₹24,999",
    image: "/programs/cloud-devops.jpg",
    skills: ["AWS Cloud", "Docker", "Kubernetes", "CI/CD Workflows"],
    accent: "gold",
  },
  {
    id: "05",
    category: "CYBERSECURITY",
    title: "Cybersecurity Foundations",
    headline: "Defend systems against modern threat vectors.",
    description:
      "Understand enterprise security principles, ethical hacking methodologies, network defense protocols, and vulnerability analysis.",
    duration: "10 WEEKS",
    mode: "ONLINE",
    level: "BEGINNER",
    fees: "₹21,999",
    image: "/programs/fullstack.jpg",
    skills: ["Network Security", "Ethical Hacking", "Threat Modeling", "Linux"],
    accent: "teal",
  },
  {
    id: "06",
    category: "FUTURE HORIZONS",
    title: "Emerging Technologies",
    headline: "Explore robotics, IoT, and edge intelligence.",
    description:
      "Cross-disciplinary immersion covering embedded systems, Edge AI, IoT sensors, and autonomous computing for tomorrow's engineers.",
    duration: "8 WEEKS",
    mode: "IN-PERSON LAB",
    level: "ALL LEVELS",
    fees: "₹18,999",
    image: "/programs/cloud-devops.jpg",
    skills: ["Edge Computing", "IoT Hardware", "Embedded C++", "Robotics"],
    accent: "gold",
  },
];

export const Programs: React.FC = () => {
  const { activeProgramIndex, setActiveProgramIndex, enquireProgram } = usePresentation();
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_DURATION = 5000; // 5 seconds per course
  const PROGRESS_INTERVAL = 50; // ms
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextProgram = useCallback(() => {
    setActiveProgramIndex((prev) => (prev + 1) % PROGRAMS_DATA.length);
    setProgress(0);
  }, [setActiveProgramIndex]);

  const prevProgram = useCallback(() => {
    setActiveProgramIndex((prev) => (prev - 1 + PROGRAMS_DATA.length) % PROGRAMS_DATA.length);
    setProgress(0);
  }, [setActiveProgramIndex]);

  const handleInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 4500);
  }, []);

  // Responsive Horizontal Swipe Hook (Low distance threshold + velocity support)
  const { containerRef, dragOffset, handlers } = useHorizontalSwipe({
    onNext: nextProgram,
    onPrev: prevProgram,
    onInteraction: handleInteraction,
    dragDistanceThreshold: 30,
    velocityThreshold: 0.2,
    trackpadThreshold: 35,
  });

  // Autoplay progression timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + (PROGRESS_INTERVAL / AUTOPLAY_DURATION) * 100;
        return nextVal >= 100 ? 100 : nextVal;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  // When progress reaches 100%, switch to next course
  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      nextProgram();
    }
  }, [progress, nextProgram]);

  // Visibility change handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const currentProgram = PROGRAMS_DATA[activeProgramIndex] || PROGRAMS_DATA[0];
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div
      ref={containerRef}
      data-horizontal-carousel="true"
      tabIndex={0}
      {...handlers}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#FAFBFC] border-b border-[#101536]/06 select-none focus:outline-none cursor-grab active:cursor-grabbing touch-pan-y"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#119E9D]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Header Bar & Progress Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 pb-3 border-b border-[#101536]/08 gap-3">
          <div className="flex items-center gap-3">
            <span className="subheading-label">FIND YOUR NEXT SKILL</span>
            <span className="text-[#101536]/20">•</span>
            <span className="text-xs font-mono font-bold text-[#101536]">
              {currentProgram.id} <span className="text-[#5E6675]/50">/</span> 06
            </span>
          </div>

          {/* Autoplay Animated Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="w-28 sm:w-44 h-1 bg-[#101536]/08 rounded-full overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#119E9D] to-[#EFAF32] rounded-full"
              />
            </div>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  prevProgram();
                  handleInteraction();
                }}
                aria-label="Previous course"
                className="w-8 h-8 rounded-full bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  nextProgram();
                  handleInteraction();
                }}
                aria-label="Next course"
                className="w-8 h-8 rounded-full bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Course Full-Screen Split Experience with Live Drag Feedback */}
        <div
          style={{
            transform: dragOffset ? `translateX(${dragOffset}px)` : "none",
            transition: dragOffset ? "none" : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProgram.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.55, ease: cubicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* LEFT 52% — Large High-Resolution Course Editorial Visual */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-[#101536]/10 shadow-xl bg-[#101536] group">
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: cubicEase }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={currentProgram.image}
                      alt={currentProgram.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 650px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101536]/90 via-[#101536]/30 to-transparent" />
                  </motion.div>

                  {/* Overlaid Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#101536]/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                      {currentProgram.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="text-white">
                      <span className="text-[10px] font-mono font-bold text-[#EFAF32] uppercase tracking-wider block">
                        CURRICULUM HIGHLIGHT
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-white/95 truncate">
                        {currentProgram.headline}
                      </p>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold shrink-0">
                      {currentProgram.fees}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT 48% — Course Information, Metadata & Actions */}
              <div className="lg:col-span-6 flex flex-col justify-between items-start text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#119E9D]">
                      {currentProgram.id} / 06
                    </span>
                    <span className="text-[#101536]/20">•</span>
                    <span className="text-xs font-mono font-semibold text-[#5E6675] uppercase">
                      {currentProgram.level}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#101536] tracking-tight mb-3 leading-tight">
                    {currentProgram.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-6 font-normal">
                    {currentProgram.description}
                  </p>

                  {/* Course Specs Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 w-full">
                    <div className="p-2.5 rounded-xl bg-[#F2F5F6] border border-[#101536]/06">
                      <div className="flex items-center gap-1.5 text-[#5E6675] text-[10px] font-mono uppercase mb-0.5">
                        <Clock className="w-3 h-3 text-[#119E9D]" />
                        <span>DURATION</span>
                      </div>
                      <span className="text-xs font-bold text-[#101536] font-mono">{currentProgram.duration}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F2F5F6] border border-[#101536]/06">
                      <div className="flex items-center gap-1.5 text-[#5E6675] text-[10px] font-mono uppercase mb-0.5">
                        <Award className="w-3 h-3 text-[#EFAF32]" />
                        <span>FORMAT</span>
                      </div>
                      <span className="text-xs font-bold text-[#101536] font-mono">{currentProgram.mode}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#F2F5F6] border border-[#101536]/06 col-span-2 sm:col-span-1">
                      <div className="flex items-center gap-1.5 text-[#5E6675] text-[10px] font-mono uppercase mb-0.5">
                        <Sparkles className="w-3 h-3 text-[#119E9D]" />
                        <span>TUITION</span>
                      </div>
                      <span className="text-xs font-bold text-[#101536] font-mono">{currentProgram.fees}</span>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono font-bold text-[#5E6675] uppercase tracking-wider block mb-2">
                      CORE COMPETENCIES COVERED
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProgram.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#101536]/04 text-[#101536] text-xs font-mono font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#119E9D]" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-4 border-t border-[#101536]/08">
                  <button
                    onClick={() => enquireProgram(currentProgram.title, activeProgramIndex)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#101536] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#119E9D] transition-colors duration-200 shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
                  >
                    <span>ENQUIRE FOR THIS TRACK</span>
                    <ArrowRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[11px] font-mono text-[#5E6675] text-center sm:text-left">
                    Cohort starts soon • Limited seats
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Horizontal Quick Track Selector Pills */}
        <div className="mt-8 pt-4 border-t border-[#101536]/08 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {PROGRAMS_DATA.map((prog, idx) => {
            const isActive = activeProgramIndex === idx;
            return (
              <button
                key={prog.id}
                onClick={() => {
                  setActiveProgramIndex(idx);
                  setProgress(0);
                  handleInteraction();
                }}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold transition-all duration-200 shrink-0 focus:outline-none ${
                  isActive
                    ? "bg-[#101536] text-white shadow-xs"
                    : "bg-[#F2F5F6] text-[#5E6675] hover:bg-[#101536]/10 hover:text-[#101536]"
                }`}
              >
                0{idx + 1} {prog.category.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
