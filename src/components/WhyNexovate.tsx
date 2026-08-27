import React from "react";
import { motion } from "framer-motion";
import { Compass, Hammer, Users, Rocket, Sparkles } from "lucide-react";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  icon: React.ElementType;
  badgeBg: string;
  badgeColor: string;
}

export const WhyNexovate: React.FC = () => {
  const pillars: Pillar[] = [
    {
      number: "01",
      title: "EXPLORE & DISCOVER",
      subtitle: "Find what interests you before committing.",
      detail:
        "Whether you're curious about AI, UI/UX design, data science, web engineering, or tech business, Nexovate gives you the freedom to explore multiple disciplines.",
      icon: Compass,
      badgeBg: "bg-[#E0F2FE]",
      badgeColor: "text-[#0284C7]",
    },
    {
      number: "02",
      title: "PRACTICAL BUILDING",
      subtitle: "Learn by doing, not just watching.",
      detail:
        "Knowledge becomes capability when you build. Students turn concepts into real-world applications, working software, and creative portfolios.",
      icon: Hammer,
      badgeBg: "bg-[#FFEDD5]",
      badgeColor: "text-[#F97316]",
    },
    {
      number: "03",
      title: "EXPERT MENTORSHIP",
      subtitle: "Guidance from experienced practitioners.",
      detail:
        "Direct mentorship from engineers, designers, and industry builders who offer practical feedback, career advice, and structured support.",
      icon: Users,
      badgeBg: "bg-[#D1FAE5]",
      badgeColor: "text-[#10B981]",
    },
    {
      number: "04",
      title: "FUTURE-READY",
      subtitle: "Prepare for what comes next.",
      detail:
        "Develop adaptable problem-solving skills, critical thinking habits, and technological literacy that prepare you for college, internships, and beyond.",
      icon: Rocket,
      badgeBg: "bg-[#FEF3C7]",
      badgeColor: "text-[#D97706]",
    },
  ];

  return (
    <section id="why-nexovate" className="py-20 md:py-28 bg-[#FAFBFC] select-none scroll-mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 md:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F8F9] border border-[#101536]/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#119E9D]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#119E9D] uppercase">
              WHY NEXOVATE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#101536] font-jakarta">
            MORE THAN A COURSE.<br />
            <span className="text-[#119E9D] italic font-serif">A PLACE TO DISCOVER YOUR POTENTIAL.</span>
          </h2>
        </div>

        {/* 4 Friendly EdTech Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white rounded-3xl border border-[#101536]/08 p-7 md:p-9 flex flex-col justify-between hover:border-[#119E9D]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.badgeBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${pillar.badgeColor}`} />
                    </div>
                    <span className="text-xs font-bold text-[#5E6675]/70 uppercase tracking-wider">
                      PILLAR {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101536] mb-2 group-hover:text-[#119E9D] transition-colors font-jakarta">
                    {pillar.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#119E9D] mb-3">
                    {pillar.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-[#5E6675] leading-relaxed font-normal">
                    {pillar.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#101536]/06 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#5E6675]/60 uppercase tracking-widest">
                    NEXOVATE EDTECH PILLAR // {pillar.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#EFAF32]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
