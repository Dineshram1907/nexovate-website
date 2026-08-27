import React from "react";
import { PresentationProvider } from "@/context/PresentationContext";
import { Navbar } from "@/components/Navbar";
import { PresentationViewport } from "@/components/PresentationViewport";
import { StudentEnquiryModal } from "@/components/StudentEnquiryModal";

export default function App() {
  return (
    <PresentationProvider>
      <div className="relative w-full min-h-screen bg-[#FAFBFC] text-[#101536] selection:bg-[#6366F1]/20 selection:text-[#101536] overflow-x-clip">
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Document Flow for One Continuous Vertical Scroll */}
        <main className="w-full relative">
          <PresentationViewport />
        </main>

        {/* Intelligent Timed Student Enquiry Popup (7-second timer, X button close) */}
        <StudentEnquiryModal />
      </div>
    </PresentationProvider>
  );
}
