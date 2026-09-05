import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Globe,
  CheckCircle2,
  X,
  BookOpen,
  Award,
  Layers,
} from "lucide-react";
import { COURSES_DATA, Course } from "@/constants/coursesData";
import { usePresentation } from "@/context/PresentationContext";
import { SEO } from "@/components/SEO";
import { MotionCard, MotionButton } from "@/components/motion";
import { pageTransitionVariants, premiumEase } from "@/lib/motion";

export const Courses: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = [
    { label: "All Tracks", key: "ALL" },
    { label: "Technology", key: "Technology" },
    { label: "Core Engineering", key: "Core Engineering" },
    { label: "Data & AI", key: "Data & AI" },
    { label: "Design", key: "Design" },
    { label: "Business", key: "Business" },
    { label: "Career", key: "Career" },
  ];

  const filteredCourses =
    selectedCategory === "ALL"
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full min-h-screen bg-[#FAFBFC] text-[#101536] select-none font-sans overflow-x-clip"
    >
      <SEO
        title="Nexovate Courses — Practical Skills & Career Programs"
        description="Explore 22 practitioner-led tracks across AI & Machine Learning, Full Stack Engineering, AutoCAD, Embedded Systems, Data Science, and UI/UX Design."
      />

      {/* 1. EDITORIAL HERO HEADER */}
      <section className="relative pt-20 sm:pt-28 pb-14 px-4 sm:px-6 lg:px-12 border-b border-[#101536]/06 bg-notebook-grid text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="text-xs font-bold tracking-wider text-[#6366F1] uppercase">
                CURATED LEARNING PATHWAYS
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black tracking-tight text-[#101536] leading-[1.04] mb-6 font-jakarta">
              FIND A SKILL <br />
              <span className="text-[#6366F1]">WORTH BUILDING</span>
              <span className="text-[#F97316]">.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#5E6675] font-normal leading-relaxed max-w-2xl mb-8">
              Immersive, practitioner-led engineering, core tech, and design tracks built to take you from fundamentals to shipping verified production capstones.
            </p>

            {/* CATEGORY FILTER PILLS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`min-h-[42px] px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#101536] text-white shadow-md ring-2 ring-[#6366F1]"
                        : "bg-white text-[#5E6675] border border-[#101536]/10 hover:text-[#101536] hover:bg-[#F6F8F9]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM COURSE CATALOG GRID */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-10 pb-3 border-b border-[#101536]/08">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5E6675]">
              SHOWING {filteredCourses.length} ACTIVE CURRICULUM TRACKS
            </span>
            <span className="text-xs font-semibold text-[#6366F1]">
              ALL TRACKS INCLUDE PRACTITIONER REVIEWS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <MotionCard
                key={course.id}
                className="p-6 bg-white border border-[#101536]/08 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#6366F1]/30 transition-all flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Card Image Frame */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-[#101536] border border-[#101536]/10">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101536]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                        {course.category}
                      </span>
                      {course.isOnlineAvailable && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          <span>ONLINE</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider">
                      {course.duration} • {course.mode}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-[#6366F1] text-sm">
                        ₹{course.price.toLocaleString("en-IN")}
                      </span>
                      {course.originalPrice && (
                        <span className="text-[10px] text-[#5E6675]/60 line-through">
                          ₹{course.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-[#101536] mb-2 font-jakarta leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#5E6675] leading-relaxed mb-5 font-normal line-clamp-3">
                    {course.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {course.skills.slice(0, 3).map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 rounded-md bg-[#FAFBFC] border border-[#101536]/08 text-[10px] font-semibold text-[#5E6675]"
                      >
                        {sk}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold text-[#6366F1]">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Explore Action Button */}
                <button
                  onClick={() => setActiveCourseModal(course)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FAFBFC] hover:bg-[#101536] text-[#101536] hover:text-white border border-[#101536]/10 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Explore Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DETAILED COURSE MODAL DIALOG */}
      <AnimatePresence>
        {activeCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: premiumEase }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#101536]/15 text-left my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCourseModal(null)}
                aria-label="Close course details"
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#FAFBFC] border border-[#101536]/10 flex items-center justify-center text-[#101536] hover:bg-[#101536] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-[10px] font-bold uppercase tracking-wider">
                  {activeCourseModal.category}
                </span>
                {activeCourseModal.isOnlineAvailable && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>ONLINE AVAILABLE</span>
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#101536] mb-3 font-jakarta">
                {activeCourseModal.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed mb-6 font-normal">
                {activeCourseModal.overview}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAFBFC] border border-[#101536]/08 mb-6 text-xs">
                <div>
                  <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">DURATION</span>
                  <span className="font-bold text-[#101536]">{activeCourseModal.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">MODE</span>
                  <span className="font-bold text-[#101536]">{activeCourseModal.mode}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">LEVEL</span>
                  <span className="font-bold text-[#101536]">{activeCourseModal.level}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">TUITION</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-[#6366F1]">₹{activeCourseModal.price.toLocaleString("en-IN")}</span>
                    {activeCourseModal.originalPrice && (
                      <span className="text-[10px] text-[#5E6675]/60 line-through">
                        ₹{activeCourseModal.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Capabilities */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-2">
                  SKILLS & TOOLS YOU'LL MASTER
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCourseModal.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl bg-[#FAFBFC] border border-[#101536]/10 text-[#101536] text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Learning Outcomes */}
              <div className="mb-8">
                <span className="text-[11px] font-bold text-[#101536] uppercase tracking-wider block mb-2">
                  VERIFIED LEARNING OUTCOMES
                </span>
                <div className="space-y-2">
                  {activeCourseModal.outcomes.map((out) => (
                    <div key={out} className="flex items-center gap-2 text-xs text-[#101536] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#101536]/10">
                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5E6675] hover:text-[#101536] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <MotionButton
                  onClick={() => {
                    const title = activeCourseModal.title;
                    setActiveCourseModal(null);
                    openEnquiryModal(title);
                  }}
                  className="min-h-[46px] px-6 py-3 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </MotionButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Courses;
