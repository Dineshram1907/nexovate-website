import React from "react";
import { Hero } from "./Hero";
import { InterestDiscovery } from "./InterestDiscovery";
import { StorytellingSection } from "./StorytellingSection";
import { BrandStory } from "./BrandStory";
import { Programs } from "./Programs";
import { StudentJourney } from "./StudentJourney";
import { ProjectLearning } from "./ProjectLearning";
import { Projects } from "./Projects";
import { StudentReviews } from "./StudentReviews";
import { StatisticsSection } from "./StatisticsSection";
import { Institutions } from "./Institutions";
import { About } from "./About";
import { Contact } from "./Contact";
import { FinalCTA } from "./FinalCTA";

export const PresentationViewport: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#FAFBFC] overflow-x-clip">
      {/* 01 // HERO */}
      <section id="hero" className="w-full relative">
        <Hero />
      </section>

      {/* 02 // EXPLORE WHAT INTERESTS YOU */}
      <section id="explore" className="w-full relative">
        <InterestDiscovery />
      </section>

      {/* STORYTELLING */}
      <section className="w-full relative">
        <StorytellingSection />
      </section>

      {/* WHY NEXOVATE */}
      <section id="why-nexovate" className="w-full relative">
        <BrandStory />
      </section>

      {/* 03 // PROGRAMS */}
      <section id="programs" className="w-full relative">
        <Programs />
      </section>

      {/* 04 // EXPERIENCE / JOURNEY */}
      <section id="experience" className="w-full relative">
        <StudentJourney />
      </section>

      {/* LEARN BY BUILDING */}
      <section className="w-full relative">
        <ProjectLearning />
      </section>

      {/* 05 // PROJECTS */}
      <section id="projects" className="w-full relative">
        <Projects />
      </section>

      {/* 06 // STUDENT REVIEWS & STORIES */}
      <section id="reviews" className="w-full relative">
        <StudentReviews />
      </section>

      {/* STATISTICS */}
      <section className="w-full relative">
        <StatisticsSection />
      </section>

      {/* 07 // INSTITUTIONS */}
      <section id="institutions" className="w-full relative">
        <Institutions />
      </section>

      {/* 08 // ABOUT */}
      <section id="about" className="w-full relative">
        <About />
      </section>

      {/* 09 // CONTACT */}
      <section id="contact" className="w-full relative">
        <Contact />
      </section>

      {/* 10 // FINAL CTA */}
      <section id="final-cta" className="w-full relative">
        <FinalCTA />
      </section>
    </div>
  );
};
