import React from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Palette, 
  FlaskConical, 
  Rocket, 
  FolderGit2, 
  Globe, 
  Presentation, 
  Users 
} from "lucide-react";

interface ProjectType {
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  description: string;
}

export const ProjectLearning: React.FC = () => {
  const projects: ProjectType[] = [
    { title: "Build an App", category: "Technology", icon: Smartphone, color: "text-[#6366F1]", bg: "bg-[#E0E7FF]", description: "Develop mobile & web applications that solve daily challenges." },
    { title: "Design a Brand", category: "Creative Arts", icon: Palette, color: "text-[#F97316]", bg: "bg-[#FFEDD5]", description: "Craft visual identities, logos, and interactive UI design systems." },
    { title: "Science Experiment", category: "Science", icon: FlaskConical, color: "text-[#10B981]", bg: "bg-[#D1FAE5]", description: "Conduct practical data analysis, physics, or robotics simulations." },
    { title: "Launch a Business", category: "Entrepreneurship", icon: Rocket, color: "text-[#D97706]", bg: "bg-[#FEF3C7]", description: "Formulate business models, market positioning, and financial plans." },
    { title: "Digital Portfolio", category: "Career Skills", icon: FolderGit2, color: "text-[#0284C7]", bg: "bg-[#E0F2FE]", description: "Build a live, interactive web portfolio showcasing your projects." },
    { title: "Real-World Problem", category: "Data & AI", icon: Globe, color: "text-[#6366F1]", bg: "bg-[#E0E7FF]", description: "Analyze real datasets to create predictive insights for communities." },
    { title: "Create Presentations", category: "Communication", icon: Presentation, color: "text-[#DB2777]", bg: "bg-[#FCE7F3]", description: "Master persuasive storytelling, public speaking, and pitch decks." },
    { title: "Community Project", category: "Leadership", icon: Users, color: "text-[#059669]", bg: "bg-[#D1FAE5]", description: "Organize peer initiatives, open-source repos, or social impacts." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFBFC] select-none border-b border-[#101536]/06">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-[#6366F1] uppercase block mb-2">
            PRACTICAL CREATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] uppercase font-jakarta">
            LEARN BY BUILDING<span className="text-[#F97316]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6675] mt-2 max-w-xl mx-auto">
            Nexovate isn't just about watching video lessons. You'll build real, tangible projects that demonstrate your ability.
          </p>
        </div>

        {/* 8 Project Creation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-[#101536]/08 p-5 flex flex-col justify-between hover:border-[#6366F1]/30 hover:shadow-md transition-all duration-200 text-left"
              >
                <div>
                  <div className={`w-10 h-10 rounded-2xl ${proj.bg} ${proj.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#6366F1] uppercase block mb-1">
                    {proj.category}
                  </span>
                  <h3 className="text-base font-extrabold text-[#101536] tracking-tight mb-1.5">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#5E6675] leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
