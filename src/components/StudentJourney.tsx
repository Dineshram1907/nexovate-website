import React, { useState } from "react";
import { motion } from "motion/react";
import { Compass, BookOpen, GitBranch, Hammer, Trophy, Sparkles, CheckCircle2 } from "lucide-react";
import { IMAGE_REGISTRY } from "@/constants/imageRegistry";

export const StudentJourney: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const phases = [
    {
      id: "discover",
      phase: "01",
      title: "Discover",
      subtitle: "Hands-On Exploratory Sandboxes",
      desc: "Before choosing a direction, explore practical micro-projects across AI, modern web engineering, and product design without academic pressure.",
      icon: Compass,
      accent: "#119E9D", // Nexovate Teal
      deliverable: "Personalized Skill Assessment & Learning Roadmap",
    },
    {
      id: "learn",
      phase: "02",
      title: "Learn",
      subtitle: "Practitioner-Led Deep Immersion",
      desc: "Master production concepts with senior engineers. No slide memorization — live interactive terminal sessions, codebases, and architectural design patterns.",
      icon: BookOpen,
      accent: "#0EA5E9", // Nexovate Cyan
      deliverable: "Core Technical Fluency & Toolchain Mastery",
    },
    {
      id: "experiment",
      phase: "03",
      title: "Experiment",
      subtitle: "Pair-Programming & Code Reviews",
      desc: "Work through real-world edge cases. Submit Git pull requests and receive granular line-by-line architectural critiques from mentors.",
      icon: GitBranch,
      accent: "#1D4ED8", // Precision Blue
      deliverable: "Weekly PR Reviews & Refactored Commits",
    },
    {
      id: "build",
      phase: "04",
      title: "Build",
      subtitle: "Full-Stack System Deployment",
      desc: "Design and implement production-grade capstone platforms with authenticated APIs, real-time databases, and automated CI/CD container pipelines.",
      icon: Hammer,
      accent: "#EFAF32", // Refined Gold
      deliverable: "Deployed Live Application with Public GitHub Repo",
    },
    {
      id: "present",
      phase: "05",
      title: "Present",
      subtitle: "Capstone Defense & Career Launch",
      desc: "Present your deployed platform to an evaluation panel of engineering leads and founders. Walk away with proof that technical recruiters inspect directly.",
      icon: Trophy,
      accent: "#0F1535", // Deep Navy
      deliverable: "Verified Capstone Portfolio & Direct Referrals",
    },
  ];

  const currentPhase = phases[activeTab];

  return (
    <section
      id="experience"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F7F6F2]/85 border-b border-[#0F1535]/06 select-none overflow-x-clip font-sans text-[#0F1535] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-left max-w-3xl mb-14 relative"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase">
              THE STUDENT EXPERIENCE
            </span>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F1535] font-jakarta leading-[1.08] mb-6">
              HOW LEARNING <br />
              <span className="text-[#119E9D]">ACTUALLY HAPPENS</span>
              <span className="text-[#EFAF32]">.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#576071] font-normal leading-relaxed max-w-2xl">
            From initial curiosity to a verified deployed system. Here is the five-stage active learning pipeline every Nexovate student navigates.
          </p>
        </motion.div>

        {/* Interactive 5-Stage Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Phase Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {phases.map((phase, idx) => {
              const isActive = activeTab === idx;
              const Icon = phase.icon;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-white border-[#101536]/15 shadow-md"
                      : "bg-transparent border-transparent hover:bg-white/60 hover:border-[#101536]/06 text-[#5E6675]"
                  }`}
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors"
                      style={{
                        backgroundColor: isActive ? `${phase.accent}20` : "#10153608",
                        color: isActive ? phase.accent : "#5E6675",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest block"
                        style={{ color: isActive ? phase.accent : "#8F9CAE" }}
                      >
                        PHASE {phase.phase}
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-bold font-jakarta transition-colors ${
                          isActive ? "text-[#101536]" : "text-[#5E6675] group-hover:text-[#101536]"
                        }`}
                      >
                        {phase.title}
                      </h4>
                    </div>
                  </div>

                  <span
                    className="w-2 h-2 rounded-full transition-transform"
                    style={{
                      backgroundColor: isActive ? phase.accent : "transparent",
                      transform: isActive ? "scale(1.2)" : "scale(0)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Showcase with Real Studio Imagery */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#101536]/10 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative text-left">
              {/* Top Studio Photographic Frame */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-md bg-[#101536] border border-[#101536]/10">
                <img
                  src={IMAGE_REGISTRY.experience.activeCohortCollaboration}
                  alt="Real students collaborating in Nexovate laboratory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101536]/85 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    style={{ backgroundColor: currentPhase.accent }}
                    className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-xs"
                  >
                    PHASE {currentPhase.phase} // {currentPhase.title.toUpperCase()}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold">
                  Active Engineering Studio • Practitioner Mentorship
                </div>
              </div>

              {/* Phase Content */}
              <div>
                <span
                  style={{ color: currentPhase.accent }}
                  className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                >
                  {currentPhase.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F1535] font-jakarta mb-3 leading-tight">
                  {currentPhase.title}: {currentPhase.subtitle}
                </h3>
                <p className="text-sm text-[#576071] leading-relaxed mb-6 font-normal">
                  {currentPhase.desc}
                </p>

                {/* Verified Deliverable Banner */}
                <div className="p-4 rounded-xl bg-[#F7F6F2] border border-[#0F1535]/08 flex items-center gap-3">
                  <CheckCircle2
                    className="w-5 h-5 shrink-0"
                    style={{ color: currentPhase.accent }}
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#576071] block">
                      KEY DELIVERABLE
                    </span>
                    <span className="text-xs font-bold text-[#0F1535]">
                      {currentPhase.deliverable}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentJourney;
