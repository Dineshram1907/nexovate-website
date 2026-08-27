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
  CheckCircle2,
} from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import {
  aiMlImage,
  fullStackImage,
  dataScienceImage,
  cloudDevopsImage,
} from "@/assets";

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  programIndex: number;
  description: string;
  technologies: string[];
  image: any;
  liveMetric: { label: string; value: string };
  studentTeam: { name: string; role: string }[];
  problemStatement: string;
  solutionOverview: string;
  keyFeatures: string[];
}

export const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: "ai-prediction",
    number: "01",
    title: "Student Performance Prediction Engine",
    category: "Artificial Intelligence",
    programIndex: 0,
    description:
      "An adaptive machine learning pipeline that analyzes student engagement data, study habits, and assignment scores to accurately forecast academic milestone completion.",
    technologies: ["Python", "PyTorch", "FastAPI", "React", "TailwindCSS"],
    image: aiMlImage,
    liveMetric: { label: "MODEL ACCURACY", value: "91.4% F1" },
    studentTeam: [
      { name: "Priya Sharma", role: "AI Student Lead" },
      { name: "Rahul Verma", role: "Data Engineer" },
    ],
    problemStatement:
      "Educators often identify struggling students too late in the semester, when remedial intervention is difficult.",
    solutionOverview:
      "Built an early-warning prediction system trained on historical cohort datasets to flag learning gaps by Week 3.",
    keyFeatures: [
      "Real-time risk scoring matrix",
      "Automated study resource recommendations",
      "Interactive mentor feedback dashboard",
    ],
  },
  {
    id: "fullstack-saas",
    number: "02",
    title: "Collaborative Workspace Platform",
    category: "Full Stack Engineering",
    programIndex: 1,
    description:
      "A real-time workspace application featuring concurrent document editing, kanban project tracking, and automated task distribution for student group projects.",
    technologies: ["TypeScript", "Next.js", "Node.js", "Socket.io", "PostgreSQL"],
    image: fullStackImage,
    liveMetric: { label: "LATENCY", value: "<45ms WebSocket" },
    studentTeam: [
      { name: "Arjun Mehta", role: "Full Stack Developer" },
      { name: "Harini R", role: "UI/UX Designer" },
    ],
    problemStatement:
      "Student project teams lack unified tools that combine real-time canvas collaboration with structured task management.",
    solutionOverview:
      "Engineered an all-in-one web hub supporting multi-user live cursors, markdown notes, and progress analytics.",
    keyFeatures: [
      "Operational Transformation live editing",
      "Kanban board with drag-and-drop",
      "Exportable project summary reports",
    ],
  },
  {
    id: "data-analytics",
    number: "03",
    title: "Urban Environmental Data Dashboard",
    category: "Data Science & Analytics",
    programIndex: 2,
    description:
      "A sensor data aggregator visualizing air quality metrics, temperature variances, and traffic congestion patterns across metropolitan micro-zones.",
    technologies: ["Python", "Pandas", "Plotly", "Streamlit", "Docker"],
    image: dataScienceImage,
    liveMetric: { label: "DATA STREAM", value: "10K req/sec" },
    studentTeam: [
      { name: "Vishal Kumar", role: "Data Scientist" },
      { name: "Sneha Patel", role: "Backend Developer" },
    ],
    problemStatement:
      "City environmental data is fragmented across municipal portals and difficult for citizens to interpret.",
    solutionOverview:
      "Aggregated public API streams into a responsive geospatial heatmap dashboard with predictive air quality alerts.",
    keyFeatures: [
      "Interactive GIS spatial mapping",
      "Time-series forecasting models",
      "Automated daily summary digests",
    ],
  },
  {
    id: "cloud-ci-cd",
    number: "04",
    title: "Automated Cloud Deployment Pipeline",
    category: "Cloud & DevOps Workflows",
    programIndex: 3,
    description:
      "A zero-downtime CI/CD deployment blueprint automating container orchestration, health monitoring, and rollback strategies on Google Cloud Platform.",
    technologies: ["Docker", "Kubernetes", "GCP", "GitHub Actions", "Terraform"],
    image: cloudDevopsImage,
    liveMetric: { label: "DEPLOYMENT TIME", value: "1.8 mins" },
    studentTeam: [
      { name: "Kiran Dev", role: "DevOps Engineer" },
      { name: "Aman Gupta", role: "Cloud Architect" },
    ],
    problemStatement:
      "Manual deployment workflows slow down product iterations and introduce environment configuration drift.",
    solutionOverview:
      "Implemented automated Infrastructure-as-Code scripts enabling continuous integration and containerized deployments.",
    keyFeatures: [
      "Declarative Terraform infrastructure",
      "Blue-Green deployment strategy",
      "Prometheus & Grafana telemetry",
    ],
  },
];

export const Projects: React.FC = () => {
  const { setActiveProgramIndex } = usePresentation();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);

  const AUTOPLAY_DURATION = 6000;
  const PROGRESS_INTERVAL = 50;
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
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
  }, []);

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
    const element = document.getElementById("programs");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="relative w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-notebook-grid text-[#101536] select-none border-b border-[#101536]/06 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#101536]/08 gap-2">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
              STUDENT CREATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#101536] leading-tight font-jakarta">
              LEARN BY BUILDING<span className="text-[#F97316]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5E6675] font-medium">
            Turn your ideas into real projects that make an impact.
          </p>
        </div>

        {/* FEATURED PROJECT SLIDE */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: cubicEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
            >
              {/* LEFT 58% — Interactive Project Showcase Card */}
              <div className="lg:col-span-7 relative group cursor-pointer" onClick={() => setSelectedModalProject(currentProject)}>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-[#0B1028] border border-[#101536]/15 overflow-hidden shadow-xl">
                  <motion.div
                    key={currentProject.id + "-img"}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: cubicEase }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1028] via-[#0B1028]/35 to-transparent" />
                  </motion.div>

                  {/* Top Header Bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs text-white/90">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[#10B981] font-bold">STUDENT BUILD // REPO v1.4</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#F59E0B]">
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>{currentProject.liveMetric.label}: {currentProject.liveMetric.value}</span>
                    </div>
                  </div>

                  {/* Bottom Application UI Graphic Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#F59E0B] uppercase tracking-wider block font-bold">
                        PROJECT CAPSTONE OVERVIEW
                      </span>
                      <p className="text-xs text-white font-bold truncate mt-0.5 font-jakarta">
                        {currentProject.title}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-lg bg-[#6366F1] text-white text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#4F46E5] transition-colors shrink-0">
                      CLICK TO INSPECT
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT 42% — High Contrast Project Details */}
              <div className="lg:col-span-5 flex flex-col items-start text-left">
                {/* Project Category & Number */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#F97316]">
                    {currentProject.number} / 0{DEMO_PROJECTS.length}
                  </span>
                  <span className="text-[#101536]/30">•</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold tracking-wider uppercase">
                    {currentProject.category}
                  </span>
                </div>

                {/* High Contrast Project Title (Dark Navy #101536) */}
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#101536] mb-3 leading-snug font-jakarta">
                  {currentProject.title}
                </h3>

                {/* High Contrast Description (#5E6675) */}
                <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-4 font-medium">
                  {currentProject.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#101536]/15 text-[#101536] text-[11px] font-bold shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions: View Project Modal & Track Link */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#101536]/10 w-full">
                  <button
                    onClick={() => setSelectedModalProject(currentProject)}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={() => handleExploreTrack(currentProject.programIndex)}
                    className="text-xs font-bold text-[#6366F1] hover:text-[#4F46E5] transition-colors cursor-pointer"
                  >
                    Explore Track →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM: Project Selector & Controls */}
        <div className="mt-8 pt-4 border-t border-[#101536]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {DEMO_PROJECTS.map((proj, idx) => {
              const isActive = activeProjectIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelectProject(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all duration-200 focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-[#6366F1] text-white shadow-sm ring-1 ring-[#6366F1]"
                      : "bg-white text-[#5E6675] border border-[#101536]/10 hover:text-[#101536]"
                  }`}
                >
                  {proj.number} {proj.category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                prevProject();
                handleInteraction();
              }}
              className="p-2 rounded-xl bg-white border border-[#101536]/10 text-[#101536] hover:bg-[#6366F1] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                nextProject();
                handleInteraction();
              }}
              className="p-2 rounded-xl bg-white border border-[#101536]/10 text-[#101536] hover:bg-[#6366F1] hover:text-white transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* STUDENT PROJECT CASE STUDY MODAL */}
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
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#101536]/10 overflow-hidden"
            >
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#FAFBFC] hover:bg-[#101536]/10 text-[#101536] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold uppercase">
                  {selectedModalProject.category}
                </span>
                <span className="text-xs font-semibold text-[#5E6675]">CASE STUDY</span>
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
                  KEY FEATURES
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
                <div className="flex items-center gap-2">
                  {selectedModalProject.studentTeam.map((member) => (
                    <span key={member.name} className="text-xs font-bold text-[#101536]">
                      {member.name} ({member.role})
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedModalProject(null);
                    handleExploreTrack(selectedModalProject.programIndex);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5]"
                >
                  Explore Track
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
