import React from "react";
import { motion } from "motion/react";
import { SEO } from "@/components/SEO";
import { EditorialHero } from "@/components/EditorialHero";
import { CinematicFrameSection } from "@/components/CinematicFrameSection";
import { EditorialDiscovery } from "@/components/EditorialDiscovery";
import { EditorialPrograms } from "@/components/EditorialPrograms";
import { EditorialProjects } from "@/components/EditorialProjects";
import { EditorialStories } from "@/components/EditorialStories";
import { EditorialEthos } from "@/components/EditorialEthos";
import { EditorialFinalCTA } from "@/components/EditorialFinalCTA";
import { EditorialAmbientTicker } from "@/components/motion/EditorialMotion";
import { pageTransitionVariants } from "@/lib/motion";

export const Home: React.FC = () => {
  return (
    <div className="relative w-full bg-[#F7F6F2] font-sans selection:bg-[#119E9D]/20 selection:text-[#0F1535]">
      <SEO
        title="Nexovate — Learn. Build. Shape Tomorrow."
        description="Nexovate is a practitioner-led applied learning platform helping students discover practical skills, build real production software systems, and shape what's next."
      />

      {/* ── CINEMATIC EDITORIAL SCROLL NARRATIVE ── */}
      <div className="relative w-full">
        {/* 01 // CLEAN LUXURY EDITORIAL HERO */}
        <EditorialHero />

        {/* 02 // CINEMATIC 25-FRAME COMPUTATIONAL CHAPTER */}
        <CinematicFrameSection />

        {/* 03 // AMBIENT HORIZONTAL MOTION STRIP */}
        <EditorialAmbientTicker
          phrases={["SHAPE", "DEPLOY", "INSPECT", "LEAD", "LEARN", "BUILD", "CREATE"]}
        />

        {/* 03 // BRAND DISCOVERY & ETHOS */}
        <EditorialDiscovery />

        {/* 04 // LARGE-SCALE INTERACTIVE PROGRAMS INDEX */}
        <EditorialPrograms />

        {/* 05 // ASYMMETRIC STUDENT PROJECTS PORTFOLIO */}
        <EditorialProjects />

        {/* 06 // VERIFIED STUDENT STORIES */}
        <EditorialStories />

        {/* 07 // THE NEXOVATE STORY / ABOUT */}
        <EditorialEthos />

        {/* 08 // IMMERSIVE FINAL CTA */}
        <EditorialFinalCTA />
      </div>
    </div>
  );
};

export default Home;


