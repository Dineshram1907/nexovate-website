import React, { useState } from "react";
import { COLORS } from "./constants/colors";

interface ProgramRowProps {
  index: string;
  title: string;
  description: string;
  isDarkCard?: boolean;
  onClick?: () => void;
}

export const ProgramRow: React.FC<ProgramRowProps> = ({
  index,
  title,
  description,
  isDarkCard = false,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  if (isDarkCard) {
    return (
      <div
        onClick={onClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        style={{
          width: "335px",
          height: "170px",
          backgroundColor: COLORS.surface,
          borderRadius: "24px",
          padding: "20px 22px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
          transition: "transform 0.14s ease, box-shadow 0.2s ease",
          transform: isPressed ? "scale(0.97)" : "scale(1)",
          boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "10px",
                letterSpacing: "2px",
                color: COLORS.cream,
                fontWeight: 600,
                display: "block",
                marginBottom: "4px",
              }}
            >
              MODULE / {index}
            </span>
            <h3
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "20px",
                fontWeight: 400,
                letterSpacing: "-0.5px",
                color: COLORS.white,
                margin: 0,
              }}
            >
              {title}
            </h3>
          </div>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: COLORS.textMuted,
            }}
          >
            {index}
          </span>
        </div>

        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            lineHeight: "18px",
            color: COLORS.textSecondary,
            margin: "8px 0 0 0",
          }}
        >
          {description}
        </p>

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "16px",
              backgroundColor: "rgba(241, 229, 198, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.cream,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        width: "335px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
        borderTop: "1px solid rgba(10,10,10,0.12)",
        cursor: "pointer",
        transition: "opacity 0.12s ease, transform 0.12s ease",
        transform: isPressed ? "translateX(4px)" : "translateX(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: COLORS.darkTextMuted,
            letterSpacing: "1px",
          }}
        >
          {index}
        </span>
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "17px",
            fontWeight: 500,
            letterSpacing: "-0.3px",
            color: COLORS.darkText,
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "14px",
          border: "1px solid rgba(10,10,10,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.darkText,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
};
