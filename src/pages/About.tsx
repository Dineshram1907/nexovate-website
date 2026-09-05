import React, { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Users2,
  Rocket,
  Award,
  GraduationCap,
  Building2,
  Flame,
  Hammer,
} from "lucide-react";
import { brandCreatorImage, realStudentsGroup } from "@/assets";
import { SEO } from "@/components/SEO";
import { MotionCard, MotionButton, ImageReveal } from "@/components/motion";
import { pageTransitionVariants } from "@/lib/motion";
import { usePresentation } from "@/context/PresentationContext";

export const About: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const containerRef = useRef<HTMLDivElement>(null);

  const beliefs = [
    {
      title: "Curiosity",
      subtitle: "Interest before specialization",
      desc: "Learning happens fastest when you genuinely care about what you are exploring. We provide sandboxes to test ideas freely before committing to a track.",
      icon: Compass,
      accent: "#6366F1",
    },
    {
      title: "Practice",
      subtitle: "Muscle memory over memorization",
      desc: "Syntax and theory are forgotten quickly without execution. We teach through active implementation in real production Git repositories with code reviews.",
      icon: Hammer,
      accent: "#F97316",
    },
    {
      title: "Progress",
      subtitle: "Measurable portfolio outcomes",
      desc: "Every milestone produces demonstrable artifacts, live deployed cloud systems, and architectural case studies that prove your competence.",
      icon: Rocket,
      accent: "#119E9D",
    },
  ];

  const methodSteps = [
    { num: "01", name: "DISCOVER", desc: "Test sandboxes and explore practical interests without pressure." },
    { num: "02", name: "LEARN", desc: "Master modern toolchains and production workflows with practitioner mentors." },
    { num: "03", name: "BUILD", desc: "Ship real capstone systems with automated testing and deployment." },
    { num: "04", name: "GROW", desc: "Graduate with a verified portfolio ready for recruiters and universities." },
  ];

  const audiences = [
    {
      title: "Students & Learners",
      desc: "College students, career pivoters, and self-starters seeking structured guidance, rigorous code reviews, and demonstrable portfolio proof.",
      icon: GraduationCap,
      badge: "Learner Tracks",
    },
    {
      title: "Academic Institutions",
      desc: "Colleges and universities looking to integrate modern 14-week applied tech labs and industry standards into their curricula.",
      icon: Building2,
      badge: "Curriculum Labs",
    },
    {
      title: "Industry Ecosystem",
      desc: "Technology enterprises and startups seeking vetted candidates who have built and deployed real production applications.",
      icon: Users2,
      badge: "Talent Pipeline",
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full min-h-screen bg-[#FAFBFC] text-[#101536] select-none font-sans overflow-x-clip"
    >
      <SEO
        title="About Nexovate — Learning Through Practice"
        description="We believe learning should create momentum. Learn about Nexovate's philosophy, method, and commitment to applied education."
      />

      {/* 1. EDITORIAL HERO */}
      <section className="relative pt-20 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-12 border-b border-[#101536]/06 bg-notebook-grid text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#119E9D]/10 border border-[#119E9D]/20 mb-6 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
                <span className="text-xs font-bold tracking-wider text-[#119E9D] uppercase">
                  OUR PHILOSOPHY
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black tracking-tight text-[#101536] leading-[1.04] mb-6 font-jakarta">
                WE BELIEVE <br />
                LEARNING SHOULD <br />
                <span className="text-[#6366F1]">CREATE MOMENTUM</span>
                <span className="text-[#F97316]">.</span>
              </h1>

              <p className="text-base sm:text-xl text-[#5E6675] font-normal leading-relaxed max-w-xl mb-8">
                Nexovate was founded with a clear premise: every learner has immense capability, but traditional classrooms teach passive memorization. We provide the studio environment where curiosity turns into production execution.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <MotionButton
                  onClick={() => openEnquiryModal()}
                  className="min-h-[48px] inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#101536] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#6366F1] transition-all shadow-md cursor-pointer"
                >
                  <span>Talk with an Advisor</span>
                  <ArrowRight className="w-4 h-4 text-[#EFAF32]" />
                </MotionButton>
                <Link
                  to="/courses"
                  className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#101536]/15 text-[#101536] font-bold text-xs uppercase tracking-wider hover:bg-[#F6F8F9] hover:border-[#6366F1] transition-all shadow-xs"
                >
                  <span>Browse Programs</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Authentic Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3.2] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#101536]">
                <img
                  src={brandCreatorImage}
                  alt="Nexovate Studio Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101536]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white text-xs z-10">
                  <span className="text-[#EFAF32] font-bold block uppercase tracking-wider text-[10px]">
                    NEXOVATE HUB // CHENNAI
                  </span>
                  <p className="text-white/90 font-medium">
                    Where curious learners evolve into independent builders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE BELIEVE (Curiosity, Practice, Progress) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#101536]/06 text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-1">
              CORE TENETS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] font-jakarta">
              WHAT WE BELIEVE<span className="text-[#F97316]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5E6675] font-normal mt-2">
              Three essential principles that guide how we structure curriculum, mentorship, and milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beliefs.map((b) => {
              const Icon = b.icon;
              return (
                <MotionCard
                  key={b.title}
                  className="p-8 sm:p-10 rounded-3xl bg-[#FAFBFC] border border-[#101536]/08 hover:border-[#6366F1]/30 hover:shadow-md transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-xs"
                      style={{ backgroundColor: `${b.accent}15`, color: b.accent }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-[#6366F1]">
                      {b.title}
                    </span>
                    <h3 className="text-xl font-bold text-[#101536] mb-3 font-jakarta">
                      {b.subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed font-normal">
                      {b.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#101536]/06 flex items-center gap-1.5 text-xs font-bold uppercase" style={{ color: b.accent }}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Principle</span>
                  </div>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. THE NEXOVATE METHOD (DISCOVER → LEARN → BUILD → GROW) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAFBFC] border-b border-[#101536]/06 text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#F97316] uppercase block mb-1">
              OUR FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] font-jakarta">
              THE NEXOVATE METHOD<span className="text-[#119E9D]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5E6675] font-normal mt-2">
              A structured 4-phase progression that takes you from initial curiosity to shipping verified capstones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodSteps.map((s) => (
              <MotionCard
                key={s.num}
                className="p-6 sm:p-8 bg-white border border-[#101536]/08 rounded-3xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow h-full"
              >
                <div>
                  <span className="text-2xl font-black text-[#F97316] block mb-3 font-jakarta">
                    {s.num}
                  </span>
                  <h3 className="text-lg font-black text-[#101536] mb-2 font-jakarta">
                    {s.name}
                  </h3>
                  <p className="text-xs text-[#5E6675] leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#101536]/06 flex items-center gap-1 text-[10px] font-bold text-[#119E9D] uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Phase Standard</span>
                </div>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO WE SERVE (Students, Institutions, Industry) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#101536]/06 text-left">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#119E9D] uppercase block mb-1">
              OUR COMMUNITY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] font-jakarta">
              WHO WE SERVE<span className="text-[#6366F1]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5E6675] font-normal mt-2">
              Empowering learners, academic departments, and technical hiring teams across the ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audiences.map((aud) => {
              const Icon = aud.icon;
              return (
                <MotionCard
                  key={aud.title}
                  className="p-8 sm:p-10 rounded-3xl bg-[#FAFBFC] border border-[#101536]/08 hover:border-[#6366F1]/30 hover:shadow-md transition-all flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#101536]/10 text-[10px] font-bold text-[#5E6675] uppercase">
                        {aud.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#101536] mb-3 font-jakarta">
                      {aud.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5E6675] leading-relaxed font-normal">
                      {aud.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#101536]/06 flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Ecosystem</span>
                  </div>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA (BUILD YOUR NEXT STEP) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-notebook-grid text-left">
        <div className="max-w-5xl mx-auto w-full">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#101536] text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider block mb-2">
                  ADMISSIONS & MENTORSHIP
                </span>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 font-jakarta">
                  BUILD YOUR NEXT STEP<span className="text-[#EFAF32]">.</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-normal mb-8 max-w-lg">
                  Join an upcoming cohort and learn directly from industry practitioners. Take your skills from theory to verified production proof.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <MotionButton
                    onClick={() => openEnquiryModal()}
                    className="min-h-[48px] px-7 py-3.5 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4F46E5] transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Next Cohort</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </MotionButton>
                  <Link
                    to="/contact"
                    className="min-h-[48px] px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/15 inline-flex items-center justify-center text-center"
                  >
                    <span>Contact Admissions</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative w-48 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
                  <img
                    src={realStudentsGroup}
                    alt="Nexovate Cohort"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default About;
