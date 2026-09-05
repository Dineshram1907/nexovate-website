import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { PresentationProvider } from "@/context/PresentationContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentEnquiryModal } from "@/components/StudentEnquiryModal";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Courses } from "@/pages/Courses";
import { Contact } from "@/pages/Contact";

import { initSmoothScroll } from "@/animations";

// Scroll to top helper on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

// Animated Routes Wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/programs" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  return (
    <BrowserRouter>
      <PresentationProvider>
        <ScrollToTop />
        <div className="relative w-full min-h-screen bg-[#F7F6F2] text-[#0F1535] selection:bg-[#119E9D]/20 selection:text-[#0F1535]">
          {/* Sticky Editorial Navigation */}
          <Navbar />

          {/* Main Route Viewport with Native Vertical Scrolling */}
          <main className="w-full relative">
            <AnimatedRoutes />
          </main>

          {/* Minimal Editorial Footer */}
          <Footer />

          {/* Timed Student Enquiry Modal */}
          <StudentEnquiryModal />
        </div>
      </PresentationProvider>
    </BrowserRouter>
  );
}
