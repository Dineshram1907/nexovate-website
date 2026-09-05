import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Quote } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";
import { premiumEase } from "@/lib/motion";

export const StudentReviews: React.FC = () => {
  const [activeReviewIdx, setActiveReviewIdx] = useState<number>(0);

  const reviews = [
    {
      id: "review-01",
      name: "Priya Sundaram",
      role: "AI / ML Track Graduate",
      company: "Associate ML Engineer at Cognizant",
      quote:
        "Before Nexovate, I had watched dozens of tutorials on neural networks without ever knowing how to build one for real. My mentor reviewed my Git pull requests every week, helping me debug transformer architectures until my models ran smoothly in production.",
      image: IMAGE_REGISTRY.reviews.priya,
      capstone: "Edge Computer Vision & Real-Time Defect Detection",
    },
    {
      id: "review-02",
      name: "Arjun Verma",
      role: "Full Stack Engineering Track",
      company: "Software Engineer at Tech Mahindra",
      quote:
        "The contrast with normal college lectures is night and day. You don't memorize slides — you build full-stack web applications with React, Node.js, and PostgreSQL. When interviewers asked about system design, I walked them through my live deployed project.",
      image: IMAGE_REGISTRY.reviews.arjun,
      capstone: "Real-Time Microservices Financial Ledger",
    },
    {
      id: "review-03",
      name: "Rahul Nambiar",
      role: "Data Science & Analytics Track",
      company: "Data Analyst at Fractal Analytics",
      quote:
        "Working with messy real-world datasets and creating production Tableau pipelines gave me the confidence to ace my technical interviews. Nexovate taught me not just to write Python scripts, but to communicate actionable business insights.",
      image: IMAGE_REGISTRY.reviews.rahul,
      capstone: "Multi-Echelon Demand Forecasting Pipeline",
    },
    {
      id: "review-04",
      name: "Harini Balaji",
      role: "Cloud Architecture & DevOps Track",
      company: "Cloud Operations Engineer at Infosys",
      quote:
        "Deploying multi-cluster Kubernetes apps with automated Terraform pipelines was hands-on and rigorous. Having a mentor who works as an SRE gave me insights that you simply cannot get from textbook documentation.",
      image: IMAGE_REGISTRY.reviews.harini,
      capstone: "Zero-Downtime Multi-Region Kubernetes Cluster",
    },
  ];

  const currentReview = reviews[activeReviewIdx];

  return (
    <section
      id="student-reviews"
      className="relative w-full py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2] border-b border-[#0F1535]/06 select-none font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-[#0F1535]/08 gap-4">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                STUDENT STORIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F1535] leading-tight font-jakarta">
              BUILT BY STUDENTS. <br />
              <span className="text-[#119E9D]">PROVEN IN PRACTICE</span>
              <span className="text-[#EFAF32]">.</span>
            </h2>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() =>
                setActiveReviewIdx((prev) => (prev > 0 ? prev - 1 : reviews.length - 1))
              }
              aria-label="Previous review"
              className="w-10 h-10 rounded-xl bg-white border border-[#0F1535]/12 flex items-center justify-center text-[#0F1535] hover:bg-[#0F1535] hover:text-white transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-mono font-bold text-[#576071] px-2">
              0{activeReviewIdx + 1} / 0{reviews.length}
            </div>
            <button
              onClick={() =>
                setActiveReviewIdx((prev) => (prev < reviews.length - 1 ? prev + 1 : 0))
              }
              aria-label="Next review"
              className="w-10 h-10 rounded-xl bg-white border border-[#0F1535]/12 flex items-center justify-center text-[#0F1535] hover:bg-[#0F1535] hover:text-white transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Single-Quote Experience (No Star Ratings, Large Typography) */}
        <div className="bg-white border border-[#0F1535]/08 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl text-left overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: premiumEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* LEFT: Authentic Portrait & Attribution */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative w-40 sm:w-48 aspect-square rounded-2xl overflow-hidden shadow-md border border-[#0F1535]/10 mb-5 bg-[#0F1535]">
                  <img
                    src={currentReview.image}
                    alt={currentReview.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#0F1535] font-jakarta mb-1">
                  {currentReview.name}
                </h3>
                <p className="text-xs font-semibold text-[#119E9D] mb-1">
                  {currentReview.role}
                </p>
                <p className="text-xs text-[#576071] font-normal">
                  {currentReview.company}
                </p>
              </div>

              {/* RIGHT: Large Quotation Typography & Verifiable Outcome */}
              <div className="lg:col-span-8 flex flex-col items-start">
                <Quote className="w-10 h-10 text-[#119E9D]/20 mb-3" />

                <blockquote className="text-lg sm:text-xl lg:text-2xl text-[#0F1535] font-medium leading-relaxed mb-8 font-sans">
                  "{currentReview.quote}"
                </blockquote>

                {/* Verified Capstone Tag */}
                <div className="w-full p-4 rounded-xl bg-[#F7F6F2] border border-[#0F1535]/06 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#119E9D] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#576071] uppercase tracking-wider block text-[10px]">
                      VERIFIED CAPSTONE ARTIFACT
                    </span>
                    <span className="font-semibold text-[#0F1535]">
                      {currentReview.capstone}
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

export default StudentReviews;
