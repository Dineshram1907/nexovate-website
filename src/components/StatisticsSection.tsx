import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Layers, Award } from "lucide-react";

export const StatisticsSection: React.FC = () => {
  const stats = [
    { value: "10,000+", label: "Students Learning", icon: Users, color: "text-[#6366F1]" },
    { value: "50+", label: "Learning Experiences", icon: BookOpen, color: "text-[#F97316]" },
    { value: "100+", label: "Projects Created", icon: Layers, color: "text-[#119E9D]" },
    { value: "20+", label: "Skill Areas", icon: Award, color: "text-[#D97706]" },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white select-none border-b border-[#101536]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-[#FAFBFC] rounded-3xl border border-[#101536]/08 text-center flex flex-col items-center justify-center shadow-xs"
              >
                <div className={`w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-xs ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-[#101536] tracking-tight font-jakarta">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-[#5E6675] uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
