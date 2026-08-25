"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Database, Code2, Sparkles } from "lucide-react";

export const WhatWillYouBuild: React.FC = () => {
  const disciplines = [
    {
      id: "01",
      icon: Cpu,
      title: "ARTIFICIAL INTELLIGENCE",
      subtitle: "Machine Learning & Neural Networks",
      description: "Build intelligent algorithms, automated decision systems, and generative model solutions.",
      accent: "#00B8B0",
    },
    {
      id: "02",
      icon: Code2,
      title: "SOFTWARE ENGINEERING",
      subtitle: "Full Stack Web & System Architecture",
      description: "Architect scalable web applications, robust backends, and responsive user interfaces.",
      accent: "#101536",
    },
    {
      id: "03",
      icon: Database,
      title: "DATA SCIENCE",
      subtitle: "Analytics & Predictive Modeling",
      description: "Extract insights from complex datasets to drive strategic decisions and data models.",
      accent: "#EFAF32",
    },
    {
      id: "04",
      icon: Sparkles,
      title: "EMERGING TECH",
      subtitle: "Cloud Infrastructure & DevOps",
      description: "Master cloud environments, automated deployment pipelines, and modern security.",
      accent: "#00B8B0",
    },
  ];

  return (
    <section id="section-reveal" className="py-28 md:py-36 bg-[#F2F5F6] border-y border-[#101536]/06 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — The Story Reveal Answer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="subheading-label mb-3 inline-block">SECTION 02 // THE REVEAL</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#101536] mb-4 leading-tight">
            THAT DEPENDS ON <br />
            <span className="text-[#101536] relative">
              WHAT YOU DO WITH IT.
              <span className="absolute left-0 bottom-1 w-full h-[4px] bg-[#00B8B0] rounded-full" />
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#5E6675] font-normal">
            Knowledge becomes valuable when you turn concepts into real engineering capability.
          </p>
        </motion.div>

        {/* 4 Technology Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white rounded-3xl border border-[#101536]/08 p-8 sm:p-10 flex flex-col justify-between hover:border-[#00B8B0]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#F2F5F6] border border-[#101536]/06 flex items-center justify-center text-[#00B8B0]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#5E6675]">
                      DISCIPLINE // {item.id}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold tracking-widest text-[#00B8B0] uppercase block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#101536] mb-4 group-hover:text-[#00B8B0] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-base text-[#5E6675] leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#101536]/06 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#101536]">
                  <span>Explore Track</span>
                  <a
                    href="#programs"
                    className="w-10 h-10 rounded-full bg-[#101536] text-white flex items-center justify-center group-hover:bg-[#00B8B0] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
