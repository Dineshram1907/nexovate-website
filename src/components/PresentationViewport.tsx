import React from "react";
import { Hero } from "./Hero";
import { WhyNexovate } from "./WhyNexovate";
import { Programs } from "./Programs";
import { StudentJourney } from "./StudentJourney";
import { WhatStudentsBuild } from "./WhatStudentsBuild";
import { StudentReviews } from "./StudentReviews";
import { Institutions } from "./Institutions";
import { About } from "./About";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

export const PresentationViewport: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#FAFBFC] overflow-x-clip font-sans">
      {/* 00 // HERO */}
      <Hero />

      {/* 01 // WHY NEXOVATE */}
      <WhyNexovate />

      {/* 02 // PROGRAMS */}
      <Programs />

      {/* 03 // EXPERIENCE */}
      <StudentJourney />

      {/* 04 // PROJECTS */}
      <WhatStudentsBuild />

      {/* 05 // STUDENT REVIEWS */}
      <StudentReviews />

      {/* 06 // INSTITUTIONS */}
      <Institutions />

      {/* 07 // ABOUT */}
      <About />

      {/* 08 // CONTACT */}
      <FinalCTA />

      {/* 09 // FOOTER */}
      <Footer />
    </div>
  );
};
