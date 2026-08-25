import React from "react";
import { PresentationProvider } from "@/context/PresentationContext";
import { Navbar } from "@/components/Navbar";
import { PresentationViewport } from "@/components/PresentationViewport";
import { StudentEnquiryModal } from "@/components/StudentEnquiryModal";

export default function Home() {
  return (
    <PresentationProvider>
      <div className="relative w-full min-h-screen lg:h-[100svh] lg:overflow-hidden bg-[#FAFBFC] text-[#101536] selection:bg-[#119E9D]/20 selection:text-[#101536]">
        {/* Sticky Presentation Header Navigation with Interactive Active Indicator & Progress Bar */}
        <Navbar />

        {/* Presentation Viewport: Native continuous scroll on mobile, sliding presentation stack on desktop */}
        <main className="w-full min-h-screen lg:h-full">
          <PresentationViewport />
        </main>

        {/* Intelligent Timed Student Enquiry Popup */}
        <StudentEnquiryModal />
      </div>
    </PresentationProvider>
  );
}
