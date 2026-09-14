import React, { useState, useEffect } from "react";
import { COLORS } from "./constants/colors";
import { DIMENSIONS } from "./constants/dimensions";
import { PhoneFrame } from "./PhoneFrame";
import { ScreenOne } from "./ScreenOne";
import { ScreenTwo } from "./ScreenTwo";
import { ScreenThree } from "./ScreenThree";

export const Showcase: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 900;
  const isTablet = windowWidth >= 900 && windowWidth < 1200;

  // Responsive scaling engine
  const horizontalPadding = isMobile ? 20 : isTablet ? 24 : 40;
  const availableWidth = windowWidth - horizontalPadding * 2;
  const mobileScale = Math.min(1, Math.max(0.7, availableWidth / DIMENSIONS.BASE_WIDTH));

  const phoneScale = isMobile ? mobileScale : isTablet ? 0.9 : 1;
  const renderedWidth = DIMENSIONS.BASE_WIDTH * phoneScale;
  const renderedHeight = DIMENSIONS.BASE_HEIGHT * phoneScale;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: COLORS.background,
        color: COLORS.white,
        position: "relative",
        overflowX: "hidden",
        fontFamily: "Manrope, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =================================================== */}
      {/* 1. BACKGROUND LAYERS */}
      {/* =================================================== */}
      {/* Layer 2: Subtle Center Radial Glow */}
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(241, 229, 198, 0.035) 0%, rgba(10, 10, 10, 0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Layer 3: Technical Dot Matrix Grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Layer 4: Background Telemetry Watermark */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "24px",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "1.5px",
          color: "rgba(255, 255, 255, 0.15)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        NX_SYS // 375×812_VIEWPORT // BUILD_2026.04
      </div>

      {/* =================================================== */}
      {/* 2. SHOWCASE TECHNICAL HEADER */}
      {/* =================================================== */}
      <header
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile ? "24px 20px 16px 20px" : "28px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          zIndex: 10,
          position: "relative",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(7, 7, 7, 0.8)",
        }}
      >
        {/* Left: Brand + Philosophy */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "2.4px",
              color: COLORS.white,
            }}
          >
            NEXOVATE
          </span>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "9px",
              letterSpacing: "1.8px",
              color: "rgba(255, 255, 255, 0.35)",
              marginTop: "2px",
            }}
          >
            INTELLIGENCE DESIGNED TO EVOLVE
          </span>
        </div>

        {/* Center: Mobile Experience Label (Hidden on small mobile) */}
        {!isMobile && (
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "9px",
              letterSpacing: "2px",
              color: "rgba(255, 255, 255, 0.35)",
              fontWeight: 500,
            }}
          >
            MOBILE EXPERIENCE / 2026
          </div>
        )}

        {/* Right: Status Indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: COLORS.cream,
              boxShadow: "0 0 8px rgba(241, 229, 198, 0.6)",
              animation: "pulseDot 2s infinite ease-in-out",
            }}
          />
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "9px",
              letterSpacing: "1.5px",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 500,
            }}
          >
            DIGITAL PRODUCT
          </span>
        </div>
      </header>

      {/* =================================================== */}
      {/* 3. EDITORIAL INTRO ROW */}
      {/* =================================================== */}
      <section
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile ? "24px 20px 20px 20px" : "32px 40px 24px 40px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? "8px" : "40px",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "2px",
            color: COLORS.cream,
          }}
        >
          01 — EXPERIENCE
        </div>

        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            lineHeight: "19px",
            color: "rgba(255, 255, 255, 0.45)",
            maxWidth: "380px",
            margin: 0,
            textAlign: isMobile ? "left" : "right",
          }}
        >
          A digital environment for people
          <br />
          who learn, build and shape what comes next.
        </p>
      </section>

      {/* =================================================== */}
      {/* 4. THREE PHONE SHOWCASE */}
      {/* =================================================== */}
      <main
        style={{
          flex: 1,
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile
            ? "10px 20px 60px 20px"
            : isTablet
            ? "20px 24px 60px 24px"
            : "20px 40px 80px 40px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: isMobile ? "flex-start" : "center",
          gap: isMobile ? "40px" : isTablet ? "32px" : "48px",
          overflowX: isMobile ? "hidden" : "auto",
          zIndex: 10,
          position: "relative",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ========================================== */}
        {/* PHONE 01: IDENTITY */}
        {/* ========================================== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: isMobile ? "100%" : `${renderedWidth}px`,
            maxWidth: `${renderedWidth}px`,
            animation: "fadeInPhone 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards",
          }}
        >
          {/* Label outside phone */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "14px",
              padding: "0 8px",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "9px",
                letterSpacing: "2px",
                color: "rgba(255, 255, 255, 0.35)",
                fontWeight: 600,
              }}
            >
              01 // IDENTITY
            </span>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "9px",
                letterSpacing: "1.5px",
                color: "rgba(255, 255, 255, 0.25)",
              }}
            >
              PHILOSOPHY
            </span>
          </div>

          {/* Phone Scaled Container */}
          <div
            style={{
              width: `${DIMENSIONS.BASE_WIDTH}px`,
              height: `${DIMENSIONS.BASE_HEIGHT}px`,
              transform: `scale(${phoneScale})`,
              transformOrigin: "top center",
              marginBottom: isMobile ? `${renderedHeight - DIMENSIONS.BASE_HEIGHT}px` : 0,
            }}
          >
            <PhoneFrame>
              <ScreenOne />
            </PhoneFrame>
          </div>
        </div>

        {/* ========================================== */}
        {/* PHONE 02: LEARN */}
        {/* ========================================== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: isMobile ? "100%" : `${renderedWidth}px`,
            maxWidth: `${renderedWidth}px`,
            animation: "fadeInPhone 0.6s cubic-bezier(0.16, 1, 0.3, 1) 150ms forwards",
          }}
        >
          {/* Label outside phone */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "14px",
              padding: "0 8px",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "9px",
                letterSpacing: "2px",
                color: "rgba(255, 255, 255, 0.35)",
                fontWeight: 600,
              }}
            >
              02 // LEARN
            </span>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "9px",
                letterSpacing: "1.5px",
                color: "rgba(255, 255, 255, 0.25)",
              }}
            >
              PROGRAMS
            </span>
          </div>

          {/* Phone Scaled Container */}
          <div
            style={{
              width: `${DIMENSIONS.BASE_WIDTH}px`,
              height: `${DIMENSIONS.BASE_HEIGHT}px`,
              transform: `scale(${phoneScale})`,
              transformOrigin: "top center",
              marginBottom: isMobile ? `${renderedHeight - DIMENSIONS.BASE_HEIGHT}px` : 0,
            }}
          >
            <PhoneFrame lightMode={true}>
              <ScreenTwo />
            </PhoneFrame>
          </div>
        </div>

        {/* ========================================== */}
        {/* PHONE 03: BUILD */}
        {/* ========================================== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: isMobile ? "100%" : `${renderedWidth}px`,
            maxWidth: `${renderedWidth}px`,
            animation: "fadeInPhone 0.6s cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards",
          }}
        >
          {/* Label outside phone */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "14px",
              padding: "0 8px",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "9px",
                letterSpacing: "2px",
                color: "rgba(255, 255, 255, 0.35)",
                fontWeight: 600,
              }}
            >
              03 // BUILD
            </span>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "9px",
                letterSpacing: "1.5px",
                color: "rgba(255, 255, 255, 0.25)",
              }}
            >
              FUTURE LABS
            </span>
          </div>

          {/* Phone Scaled Container */}
          <div
            style={{
              width: `${DIMENSIONS.BASE_WIDTH}px`,
              height: `${DIMENSIONS.BASE_HEIGHT}px`,
              transform: `scale(${phoneScale})`,
              transformOrigin: "top center",
              marginBottom: isMobile ? `${renderedHeight - DIMENSIONS.BASE_HEIGHT}px` : 0,
            }}
          >
            <PhoneFrame>
              <ScreenThree />
            </PhoneFrame>
          </div>
        </div>
      </main>

      {/* Keyframe animation styles */}
      <style>{`
        @keyframes fadeInPhone {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export const NexovateShowcase = Showcase;
export default Showcase;
