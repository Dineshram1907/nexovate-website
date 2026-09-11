import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { priyaAvatar, arjunAvatar, rahulAvatar, hariniAvatar } from "@/assets";
import { MaskedLineReveal } from "@/components/motion/EditorialMotion";
import { premiumEase } from "@/lib/motion";

export const EditorialStories: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const stories = [
    {
      id: "priya",
      name: "Priya Sundaram",
      role: "AI / ML Track Graduate",
      company: "Associate ML Engineer at Cognizant",
      quote:
        "Before Nexovate, I had watched dozens of online tutorials on neural networks without ever understanding how to ship one for real. Having a senior practitioner evaluate my Git pull requests every week gave me the architectural intuition to deploy models into production.",
      image: priyaAvatar,
      capstone: "Edge Computer Vision & Real-Time Defect Detection",
    },
    {
      id: "arjun",
      name: "Arjun Verma",
      role: "Full Stack Engineering Track",
      company: "Software Engineer at Tech Mahindra",
      quote:
        "The difference from traditional university coursework is night and day. You don't memorize slides — you build real distributed web applications with React, Node.js, and PostgreSQL. In my technical interviews, I simply walked the panel through my live deployed system.",
      image: arjunAvatar,
      capstone: "Real-Time Microservices Financial Ledger",
    },
    {
      id: "rahul",
      name: "Rahul Nambiar",
      role: "Data Science Track",
      company: "Data Analyst at Fractal Analytics",
      quote:
        "Working with messy enterprise datasets and building live Tableau and BigQuery pipelines gave me immense confidence. Nexovate taught me not just to write Python scripts, but to extract actionable business insights from distributed data.",
      image: rahulAvatar,
      capstone: "Multi-Echelon Demand Forecasting Pipeline",
    },
    {
      id: "harini",
      name: "Harini Balaji",
      role: "Cloud Architecture Track",
      company: "Cloud Operations Engineer at Infosys",
      quote:
        "Deploying multi-cluster Kubernetes apps with automated Terraform pipelines was challenging and deeply rewarding. Having an active SRE mentor gave me insights that you simply cannot find in textbook documentation.",
      image: hariniAvatar,
      capstone: "Zero-Downtime Multi-Region Kubernetes Cluster",
    },
  ];

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left -> next
        setActiveIdx((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
      } else {
        // swipe right -> prev
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
      }
    }
    setTouchStartX(null);
  };

  const current = stories[activeIdx];

  return (
    <section
      id="stories"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-12 sm:py-16 md:py-[var(--section-space)] px-4 sm:px-6 md:px-[var(--page-padding)] bg-[#F7F6F2] text-[#0F1535] select-none font-sans overflow-hidden border-b border-[#0F1535]/08 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto w-full text-left">
        {/* Header with Minimal Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#0F1535]/08 gap-4">
          <div>
            <MaskedLineReveal
              lines={["Built by students."]}
              className="text-[clamp(28px,6vw,56px)] font-black tracking-[-0.035em] leading-tight text-[#0F1535] font-jakarta"
              tag="h2"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : stories.length - 1))}
              aria-label="Previous story"
              className="w-11 h-11 rounded-full bg-white border border-[#0F1535]/12 flex items-center justify-center text-[#0F1535] hover:bg-[#0F1535] hover:text-white transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-[#576071] px-2 select-none">
              0{activeIdx + 1} / 0{stories.length}
            </span>
            <button
              onClick={() => setActiveIdx((prev) => (prev < stories.length - 1 ? prev + 1 : 0))}
              aria-label="Next story"
              className="w-11 h-11 rounded-full bg-white border border-[#0F1535]/12 flex items-center justify-center text-[#0F1535] hover:bg-[#0F1535] hover:text-white transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Single-Story Feature */}
        <div className="bg-white border border-[#0F1535]/08 rounded-3xl p-6 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: premiumEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column: Portrait with Scale Entrance */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: premiumEase }}
                  className="relative w-36 sm:w-48 aspect-square rounded-2xl overflow-hidden shadow-md border border-[#0F1535]/10 mb-4 sm:mb-6 bg-[#0F1535]"
                >
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0F1535] font-jakarta mb-1">
                  {current.name}
                </h3>
                <p className="text-xs font-semibold text-[#119E9D] mb-1 font-mono">
                  {current.role}
                </p>
                <p className="text-xs text-[#576071] font-normal">
                  {current.company}
                </p>
              </div>

              {/* Right Column: Editorial Quotation & Capstone Context */}
              <div className="lg:col-span-8 flex flex-col items-start">
                <blockquote className="text-base sm:text-xl lg:text-2xl text-[#0F1535] font-normal leading-relaxed mb-6 sm:mb-8 font-sans max-w-[50ch]">
                  "{current.quote}"
                </blockquote>

                <div className="w-full p-4 rounded-xl bg-[#F7F6F2] border border-[#0F1535]/06 flex items-start sm:items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#119E9D] shrink-0 mt-0.5 sm:mt-0" />
                  <div className="text-xs">
                    <span className="font-mono font-bold text-[#576071] uppercase text-[10px] block">
                      VERIFIED CAPSTONE ARTIFACT
                    </span>
                    <span className="font-semibold text-[#0F1535] block sm:inline">
                      {current.capstone}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EditorialStories;


