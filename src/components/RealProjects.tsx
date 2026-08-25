"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, BarChart3, Globe, Zap, ArrowUpRight } from "lucide-react";

// DEMO PROJECT PREVIEWS — Clearly marked for demonstration purposes.

interface ProjectPreview {
  id: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  icon: React.ElementType;
}

export const RealProjects: React.FC = () => {
  const projects: ProjectPreview[] = [
    {
      id: "DEMO-01",
      category: "AI & ML MODEL",
      title: "Automated Customer Sentiment Classifier",
      description: "Trained NLP neural network model detecting sentiment trends from customer telemetry stream.",
      tech: ["Python", "TensorFlow", "FastAPI"],
      icon: Cpu,
    },
    {
      id: "DEMO-02",
      category: "ANALYTICS DASHBOARD",
      title: "Real-time Telemetry Analytics Hub",
      description: "Interactive data visualization platform rendering live SQL aggregation data streams.",
      tech: ["React", "TypeScript", "Recharts", "BigQuery"],
      icon: BarChart3,
    },
    {
      id: "DEMO-03",
      category: "WEB APPLICATION",
      title: "Collaborative Student Workspace",
      description: "Responsive full-stack platform featuring WebSocket live state synchronization and dark UI.",
      tech: ["Next.js", "Tailwind CSS", "Node.js"],
      icon: Globe,
    },
    {
      id: "DEMO-04",
      category: "AUTOMATION TOOL",
      title: "Cloud Pipeline Infrastructure Orchestrator",
      description: "Automated DevOps script orchestrating microservices deployment across cloud environments.",
      tech: ["Docker", "Kubernetes", "GitHub Actions"],
      icon: Zap,
    },
  ];

  return (
    <section id="real-projects" className="py-28 md:py-36 bg-[#F2F5F6] border-b border-[#101536]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="subheading-label mb-3 inline-block">SCREEN 04 // PROJECT PREVIEWS</span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#101536] mb-4">
            BUILD SOMETHING <br />
            <span className="text-[#101536] relative">
              REAL.
              <span className="absolute left-0 bottom-1 w-full h-[4px] bg-[#EFAF32] rounded-full" />
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#5E6675] font-normal">
            Students build functional software models and analytics systems during their learning journey.
          </p>
        </motion.div>

        {/* 4 Demo Project Mockup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white rounded-3xl border border-[#101536]/08 p-8 flex flex-col justify-between hover:border-[#119E9D]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#119E9D] uppercase">
                      {project.category} // {project.id}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAFBFC] border border-[#101536]/06 flex items-center justify-center text-[#101536]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#101536] mb-3 group-hover:text-[#119E9D] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#5E6675] leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-[#101536]/06">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F2F5F6] text-[#101536]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#5E6675]">
                    <span>DEMO PROJECT PREVIEW</span>
                    <ArrowUpRight className="w-4 h-4 text-[#119E9D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
