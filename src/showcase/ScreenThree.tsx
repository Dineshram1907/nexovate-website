import React, { useState } from "react";
import { COLORS } from "./constants/colors";
import { NavButton } from "./NavButton";
import { MenuOverlay } from "./MenuOverlay";
import { TypewriterText } from "./TypewriterText";
import { ProjectCard } from "./ProjectCard";

export const ScreenThree: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.surface,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "42px 20px 24px 20px",
        boxSizing: "border-box",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Background Matrix */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(241, 229, 198, 0.03) 0%, transparent 50%), radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* 1. Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              letterSpacing: "1.5px",
              color: COLORS.white,
            }}
          >
            NEXOVATE
          </span>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "8px",
              letterSpacing: "1.6px",
              color: COLORS.textMuted,
              marginTop: "2px",
            }}
          >
            FUTURE LABS / 03
          </span>
        </div>

        <NavButton onClick={() => setMenuOpen(true)} />
      </div>

      {/* 2. Header Titles */}
      <div style={{ margin: "10px 0 0 0", textAlign: "left", width: "100%" }}>
        <h2
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "48px",
            fontWeight: 300,
            letterSpacing: "-2px",
            color: COLORS.white,
            margin: "0 0 4px 0",
            lineHeight: 1,
          }}
        >
          <TypewriterText text="PROJECTS" delay={500} speed={40} />
        </h2>

        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            color: COLORS.textSecondary,
            margin: 0,
            letterSpacing: "-0.2px",
          }}
        >
          BUILD WHAT DOESN'T EXIST YET.
        </p>
      </div>

      {/* 3. Futuristic Project Visual Card */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ProjectCard
          index="01"
          category="FUTURE LAB"
          title="AUTONOMOUS COGNITION MATRIX"
          description="Experiments at the intersection of intelligence, adaptive systems and human potential."
        />
      </div>

      {/* 4. Bottom Lab Telemetry */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "1.8px",
            color: COLORS.cream,
          }}
        >
          03 / 03
        </span>

        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "1.8px",
            color: COLORS.textMuted,
          }}
        >
          ACTIVE EXPERIMENTS
        </span>
      </div>

      {/* Shared Navigation Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};
