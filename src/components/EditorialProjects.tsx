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
      className="relative w-full py-[var(--section-space)] px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden border-b border-[#0F1535]/08 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full text-left">
        {/* Masked Line Reveal */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <MaskedLineReveal
            lines={["Ideas become real."]}
            className="text-[clamp(28px,6vw,56px)] font-black tracking-[-0.035em] leading-tight text-[#0F1535] font-jakarta mb-4"
            tag="h2"
          />
          <p className="text-sm sm:text-base md:text-lg text-[#576071] font-normal leading-relaxed max-w-[50ch]">
            Students do not just memorize concepts. They design, code, and deploy real production software systems.
          </p>
        </div>

        {/* ── ASYMMETRIC EDITORIAL PORTFOLIO COMPOSITION WITH PARALLAX ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 sm:mb-12 items-start">
          {/* 1. LARGE FEATURED HERO PROJECT (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#0F1535]/08 shadow-xl relative overflow-hidden group">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 sm:mb-8 bg-[#0F1535] border border-[#0F1535]/10">
              <motion.img
                style={{ y: featImageY }}
                src={heroCinematicPortal}
                alt="AI Predictive Health Diagnostics system preview"
                className="w-full h-[115%] object-cover -mt-[7%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/90 via-[#0F1535]/20 to-transparent pointer-events-none" />

              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase">
                  50ms Inference Latency
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#119E9D] uppercase tracking-wider block mb-2">
                ARTIFICIAL INTELLIGENCE & HEALTHCARE
              </span>
              <h3 className="text-[clamp(20px,4.5vw,30px)] font-black text-[#0F1535] mb-3 font-jakarta leading-snug">
                AI Predictive Clinical Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-6 max-w-2xl">
                An end-to-end deep learning pipeline processing multi-lead ECG waveforms and electronic health records to predict acute cardiac anomalies with 94.2% precision.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[#0F1535]/08">
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
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1535] hover:text-[#119E9D] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Inquire Capstone</span>
                  <ArrowUpRight className="w-4 h-4 text-[#EFAF32]" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. SUPPORTING VERTICAL PROJECT (4 COLS) WITH SUBTLE PARALLAX OFFSET */}
          <motion.div
            style={{ y: secCardY }}
            className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-[#0F1535]/08 shadow-xl relative overflow-hidden group w-full"
          >
            <div>
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 sm:mb-6 bg-[#0F1535] border border-[#0F1535]/10">
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
              <h3 className="text-lg sm:text-xl font-bold text-[#0F1535] mb-2 font-jakarta">
                Cloud Collaboration Suite
              </h3>
              <p className="text-xs text-[#576071] leading-relaxed mb-6">
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
        <div className="w-full p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-[#0F1535]/08 shadow-lg flex flex-col md:flex-row items-center gap-6 sm:gap-8 text-left">
          <div className="w-full md:w-1/3 aspect-[16/10] rounded-2xl overflow-hidden bg-[#0F1535] border border-[#0F1535]/10 shrink-0">
            <img
              src={dataScienceImage}
              alt="Enterprise Supply Chain Demand Forecasting"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/3">
            <span className="text-xs font-mono font-bold text-[#EFAF32] uppercase tracking-wider block mb-1">
              DATA SCIENCE & LOGISTICS
            </span>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0F1535] mb-2 font-jakarta">
              Enterprise Supply Chain Demand Forecasting
            </h3>
            <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-4 font-normal max-w-[50ch]">
              Automated data intelligence engine predicting retail logistics latencies and automated warehouse inventory replenishment across 5 distribution hubs.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0F1535]">
              <Code2 className="w-4 h-4 text-[#119E9D] shrink-0" />
              <span>Python • BigQuery • Tableau • Time Series Forecasters</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialProjects;


