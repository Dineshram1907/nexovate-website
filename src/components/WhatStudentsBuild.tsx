import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ExternalLink, Code2 } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";
import { usePresentation } from "@/context/PresentationContext";
import { MotionButton } from "./motion/MotionButton";
import { premiumEase } from "@/lib/motion";

export const WhatStudentsBuild: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  const projects = [
    {
      id: "project-01",
      title: "AI Predictive Health Diagnostics",
      subtitle: "Autonomous Clinical Risk Assessment System",
      description: "A machine learning pipeline processing patient vitals, clinical diagnostic histories, and ECG wave forms to predict cardiovascular anomalies with 94.2% precision.",
      tech: ["PyTorch", "FastAPI", "React", "PostgreSQL", "Docker", "AWS"],
      image: IMAGE_REGISTRY.projects.aiPlatform,
      domain: "Artificial Intelligence",
      impact: "Simulated in 3 clinical trial environments with 50ms inference latency.",
      accent: "#119E9D",
    },
    {
      id: "project-02",
      title: "Distributed Cloud Collaboration Suite",
      subtitle: "Real-Time Multi-User Workspace Platform",
      description: "A collaborative code and document execution workspace built with WebSockets, operational transformation concurrency models, and automated container sandboxes.",
      tech: ["React 19", "TypeScript", "Node.js", "Redis", "Kubernetes", "WebSockets"],
      image: IMAGE_REGISTRY.projects.fullStackWorkspace,
      domain: "Full Stack Engineering",
      impact: "Tested across 1,000 concurrent state sync connections.",
      accent: "#0EA5E9",
    },
    {
      id: "project-03",
      title: "Enterprise Supply Chain Analytics",
      subtitle: "Predictive Demand & Logistics Forecasting",
      description: "An automated data intelligence dashboard analyzing multi-echelon retail shipment nodes, supplier delivery latencies, and predictive warehouse inventory replenishment.",
      tech: ["Python", "Pandas", "BigQuery", "Tableau", "Time Series Models"],
      image: IMAGE_REGISTRY.projects.dataAnalytics,
      domain: "Data Science & Analytics",
      impact: "Simulated 18% inventory hold reduction across 5 retail distribution hubs.",
      accent: "#EFAF32",
    },
  ];

  const currentProject = projects[activeProjectIdx];

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2]/85 border-b border-[#0F1535]/06 select-none overflow-x-clip font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#0F1535]/08 gap-4">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                STUDENT PROJECTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F1535] leading-tight font-jakarta">
              Ideas. Code. <span className="text-[#119E9D]">Impact.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#576071] mt-1.5 font-normal">
              A glimpse of what our students are building and shipping.
            </p>
          </div>

          {/* Project Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() =>
                setActiveProjectIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
              }
              aria-label="Previous Capstone"
              className="w-11 h-11 rounded-full border border-[#0F1535]/15 hover:border-[#119E9D] bg-white flex items-center justify-center text-[#0F1535] transition-all cursor-pointer shadow-2xs"
              data-cursor="pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-bold text-[#576071] tracking-wider px-2">
              <span className="text-[#0F1535]">0{activeProjectIdx + 1}</span> / 0{projects.length}
            </div>
            <button
              onClick={() =>
                setActiveProjectIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
              }
              aria-label="Next Capstone"
              className="w-11 h-11 rounded-full border border-[#0F1535]/15 hover:border-[#119E9D] bg-white flex items-center justify-center text-[#0F1535] transition-all cursor-pointer shadow-2xs"
              data-cursor="pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Project Showcase */}
        <div className="bg-white border border-[#0F1535]/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl text-left overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: premiumEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column — Project Visual & Architecture */}
              <div className="lg:col-span-7 relative">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg bg-[#0F1535] border border-[#0F1535]/15 group">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/90 via-[#0F1535]/20 to-transparent" />

                  {/* Domain Tag */}
                  <div className="absolute top-4 left-4">
                    <span
                      style={{ backgroundColor: currentProject.accent }}
                      className="px-3.5 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-xs"
                    >
                      {currentProject.domain}
                    </span>
                  </div>

                  {/* Live Impact Proof */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold flex items-center justify-between">
                    <span className="max-w-md text-white/90">
                      {currentProject.impact}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-[#EFAF32] uppercase tracking-wider">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Verified Capstone</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column — Project Details & Tech Stack */}
              <div className="lg:col-span-5 flex flex-col items-start justify-between">
                <div>
                  <span
                    style={{ color: currentProject.accent }}
                    className="text-xs font-bold uppercase tracking-widest block mb-2"
                  >
                    {currentProject.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0F1535] mb-4 font-jakarta leading-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-6 font-normal">
                    {currentProject.description}
                  </p>

                  {/* Technologies Used */}
                  <div className="mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F1535] block mb-2.5">
                      PRODUCTION TOOLCHAIN
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg bg-[#F7F6F2] border border-[#0F1535]/10 text-xs font-semibold text-[#0F1535] shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <MotionButton
                  onClick={() => openEnquiryModal(`Capstone Project Inquiry: ${currentProject.title}`)}
                  className="min-h-[46px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F1535] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#119E9D] transition-colors shadow-sm cursor-pointer"
                  data-cursor="pointer"
                >
                  <span>Inquire About This Capstone</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32]" />
                </MotionButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>


      </div>
    </section>
  );
};

export default WhatStudentsBuild;
