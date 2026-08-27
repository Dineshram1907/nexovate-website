"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Activity, CheckCircle2, ChevronLeft, ChevronRight, X, ExternalLink, Code2, Sparkles } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import {
  aiMlImage,
  fullStackImage,
  dataScienceImage,
  cloudDevopsImage,
} from "@/assets";

export interface ProjectSnapshot {
  id: string;
  number: string;
  title: string;
  category: string;
  programIndex: number;
  description: string;
  technologies: string[];
  image: string;
  liveMetric: { label: string; value: string };
  studentName: string;
  studentRole: string;
  problemStatement: string;
  solutionOverview: string;
  keyFeatures: string[];
}

export const FEATURED_PROJECTS: ProjectSnapshot[] = [
  {
    id: "ai-prediction",
    number: "01",
    title: "Student Performance Prediction Engine",
    category: "Artificial Intelligence",
    programIndex: 3,
    description:
      "An adaptive machine learning pipeline that analyzes engagement metrics and study habits to forecast milestone completion and recommend early interventions.",
    technologies: ["Python", "PyTorch", "FastAPI", "React", "Tailwind CSS"],
    image: aiMlImage,
    liveMetric: { label: "MODEL ACCURACY", value: "91.4% F1 Score" },
    studentName: "Priya Sharma",
    studentRole: "AI Student Lead",
    problemStatement:
      "Educators often identify struggling students too late in the semester, when remedial intervention is difficult.",
    solutionOverview:
      "Built an early-warning prediction system trained on historical cohort datasets to flag learning gaps by Week 3.",
    keyFeatures: [
      "Real-time risk scoring matrix",
      "Automated study resource recommendations",
      "Interactive mentor dashboard with early alerts",
    ],
  },
  {
    id: "fullstack-saas",
    number: "02",
    title: "Collaborative Workspace Platform",
    category: "Full Stack Web Engineering",
    programIndex: 0,
    description:
      "A real-time workspace application featuring concurrent document editing, kanban project tracking, and live task distribution for student teams.",
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "WebSockets"],
    image: fullStackImage,
    liveMetric: { label: "LATENCY", value: "<45ms WebSocket" },
    studentName: "Arjun Mehta",
    studentRole: "Full Stack Developer",
    problemStatement:
      "Student project teams lack unified tools that combine real-time canvas collaboration with structured task management.",
    solutionOverview:
      "Engineered an all-in-one web hub supporting multi-user live cursors, markdown notes, and progress analytics.",
    keyFeatures: [
      "Live concurrent cursor editing",
      "Kanban board with drag-and-drop",
      "Exportable project summaries and repo links",
    ],
  },
  {
    id: "data-analytics",
    number: "03",
    title: "Urban Environmental Data Dashboard",
    category: "Data Science & Analytics",
    programIndex: 4,
    description:
      "A real-time sensor data aggregator visualizing air quality metrics, temperature variances, and traffic congestion patterns across metropolitan hubs.",
    technologies: ["Python", "Pandas", "Plotly", "Streamlit", "FastAPI"],
    image: dataScienceImage,
    liveMetric: { label: "DATA STREAM", value: "10K req/sec" },
    studentName: "Vishal Kumar",
    studentRole: "Data Scientist",
    problemStatement:
      "City environmental data is fragmented across municipal portals and difficult for citizens and planners to interpret.",
    solutionOverview:
      "Aggregated public API streams into a responsive geospatial heatmap dashboard with predictive air quality alerts.",
    keyFeatures: [
      "Interactive GIS spatial mapping",
      "Time-series forecasting models",
      "Automated daily digests and push alerts",
    ],
  },
  {
    id: "cloud-devops",
    number: "04",
    title: "Automated Multi-Cloud CI/CD Pipeline",
    category: "Cloud & DevOps Architecture",
    programIndex: 5,
    description:
      "A resilient microservices orchestration pipeline featuring automated canary testing, containerized Docker deployments, and Kubernetes scaling.",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "GCP", "Terraform"],
    image: cloudDevopsImage,
    liveMetric: { label: "UPTIME", value: "99.98% SLA" },
    studentName: "Harini R",
    studentRole: "DevOps Engineer",
    problemStatement:
      "Deploying distributed student projects manually causes build discrepancies and downtime during project presentations.",
    solutionOverview:
      "Created an automated GitOps deployment pipeline that provisions ephemeral test environments on every pull request.",
    keyFeatures: [
      "Automated canary build verification",
      "Zero-downtime rolling updates",
      "Infrastructure-as-Code Terraform templates",
    ],
  },
];

export const WhatStudentsBuild: React.FC = () => {
  const { setActiveProgramIndex } = usePresentation();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectSnapshot | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextProject = useCallback(() => {
    setActiveProjectIdx((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveProjectIdx((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
  }, []);

  const handleInteraction = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  }, []);

  // 5-second automatic carousel progression (paused on interaction)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextProject();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextProject]);

  const currentProject = FEATURED_PROJECTS[activeProjectIdx];

  const handleExploreTrack = (index: number) => {
    setActiveProgramIndex(index);
    const element = document.getElementById("programs");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Touch Swipe Handlers for effortless mobile navigation
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

    // Only swipe if horizontal movement is dominant and > 30px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX < 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
  };

  return (
    <div
      id="projects"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] border-b border-[#101536]/06 select-none overflow-x-clip font-sans text-[#101536] scroll-mt-20"
      onMouseEnter={handleInteraction}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#101536]/08 gap-3">
          <div className="text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
              STUDENT CAPSTONES & REPOSITORIES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] leading-tight font-jakarta">
              WHAT STUDENTS BUILD<span className="text-[#F97316]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs sm:text-sm text-[#5E6675] font-medium max-w-sm text-left sm:text-right hidden sm:block">
              Real projects shipped by student builders that demonstrate industry capability.
            </p>
            {/* Arrows */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  prevProject();
                  handleInteraction();
                }}
                aria-label="Previous project"
                className="w-9 h-9 rounded-xl bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  nextProject();
                  handleInteraction();
                }}
                aria-label="Next project"
                className="w-9 h-9 rounded-xl bg-white border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Selector Pills (01 to 04) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {FEATURED_PROJECTS.map((proj, idx) => {
            const isActive = activeProjectIdx === idx;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProjectIdx(idx);
                  handleInteraction();
                }}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#101536] text-white shadow-md ring-2 ring-[#6366F1]"
                    : "bg-white text-[#5E6675] border border-[#101536]/10 hover:text-[#101536] hover:bg-[#F6F8F9]"
                }`}
              >
                <span className="text-[#F97316] mr-1.5">{proj.number}</span>
                <span>{proj.category}</span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE FEATURED PROJECT SHOWCASE (Full-width dedicated layout) */}
        <div className="bg-white border border-[#101536]/10 rounded-3xl p-6 sm:p-10 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* LEFT 55% — Project Image Snapshot */}
              <div
                onClick={() => setSelectedModalProject(currentProject)}
                className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#0B1028] border border-[#101536]/10 shadow-md cursor-pointer group"
              >
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1028]/80 via-transparent to-transparent" />

                {/* Top Badge: Student Build + Live Metric */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-[11px] font-bold">
                  <span className="text-[#10B981] flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" /> STUDENT BUILD
                  </span>
                  <span className="text-[#F59E0B] flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" /> {currentProject.liveMetric.value}
                  </span>
                </div>

                {/* Bottom Overlay CTA */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-lg bg-[#6366F1] text-white text-xs font-bold uppercase shadow-sm">
                    Inspect Project Specs ↗
                  </span>
                  <span className="text-[11px] text-white/80 font-medium">
                    By {currentProject.studentName}
                  </span>
                </div>
              </div>

              {/* RIGHT 45% — Project Description, Tech Stack & Action */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#F97316]">
                    PROJECT {currentProject.number} / 0{FEATURED_PROJECTS.length}
                  </span>
                  <span className="text-[#101536]/30">•</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold uppercase tracking-wider">
                    {currentProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#101536] mb-3 leading-snug font-jakarta">
                  {currentProject.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-6 font-medium">
                  {currentProject.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6 w-full">
                  <span className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[#FAFBFC] border border-[#101536]/10 text-[11px] font-semibold text-[#101536] shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Student Lead & Actions */}
                <div className="pt-4 border-t border-[#101536]/10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="text-[#5E6675] block text-[10px] font-semibold uppercase">BUILDER LEAD</span>
                    <span className="font-bold text-[#101536]">{currentProject.studentName}</span>{" "}
                    <span className="text-[#5E6675]">({currentProject.studentRole})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedModalProject(currentProject)}
                      className="px-4 py-2.5 rounded-xl bg-[#6366F1] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4F46E5] transition-all shadow-sm cursor-pointer"
                    >
                      View Case Study
                    </button>
                    <button
                      onClick={() => handleExploreTrack(currentProject.programIndex)}
                      className="text-xs font-bold text-[#5E6675] hover:text-[#101536] transition-colors cursor-pointer"
                    >
                      Explore Track →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#101536]/10 overflow-hidden text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAFBFC] hover:bg-[#101536]/10 text-[#101536] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold uppercase">
                  {selectedModalProject.category}
                </span>
                <span className="text-xs font-semibold text-[#5E6675]">STUDENT CASE STUDY</span>
              </div>

              <h3 className="text-2xl font-black text-[#101536] mb-3 font-jakarta">
                {selectedModalProject.title}
              </h3>

              <p className="text-sm text-[#5E6675] leading-relaxed mb-6">
                {selectedModalProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-[#FAFBFC] border border-[#101536]/10">
                  <span className="text-xs font-bold text-[#6366F1] uppercase block mb-1">
                    THE PROBLEM
                  </span>
                  <p className="text-xs text-[#101536] leading-relaxed font-medium">
                    {selectedModalProject.problemStatement}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAFBFC] border border-[#101536]/10">
                  <span className="text-xs font-bold text-[#10B981] uppercase block mb-1">
                    THE SOLUTION
                  </span>
                  <p className="text-xs text-[#101536] leading-relaxed font-medium">
                    {selectedModalProject.solutionOverview}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-xs font-bold text-[#101536] uppercase tracking-wider block mb-2">
                  KEY DELIVERABLES & FEATURES
                </span>
                <div className="space-y-1.5">
                  {selectedModalProject.keyFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-[#5E6675]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6366F1] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#101536]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#101536]">
                  Lead: {selectedModalProject.studentName} ({selectedModalProject.studentRole})
                </span>

                <button
                  onClick={() => {
                    setSelectedModalProject(null);
                    handleExploreTrack(selectedModalProject.programIndex);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] cursor-pointer"
                >
                  Explore Track
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
