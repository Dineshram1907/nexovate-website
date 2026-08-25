"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  institution: string;
}

export const Testimonials: React.FC = () => {
  // Structured placeholders for client customization
  const testimonials: Testimonial[] = [
    {
      id: "01",
      quote:
        "Nexovate's practical focus gave our students hands-on clarity in emerging technology concepts that traditional coursework rarely covers.",
      author: "Academic Coordinator",
      role: "Department of Computer Science",
      institution: "Partner Institution",
    },
    {
      id: "02",
      quote:
        "The project-first approach helped me understand how modern full stack architectures operate in real software teams.",
      author: "Student Participant",
      role: "Full Stack Program",
      institution: "Nexovate Learner",
    },
    {
      id: "03",
      quote:
        "Mentorship from active technology practitioners made a noticeable difference in how our students approached problem solving.",
      author: "Faculty Lead",
      role: "School of Engineering",
      institution: "Technology Partner",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F2F5F6] border-t border-[#101536]/06 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="subheading-label mb-3 inline-block">SECTION 07 — PERSPECTIVES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101536] mb-4">
            VOICES OF NEXOVATE.
          </h2>
          <p className="text-base text-[#5E6675] font-normal leading-relaxed">
            Feedback from learners and academic partners who experience our programs.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-2xl border border-[#101536]/08 p-8 flex flex-col justify-between hover:border-[#119E9D]/30 transition-all duration-300 shadow-xs"
            >
              <div>
                <Quote className="w-8 h-8 text-[#119E9D]/30 mb-6" />
                <p className="text-base text-[#101536] italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#101536]/06">
                <h3 className="text-sm font-bold text-[#101536]">
                  {item.author}
                </h3>
                <p className="text-xs text-[#119E9D] font-medium mt-0.5">
                  {item.role}
                </p>
                <p className="text-xs text-[#5E6675] mt-0.5">
                  {item.institution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
