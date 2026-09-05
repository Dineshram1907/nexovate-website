import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { aiMlImage, fullStackImage, dataScienceImage, cloudDevopsImage } from "@/assets";
import { MaskedLineReveal } from "@/components/motion/EditorialMotion";
import { premiumEase } from "@/lib/motion";

interface ProgramTrack {
  id: string;
  num: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  tools: string[];
}

export const EditorialPrograms: React.FC = () => {
  const { enquireProgram } = usePresentation();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const programs: ProgramTrack[] = [
    {
      id: "ai-ml",
      num: "01",
      category: "ARTIFICIAL INTELLIGENCE",
      title: "AI & Machine Learning Systems",
      tagline: "From Transformer Mathematics to Production Inference",
      description:
        "Build and fine-tune large language models, computer vision pipelines, and deep neural networks with PyTorch, FastAPI, and GPU cloud infrastructure.",
      duration: "12 Weeks • 120+ Hours",
      level: "Intermediate to Advanced",
      price: "₹18,500",
      image: aiMlImage,
      tools: ["PyTorch", "HuggingFace", "FastAPI", "Docker", "CUDA", "Weights & Biases"],
    },
    {
      id: "fullstack",
      num: "02",
      category: "CLOUD ARCHITECTURE",
      title: "Full Stack & Distributed Systems",
      tagline: "Microservices, WebSockets & Distributed Backends",
      description:
        "Architect real-time concurrent web applications with React 19, TypeScript, Node.js, Redis, PostgreSQL, and automated CI/CD container clusters.",
      duration: "14 Weeks • 140+ Hours",
      level: "All Engineering Cohorts",
      price: "₹16,500",
      image: fullStackImage,
      tools: ["React 19", "TypeScript", "Node.js", "Redis", "PostgreSQL", "Kubernetes"],
    },
    {
      id: "data-science",
      num: "03",
      category: "DATA INTELLIGENCE",
      title: "Data Science & Applied Analytics",
      tagline: "Predictive Modeling & Enterprise Intelligence",
      description:
        "Master high-throughput exploratory data analysis, statistical econometric modeling, BigQuery pipelines, and executive dashboards.",
      duration: "10 Weeks • 100+ Hours",
      level: "Beginner to Intermediate",
      price: "₹14,500",
      image: dataScienceImage,
      tools: ["Python", "Pandas", "Scikit-Learn", "BigQuery", "Tableau", "SQL"],
    },
    {
      id: "cloud-devops",
      num: "04",
      category: "INFRASTRUCTURE",
      title: "Cloud Infrastructure & DevOps",
      tagline: "Terraform, Kubernetes & Zero-Downtime Releases",
      description:
        "Design multi-region cloud topographies with declarative infrastructure-as-code, Prometheus telemetry, and automated Kubernetes orchestration.",
      duration: "12 Weeks • 120+ Hours",
      level: "Intermediate",
      price: "₹17,500",
      image: cloudDevopsImage,
      tools: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"],
    },
  ];

  const current = programs[activeIdx];

  return (
    <section
      ref={containerRef}
      id="programs"
      className="relative w-full py-[var(--section-space)] px-[var(--page-padding)] bg-[#0F1535] text-white select-none font-sans overflow-hidden scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header with Masked Line Reveal */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10 gap-4 text-left">
          <div>
            <MaskedLineReveal
              lines={["Curriculum Tracks."]}
              className="text-[clamp(28px,6vw,56px)] font-black tracking-[-0.035em] leading-tight text-white font-jakarta"
              tag="h2"
            />
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#119E9D] hover:text-white uppercase tracking-wider transition-colors cursor-pointer py-2 min-h-[44px]"
          >
            <span>View All Tracks</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32]" />
          </Link>
        </div>

        {/* Large-Scale Interactive Program Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-12 sm:mb-16">
          {/* LEFT: Cinematic Dynamic Visual Frame with Parallax */}
          <div className="lg:col-span-7 w-full">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl bg-[#090D24] border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: premiumEase }}
                  className="w-full h-full relative overflow-hidden"
                >
                  <motion.img
                    style={{ y: imageParallaxY }}
                    src={current.image}
                    alt={current.title}
                    className="w-full h-[115%] object-cover -mt-[7%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/95 via-[#0F1535]/20 to-transparent" />

                  {/* Badges on Visual */}
                  <div className="absolute top-4 sm:top-5 left-4 sm:left-5 flex items-center gap-2">
                    <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10">
                      {current.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between text-xs text-white/80">
                    <span className="font-semibold">{current.level}</span>
                    <span className="font-mono text-[#EFAF32]">{current.duration}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Program Detail & Direct Actions */}
          <div className="lg:col-span-5 flex flex-col items-start text-left w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: premiumEase }}
                className="w-full"
              >
                <span className="text-xs font-mono font-bold text-[#EFAF32] uppercase tracking-wider block mb-2">
                  {current.tagline}
                </span>

                <h3 className="text-[clamp(22px,4.8vw,36px)] font-black text-white mb-3 sm:mb-4 font-jakarta leading-snug">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-6 font-normal max-w-[48ch]">
                  {current.description}
                </p>

                {/* Production Toolchain Chips */}
                <div className="mb-6 sm:mb-8">
                  <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest block mb-2">
                    PRODUCTION TOOLCHAIN
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md bg-white/08 border border-white/10 text-white text-[11px] font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10 w-full">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-white/50 uppercase block">
                      TUITION
                    </span>
                    <span className="text-xl font-black text-white font-jakarta">
                      {current.price}
                    </span>
                  </div>

                  <button
                    onClick={() => enquireProgram(current.title, activeIdx)}
                    className="min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-[#0F1535] hover:bg-[#119E9D] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer group active:scale-95"
                  >
                    <span>Enquire For Track</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Clean Program Index Switcher (>= 48px touch targets on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {programs.map((prog, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={prog.id}
                onClick={() => setActiveIdx(idx)}
                className={`min-h-[64px] sm:min-h-[72px] p-4 sm:p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/12 border-[#119E9D] text-white shadow-md ring-1 ring-[#119E9D]"
                    : "bg-white/04 border-white/08 text-white/60 hover:bg-white/08 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="text-xs font-mono font-bold text-[#EFAF32] block mb-1 sm:mb-2">
                  {prog.num}
                </span>
                <h4 className="text-sm font-bold text-white font-jakarta mb-1">
                  {prog.title}
                </h4>
                <span className="text-xs text-white/50 block">
                  {prog.duration}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EditorialPrograms;


