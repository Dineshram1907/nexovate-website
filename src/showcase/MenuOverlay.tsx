import React, { useState } from "react";
import { COLORS } from "./constants/colors";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: "01", label: "HOME", path: "/" },
  { id: "02", label: "ABOUT", path: "/about" },
  { id: "03", label: "PROGRAMS", path: "/programs" },
  { id: "04", label: "PROJECTS", path: "/projects" },
  { id: "05", label: "CONTACT", path: "/contact" },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.surface,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 24px 36px 24px",
        boxSizing: "border-box",
        animation: "fadeInMenu 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
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
              fontSize: "8px",
              letterSpacing: "1.5px",
              color: COLORS.textMuted,
              marginTop: "2px",
            }}
          >
            NAVIGATION MATRIX
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "22px",
            border: `1px solid ${COLORS.border}`,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: COLORS.white,
            padding: 0,
            transition: "transform 0.12s ease, background-color 0.2s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1L13 13M1 13L13 1" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px", margin: "auto 0" }}>
        {MENU_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              onClose();
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "14px",
              background: "transparent",
              border: "none",
              padding: "4px 0",
              cursor: "pointer",
              textAlign: "left",
              outline: "none",
              transition: "transform 0.15s ease",
              transform: hoveredIdx === idx ? "translateX(6px)" : "translateX(0)",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "1.5px",
                color: hoveredIdx === idx ? COLORS.cream : COLORS.textMuted,
                transition: "color 0.2s ease",
              }}
            >
              {item.id}
            </span>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "34px",
                fontWeight: 300,
                letterSpacing: "-1px",
                color: hoveredIdx === idx ? COLORS.cream : COLORS.white,
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "2px",
              color: COLORS.cream,
              margin: 0,
              lineHeight: "16px",
            }}
          >
            LEARN.
            <br />
            BUILD.
            <br />
            SHAPE TOMORROW.
          </p>
        </div>

        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "9px",
            letterSpacing: "1.5px",
            color: COLORS.textMuted,
          }}
        >
          SYS // V2.6
        </span>
      </div>

      <style>{`
        @keyframes fadeInMenu {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
