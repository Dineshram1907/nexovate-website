import React from "react";
import { SEO } from "@/components/SEO";
import { SkyMeadowLandingHero } from "@/components/SkyMeadowLandingHero";
import { BrandMarqueeSection } from "@/components/BrandMarqueeSection";
import { StudentReviews } from "@/components/StudentReviews";
import { LearningJourneySection } from "@/components/LearningJourneySection";
import { EditorialCollageSection } from "@/components/EditorialCollageSection";

export const Home: React.FC = () => {
  return (
    <div className="relative w-full bg-[#F6F5F0] font-sans selection:bg-[#11AFC0]/20 selection:text-[#071A2B]">
      <SEO
        title="Nexovate — Learn. Build. Shape Tomorrow."
        description="Nexovate is a practitioner-led applied learning platform helping students discover practical skills, build real production software systems, and shape what's next."
      />

      {/* ── HOMEPAGE HERO & CREDIBILITY ECOSYSTEM ── */}
      <div className="relative w-full">
        {/* 01 // VIDEO LANDING HERO */}
        <SkyMeadowLandingHero />

        {/* 02 // INFINITE COMPANY / ECOSYSTEM MARQUEE */}
        <BrandMarqueeSection />

        {/* 03 // STUDENT REVIEWS FLOATING PHYSICAL DEPTH STORIES */}
        <StudentReviews />

        {/* 04 // THE JOURNEY: LEARN IT / BUILD IT / MAKE IT REAL */}
        <LearningJourneySection />

        {/* 05 // SCRAPBOOK COLLAGE: WHATEVER YOU'RE CURIOUS ABOUT, BUILD IT */}
        <EditorialCollageSection />
      </div>
    </div>
  );
};

export default Home;
