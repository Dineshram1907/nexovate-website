import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { fullStackImage, dataScienceImage, heroCinematicPortal } from "@/assets";
import { MaskedLineReveal } from "@/components/motion/EditorialMotion";

export const EditorialProjects: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const featImageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const secCardY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-12 sm:py-16 md:py-[var(--section-space)] px-4 sm:px-6 md:px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden border-b border-[#0F1535]/08 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full text-left">
        {/* Header */}
        <div className="flex flex-row items-end justify-between mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-[#0F1535]/10 gap-4">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#119E9D] uppercase block mb-1 sm:mb-2">
              STUDENT ARTIFACTS
            </span>
            <MaskedLineReveal
              lines={["Ideas become real."]}
              className="text-[clamp(26px,5.5vw,52px)] font-black tracking-[-0.035em] leading-tight text-[#0F1535] font-jakarta"
              tag="h2"
            />
          </div>

          <button
            onClick={() => openEnquiryModal("Inquiry: Student Capstone Portfolio")}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-[#119E9D] hover:text-[#0F1535] uppercase tracking-wider transition-colors cursor-pointer py-1 shrink-0"
          >
            <span>Inquire All</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#EFAF32]" />
          </button>
        </div>

        {/* ── MOBILE HORIZONTAL SNAP CAROUSEL (<= 768px) ── */}
        <div className="block md:hidden w-full">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 pt-1 -mx-4 px-4">
            {/* Card 1: Clinical AI */}
            <article className="snap-start shrink-0 w-[86vw] max-w-[340px] bg-white border border-[#0F1535]/08 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-[#0F1535] border border-[#0F1535]/10">
                  <img
                    src={heroCinematicPortal}
                    alt="AI Predictive Health Diagnostics preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase">
                    50ms Inference
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#119E9D] uppercase block mb-1">
                  AI & HEALTHCARE
                </span>
                <h3 className="text-base font-bold text-[#0F1535] font-jakarta mb-1.5 leading-snug">
                  AI Predictive Clinical Diagnostics
                </h3>
                <p className="text-xs text-[#576071] leading-relaxed mb-3 line-clamp-3">
                  Deep learning pipeline processing ECG waveforms to predict acute anomalies with 94.2% precision.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {["PyTorch", "FastAPI", "React", "Docker"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#F7F6F2] text-[#0F1535] text-[10px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#0F1535]/08 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#576071]">CAPSTONE 01</span>
                <button
                  onClick={() => openEnquiryModal("Inquiry: AI Predictive Clinical Diagnostics")}
                  className="text-xs font-bold text-[#119E9D] flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EFAF32]" />
                </button>
              </div>
            </article>

            {/* Card 2: Cloud Workspace */}
            <article className="snap-start shrink-0 w-[86vw] max-w-[340px] bg-white border border-[#0F1535]/08 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-[#0F1535] border border-[#0F1535]/10">
                  <img
                    src={fullStackImage}
                    alt="Distributed Cloud Workspace"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase">
                    Real-Time WebSockets
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#0EA5E9] uppercase block mb-1">
                  DISTRIBUTED SYSTEMS
                </span>
                <h3 className="text-base font-bold text-[#0F1535] font-jakarta mb-1.5 leading-snug">
                  Cloud Collaboration Suite
                </h3>
                <p className="text-xs text-[#576071] leading-relaxed mb-3 line-clamp-3">
                  Multi-user workspace with operational transformation and container sandboxes.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {["React 19", "WebSockets", "Redis", "Node.js"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#F7F6F2] text-[#0F1535] text-[10px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#0F1535]/08 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#576071]">CAPSTONE 02</span>
                <button
                  onClick={() => openEnquiryModal("Inquiry: Cloud Collaboration Suite")}
                  className="text-xs font-bold text-[#0EA5E9] flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EFAF32]" />
                </button>
              </div>
            </article>

            {/* Card 3: Supply Chain */}
            <article className="snap-start shrink-0 w-[86vw] max-w-[340px] bg-white border border-[#0F1535]/08 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-[#0F1535] border border-[#0F1535]/10">
                  <img
                    src={dataScienceImage}
                    alt="Supply Chain Demand Forecasting"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[9px] font-mono font-bold uppercase">
                    5 Distribution Hubs
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#EFAF32] uppercase block mb-1">
                  DATA SCIENCE
                </span>
                <h3 className="text-base font-bold text-[#0F1535] font-jakarta mb-1.5 leading-snug">
                  Supply Chain Forecasting
                </h3>
                <p className="text-xs text-[#576071] leading-relaxed mb-3 line-clamp-3">
                  Automated data intelligence engine predicting retail logistics latencies and automated replenishment.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {["Python", "BigQuery", "Tableau", "SQL"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#F7F6F2] text-[#0F1535] text-[10px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#0F1535]/08 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#576071]">CAPSTONE 03</span>
                <button
                  onClick={() => openEnquiryModal("Inquiry: Supply Chain Forecasting")}
                  className="text-xs font-bold text-[#EFAF32] flex items-center gap-1"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EFAF32]" />
                </button>
              </div>
            </article>
          </div>

          <div className="flex items-center justify-between pt-2 px-1 text-[10px] font-mono text-[#576071]">
            <span>← SWIPE TO VIEW CAPSTONES →</span>
            <span>3 ARTIFACTS</span>
          </div>
        </div>

        {/* ── DESKTOP COMPACT ASYMMETRIC COMPOSITION (>= 768px) ── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-8 items-start mb-8">
            {/* 1. LARGE FEATURED HERO PROJECT (8 COLS) */}
            <div className="col-span-8 flex flex-col justify-between p-8 lg:p-10 rounded-3xl bg-white border border-[#0F1535]/08 shadow-xl relative overflow-hidden group">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-[#0F1535] border border-[#0F1535]/10">
                <motion.img
                  style={{ y: featImageY }}
                  src={heroCinematicPortal}
                  alt="AI Predictive Health Diagnostics system preview"
                  className="w-full h-[115%] object-cover -mt-[7%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/90 via-[#0F1535]/20 to-transparent pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase">
                    50ms Inference Latency
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#119E9D] uppercase tracking-wider block mb-1.5">
                  ARTIFICIAL INTELLIGENCE & HEALTHCARE
                </span>
                <h3 className="text-[clamp(20px,3.2vw,28px)] font-black text-[#0F1535] mb-2 font-jakarta leading-snug">
                  AI Predictive Clinical Diagnostics
                </h3>
                <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-5 max-w-2xl">
                  An end-to-end deep learning pipeline processing multi-lead ECG waveforms and electronic health records to predict acute cardiac anomalies with 94.2% precision.
                </p>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#0F1535]/08">
                  <div className="flex flex-wrap gap-1.5">
                    {["PyTorch", "FastAPI", "React", "PostgreSQL", "Docker", "AWS"].map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#F7F6F2] border border-[#0F1535]/08 text-xs font-semibold text-[#0F1535]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openEnquiryModal("Inquiry: AI Predictive Clinical Diagnostics")}
                    className="min-h-[42px] inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1535] hover:text-[#119E9D] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Inquire Capstone</span>
                    <ArrowUpRight className="w-4 h-4 text-[#EFAF32]" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. SUPPORTING VERTICAL PROJECT (4 COLS) */}
            <motion.div
              style={{ y: secCardY }}
              className="col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#0F1535]/08 shadow-xl relative overflow-hidden group w-full"
            >
              <div>
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-[#0F1535] border border-[#0F1535]/10">
                  <img
                    src={fullStackImage}
                    alt="Distributed Cloud Workspace"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/85 via-transparent to-transparent pointer-events-none" />
                </div>

                <span className="text-xs font-mono font-bold text-[#0EA5E9] uppercase tracking-wider block mb-1">
                  DISTRIBUTED SYSTEMS
                </span>
                <h3 className="text-lg font-bold text-[#0F1535] mb-2 font-jakarta">
                  Cloud Collaboration Suite
                </h3>
                <p className="text-xs text-[#576071] leading-relaxed mb-5">
                  Real-time multi-user document and code workspace with operational transformation and container sandboxes.
                </p>
              </div>

              <div className="pt-4 border-t border-[#0F1535]/08 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#576071]">React 19 • WebSockets • Redis</span>
                <ArrowUpRight className="w-4 h-4 text-[#EFAF32]" />
              </div>
            </motion.div>
          </div>

          {/* 3. WIDE SUPPORTING THIRD PROJECT */}
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-white border border-[#0F1535]/08 shadow-lg flex flex-row items-center gap-6 text-left">
            <div className="w-1/4 aspect-[16/10] rounded-2xl overflow-hidden bg-[#0F1535] border border-[#0F1535]/10 shrink-0">
              <img
                src={dataScienceImage}
                alt="Enterprise Supply Chain Demand Forecasting"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-3/4">
              <span className="text-xs font-mono font-bold text-[#EFAF32] uppercase tracking-wider block mb-1">
                DATA SCIENCE & LOGISTICS
              </span>
              <h3 className="text-lg font-bold text-[#0F1535] mb-1 font-jakarta">
                Enterprise Supply Chain Demand Forecasting
              </h3>
              <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-3 font-normal max-w-[50ch]">
                Automated data intelligence engine predicting retail logistics latencies and automated warehouse inventory replenishment across 5 distribution hubs.
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0F1535]">
                <Code2 className="w-4 h-4 text-[#119E9D] shrink-0" />
                <span>Python • BigQuery • Tableau • Time Series Forecasters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialProjects;


