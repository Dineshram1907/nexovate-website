import React, { useState } from "react";
import { COLORS } from "./constants/colors";
import { NavButton } from "./NavButton";
import { MenuOverlay } from "./MenuOverlay";
import { TypewriterText } from "./TypewriterText";
import { ProgramRow } from "./ProgramRow";

export const ScreenTwo: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.offWhite,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "42px 20px 28px 20px",
        boxSizing: "border-box",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* 1. Header (Dark text on light background) */}
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
              color: COLORS.darkText,
            }}
          >
            NEXOVATE
          </span>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "8px",
              letterSpacing: "1.6px",
              color: COLORS.darkTextMuted,
              marginTop: "2px",
            }}
          >
            LEARNING ENGINE / 02
          </span>
        </div>

        <NavButton onClick={() => setMenuOpen(true)} lightMode={true} />
      </div>

      {/* 2. Top Label & Main Headline (y: ~150) */}
      <div style={{ margin: "14px 0 0 0", textAlign: "left", width: "100%" }}>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "2px",
            color: COLORS.darkTextMuted,
            display: "block",
            marginBottom: "8px",
          }}
        >
          PROGRAMS / 01
        </span>

        <h2
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "54px",
            fontWeight: 300,
            lineHeight: "52px",
            letterSpacing: "-3px",
            color: COLORS.darkText,
            margin: "0 0 16px 0",
            whiteSpace: "pre-line",
          }}
        >
          <TypewriterText text={"LEARN\nWHAT'S\nNEXT."} delay={350} speed={35} />
        </h2>
      </div>

      {/* 3. Program Modules */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", alignItems: "center" }}>
        {/* Large Dark Module 01 */}
        <ProgramRow
          index="01"
          title="AI & INTELLIGENCE"
          description="Explore emerging intelligence, generative systems, and real-world implementation."
          isDarkCard={true}
        />

        {/* Second Row Module 02 */}
        <ProgramRow
          index="02"
          title="BUILD & CREATE"
          description="Turn ideas into real products and scalable technical infrastructure."
          isDarkCard={false}
        />
      </div>

      {/* 4. Bottom CTA Button */}
      <div style={{ width: "100%", marginTop: "8px" }}>
        <button
          onClick={() => {}}
          onMouseDown={() => setBtnPressed(true)}
          onMouseUp={() => setBtnPressed(false)}
          onMouseLeave={() => setBtnPressed(false)}
          onTouchStart={() => setBtnPressed(true)}
          onTouchEnd={() => setBtnPressed(false)}
          style={{
            width: "100%",
            height: "54px",
            borderRadius: "27px",
            backgroundColor: COLORS.darkText,
            color: COLORS.cream,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontFamily: "Manrope, sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            cursor: "pointer",
            outline: "none",
            transition: "transform 0.12s ease, opacity 0.2s ease",
            transform: btnPressed ? "scale(0.96)" : "scale(1)",
            boxShadow: "0 8px 20px rgba(10,10,10,0.25)",
          }}
        >
          <span>EXPLORE PROGRAMS</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Shared Navigation Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};
