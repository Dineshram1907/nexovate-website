"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  X,
  Activity,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";

// DEMO PROJECT VISUAL — Replace with real student project imagery before production.

interface ProjectDetail {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  problem: string;
  solution: string;
  outcome: string;
  image: string;
  liveMetric: { label: string; value: string };
  programIndex: number;
}

export const DEMO_PROJECTS: ProjectDetail[] = [
  {
    id: "01",
    number: "01",
    category: "AI / MACHINE LEARNING",
    title: "Predictive Student Performance System",
    description:
      "A student-built machine learning project focused on identifying learning patterns and generating useful insights to support student success.",
    technologies: ["Python", "TensorFlow", "Pandas", "FastAPI"],
    problem:
      "Educational institutions struggle to identify at-risk learners early enough to provide targeted academic interventions.",
    solution:
      "Developed multi-factor gradient boosting and neural regression models that analyze progression velocity and highlight intervention opportunities.",
    outcome:
      "Demo outcome — replace with verified project results (e.g. 91.4% early risk detection accuracy across test validation datasets).",
    image: "/programs/ai-ml.jpg",
    liveMetric: { label: "MODEL ACCURACY", value: "91.4% F1" },
    programIndex: 0,
  },
  {
    id: "02",
    number: "02",
    category: "FULL STACK",
    title: "Collaborative Learning Platform",
    description:
      "A modern web platform for students to collaborate in real time, track project milestones, and share technical resources seamlessly.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    problem:
      "Student project teams often encounter friction when coordinating code repositories, documentation, and task deadlines across disconnected tools.",
    solution:
      "Architected a unified collaborative workspace featuring real-time WebSocket synchronization, markdown documentation, and automated Kanban boards.",
    outcome:
      "Demo outcome — replace with verified project results (e.g. Sub-30ms real-time document synchronization with 100% test coverage).",
    image: "/programs/fullstack.jpg",
    liveMetric: { label: "SYNC LATENCY", value: "< 28ms" },
    programIndex: 1,
  },
  {
    id: "03",
    number: "03",
    category: "DATA",
    title: "Student Insights Dashboard",
    description:
      "A data analytics platform that transforms raw assessment records and practice logs into clean, actionable visual insights.",
    technologies: ["Python", "SQL", "Power BI", "Pandas"],
    problem:
      "Complex assessment data and learning telemetry are difficult for educators and students to visualize without specialized BI tooling.",
    solution:
      "Engineered automated ETL data extraction scripts that clean, normalize, and surface cohort retention trends in responsive interactive charts.",
    outcome:
      "Demo outcome — replace with verified project results (e.g. Automated daily telemetry reporting for 1,200+ simulated active student records).",
    image: "/programs/data-science.jpg",
    liveMetric: { label: "PIPELINE P99", value: "42ms" },
    programIndex: 2,
  },
  {
    id: "04",
    number: "04",
    category: "EMERGING TECHNOLOGY",
    title: "Smart Learning Assistant",
    description:
      "An experimental learning tool designed to help students navigate technical resources and discover personalized learning paths.",
    technologies: ["AI", "APIs", "Automation", "Python"],
    problem:
      "Students exploring new engineering disciplines frequently experience cognitive overload when searching for relevant documentation and projects.",
    solution:
      "Implemented an API-driven semantic retrieval assistant that contextualizes documentation, answers coding questions, and suggests optimal next steps.",
    outcome:
      "Demo outcome — replace with verified project results (e.g. 3.4x faster project onboarding during mentor-guided evaluation trials).",
    image: "/programs/cloud-devops.jpg",
    liveMetric: { label: "QUERY TIME", value: "120ms" },
    programIndex: 3,
  },
];

export const Projects: React.FC = () => {
  const { goToSection, setActiveProgramIndex } = usePresentation();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectDetail | null>(null);

  const AUTOPLAY_DURATION = 6000; // 6 seconds
  const PROGRESS_INTERVAL = 50; // ms
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev + 1) % DEMO_PROJECTS.length);
    setProgress(0);
  }, []);

  const prevProject = useCallback(() => {
    setActiveProjectIndex((prev) => (prev - 1 + DEMO_PROJECTS.length) % DEMO_PROJECTS.length);
    setProgress(0);
  }, []);

  const handleInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  // Responsive Horizontal Swipe Hook (Low distance threshold + velocity support)
  const { containerRef, dragOffset, handlers } = useHorizontalSwipe({
    onNext: nextProject,
    onPrev: prevProject,
    onInteraction: handleInteraction,
    dragDistanceThreshold: 30,
    velocityThreshold: 0.2,
    trackpadThreshold: 35,
  });

  // Autoplay progression timer
  useEffect(() => {
    if (isPaused || selectedModalProject !== null) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + (PROGRESS_INTERVAL / AUTOPLAY_DURATION) * 100;
        return nextVal >= 100 ? 100 : nextVal;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, selectedModalProject]);

  // When progress reaches 100%, switch to next project
  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      nextProject();
    }
  }, [progress, nextProject]);

  const handleSelectProject = (index: number) => {
    setActiveProjectIndex(index);
    setProgress(0);
    handleInteraction();
  };

  const currentProject = DEMO_PROJECTS[activeProjectIndex];
  const cubicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const handleExploreTrack = (index: number) => {
    setActiveProgramIndex(index);
    goToSection(2); // Slide 03 Programs
  };

  return (
    <section
      id="projects"
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
      className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#0B1028] text-white select-none border-b border-white/08 focus:outline-none cursor-grab active:cursor-grabbing touch-pan-y"
    >
      {/* Subtle Background Architectural Tech Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="proj-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#119E9D" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#proj-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-2.5 border-b border-white/10 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-3.5 h-3.5 text-[#119E9D]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                PROJECTS / PROOF OF CAPABILITY
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              WHAT STUDENTS BUILD<span className="text-[#EFAF32]">.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/60 font-light">
            Learning becomes meaningful when you build something real.
          </p>
        </div>

        {/* FEATURED PROJECT SLIDE WITH LIVE DRAG FEEDBACK */}
        <div
          style={{
            transform: dragOffset ? `translateX(${dragOffset}px)` : "none",
            transition: dragOffset ? "none" : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: cubicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
            >
              {/* LEFT 58% — Large Project Mockup & Interactive Visual */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                <div
                  onClick={() => setSelectedModalProject(currentProject)}
                  className="relative w-full aspect-[16/9.5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#101536] group cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: cubicEase }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1028] via-[#0B1028]/35 to-transparent" />
                  </motion.div>

                  {/* Top Application Header Bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[#119E9D] font-bold">STUDENT BUILD // REPO v1.4</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#EFAF32]">
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>{currentProject.liveMetric.label}: {currentProject.liveMetric.value}</span>
                    </div>
                  </div>

                  {/* Bottom Application UI Graphic Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-[#EFAF32] uppercase tracking-wider block">
                        PROJECT CAPSTONE OVERVIEW
                      </span>
                      <p className="text-xs text-white font-semibold truncate mt-0.5">
                        {currentProject.title}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-[#119E9D] text-white font-mono text-[9px] font-bold uppercase tracking-wider group-hover:bg-[#15b5b4] transition-colors shrink-0">
                      CLICK TO INSPECT
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT 42% — Project Content, Tech Tags & Action */}
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                {/* Project Number & Category */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#EFAF32]">
                    {currentProject.number} / 0{DEMO_PROJECTS.length}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#119E9D]/20 text-[#119E9D] text-[10px] font-mono font-bold tracking-wider uppercase">
                    {currentProject.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
                  {currentProject.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4 font-light">
                  {currentProject.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/06 border border-white/12 text-white/90 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions: View Project Modal & Track Link */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/10 w-full">
                  <button
                    onClick={() => setSelectedModalProject(currentProject)}
                    className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#119E9D] hover:bg-[#15b5b4] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32]" />
                  </button>

                  <button
                    onClick={() => handleExploreTrack(currentProject.programIndex)}
                    className="text-xs font-mono text-white/60 hover:text-white transition-colors"
                  >
                    Explore Track →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM: Project Selector & 6s Autoplay Progress Line */}
        <div className="mt-6 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 4 Project Pills */}
          <div className="flex items-center gap-2">
            {DEMO_PROJECTS.map((proj, idx) => {
              const isActive = activeProjectIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelectProject(idx)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase transition-all duration-200 focus:outline-none ${
                    isActive
                      ? "bg-[#119E9D] text-white shadow-sm ring-1 ring-[#119E9D]"
                      : "bg-white/06 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                  aria-label={`Select Project ${proj.number}`}
                >
                  {proj.number} {proj.category.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Autoplay Progress Line & Navigation Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/50">
                0{activeProjectIndex + 1} / 0{DEMO_PROJECTS.length}
              </span>
              <div className="w-24 sm:w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#119E9D] to-[#EFAF32] rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  prevProject();
                  handleInteraction();
                }}
                aria-label="Previous project"
                className="w-7 h-7 rounded-full bg-white/08 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  nextProject();
                  handleInteraction();
                }}
                aria-label="Next project"
                className="w-7 h-7 rounded-full bg-white/08 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN PROJECT DETAIL OVERLAY MODAL */}
      <AnimatePresence>
        {selectedModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: cubicEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#0B1028] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Demo Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-[#EFAF32]/20 text-[#EFAF32] font-mono text-[10px] font-bold uppercase">
                  DEMO PROJECT // SPECIFICATION
                </span>
                <span className="text-white/40 text-xs">•</span>
                <span className="text-[#119E9D] font-mono text-xs uppercase">
                  {selectedModalProject.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {selectedModalProject.title}
              </h3>

              <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
                {selectedModalProject.description}
              </p>

              {/* Project Image */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-white/15">
                <img
                  src={selectedModalProject.image}
                  alt={selectedModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Problem & Solution Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
                <div className="p-4 rounded-xl bg-white/04 border border-white/10">
                  <span className="text-[10px] font-mono font-bold text-[#EFAF32] uppercase block mb-1">
                    ENGINEERING PROBLEM
                  </span>
                  <p className="text-white/80 leading-relaxed font-light">
                    {selectedModalProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/04 border border-white/10">
                  <span className="text-[10px] font-mono font-bold text-[#119E9D] uppercase block mb-1">
                    STUDENT ARCHITECTURE & BUILD
                  </span>
                  <p className="text-white/80 leading-relaxed font-light">
                    {selectedModalProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-white/50 uppercase block mb-2">
                  PRODUCTION TECHNOLOGIES USED
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-white/08 border border-white/15 font-mono text-xs text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Demo Outcome Disclaimer */}
              <div className="p-3.5 rounded-xl bg-white/03 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EFAF32] shrink-0" />
                <span>{selectedModalProject.outcome}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
