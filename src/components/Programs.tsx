import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Clock, Globe } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { COURSES_DATA, Course } from "@/constants/coursesData";
import { MotionButton } from "./motion/MotionButton";
import { premiumEase } from "@/lib/motion";

export const Programs: React.FC = () => {
  const { enquireProgram } = usePresentation();
  const [activeCourseIdx, setActiveCourseIdx] = useState<number>(0);

  // 6 Primary Preview Courses for the single-course configuration switcher
  const previewCourses = [
    COURSES_DATA.find((c) => c.id === "ai-ml")!,
    COURSES_DATA.find((c) => c.id === "web-dev")!,
    COURSES_DATA.find((c) => c.id === "data-science")!,
    COURSES_DATA.find((c) => c.id === "autocad")!,
    COURSES_DATA.find((c) => c.id === "embedded-systems")!,
    COURSES_DATA.find((c) => c.id === "digital-marketing")!,
  ].filter(Boolean);

  const currentCourse: Course = previewCourses[activeCourseIdx] || previewCourses[0];

  return (
    <section
      id="programs"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2]/85 border-b border-[#0F1535]/06 select-none overflow-x-clip font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Top Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#0F1535]/08 gap-4">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase">
                FEATURED CURRICULUM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0F1535] leading-tight font-jakarta">
              EXPLORE WHAT YOU CAN LEARN<span className="text-[#EFAF32]">.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#119E9D] hover:text-[#0F1535] uppercase tracking-wider"
            >
              <span>View All 22 Tracks</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EFAF32]" />
            </Link>
          </div>
        </div>



        {/* SINGLE-COURSE CONFIGURATION SHOWCASE */}
        <div className="bg-white border border-[#0F1535]/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl text-left overflow-hidden relative mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCourse.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: premiumEase }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* LEFT 50% — Large Visual Frame */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-md bg-[#0F1535] border border-[#0F1535]/10">
                  <img
                    src={currentCourse.image}
                    alt={currentCourse.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/85 via-transparent to-transparent" />
                  
                  {/* Category & Online Indicator Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {currentCourse.category}
                    </span>
                    {currentCourse.isOnlineAvailable && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        <span>ONLINE AVAILABLE</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold">
                    {currentCourse.duration} • Practitioner-Led Mentorship
                  </div>
                </div>
              </div>

              {/* RIGHT 50% — Course Information & Pricing */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#576071]">
                    {currentCourse.level} Track
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1535] mb-3 leading-snug font-jakarta">
                  {currentCourse.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#576071] leading-relaxed mb-6 font-normal">
                  {currentCourse.description}
                </p>

                {/* Specs & Pricing Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full p-4 rounded-2xl bg-[#F7F6F2] border border-[#0F1535]/08 mb-6 text-xs shadow-xs">
                  <div>
                    <span className="text-[10px] text-[#576071] uppercase block font-semibold">
                      DURATION
                    </span>
                    <span className="font-bold text-[#0F1535] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#F97316]" /> {currentCourse.duration}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#576071] uppercase block font-semibold">
                      LEARNING MODE
                    </span>
                    <span className="font-bold text-[#0F1535] flex items-center gap-1 mt-0.5">
                      <Globe className="w-3.5 h-3.5 text-[#119E9D]" /> {currentCourse.mode}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#5E6675] uppercase block font-semibold">
                      TUITION FEE
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-black text-[#0F1535] text-sm">
                        ₹{currentCourse.price.toLocaleString("en-IN")}
                      </span>
                      {currentCourse.originalPrice && (
                        <span className="text-[11px] text-[#576071]/60 line-through">
                          ₹{currentCourse.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Skills Built */}
                <div className="mb-6 w-full">
                  <span className="text-[11px] font-bold text-[#0F1535] uppercase tracking-wider block mb-2">
                    CORE CAPABILITIES YOU'LL BUILD
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCourse.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#0F1535]/10 text-[#0F1535] text-[11px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#0F1535]/08 w-full">
                  <MotionButton
                    onClick={() => enquireProgram(currentCourse.title, activeCourseIdx)}
                    className="min-h-[46px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F1535] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#119E9D] transition-all shadow-md cursor-pointer"
                  >
                    <span>Enquire for Track</span>
                    <ArrowRight className="w-4 h-4 text-[#EFAF32]" />
                  </MotionButton>

                  <Link
                    to="/courses"
                    className="text-xs font-bold text-[#576071] hover:text-[#0F1535] transition-colors"
                  >
                    View Syllabus & Overview →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM PRODUCT SELECTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {previewCourses.map((course, idx) => {
            const isActive = activeCourseIdx === idx;
            return (
              <button
                key={course.id}
                onClick={() => setActiveCourseIdx(idx)}
                className={`min-h-[48px] p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#0F1535] text-white border-[#0F1535] shadow-md ring-2 ring-[#119E9D]"
                    : "bg-white text-[#576071] border-[#0F1535]/10 hover:border-[#119E9D]/30 hover:text-[#0F1535]"
                }`}
              >
                <span className="text-xs font-bold leading-tight block mb-1">
                  {course.title.split("&")[0].trim()}
                </span>
                <span className="text-[10px] opacity-75 block">
                  ₹{course.price.toLocaleString("en-IN")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
