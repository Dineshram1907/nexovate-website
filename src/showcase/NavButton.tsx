import React, { useState } from "react";

interface NavButtonProps {
  onClick: () => void;
  lightMode?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({ onClick, lightMode = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  const borderColor = lightMode ? "rgba(10, 10, 10, 0.15)" : "rgba(255, 255, 255, 0.15)";
  const bgColor = lightMode ? "rgba(10, 10, 10, 0.04)" : "rgba(255, 255, 255, 0.04)";
  const lineColor = lightMode ? "#0A0A0A" : "#FFFFFF";

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      aria-label="Open navigation menu"
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "22px",
        border: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        cursor: "pointer",
        transition: "transform 0.12s ease, background-color 0.2s ease",
        transform: isPressed ? "scale(0.92)" : "scale(1)",
        outline: "none",
        padding: 0,
      }}
    >
      {/* 3 lines: 2 long lines, 1 short line */}
      <span
        style={{
          width: "14px",
          height: "1.5px",
          backgroundColor: lineColor,
          borderRadius: "1px",
          transition: "background-color 0.2s ease",
        }}
      />
      <span
        style={{
          width: "14px",
          height: "1.5px",
          backgroundColor: lineColor,
          borderRadius: "1px",
          transition: "background-color 0.2s ease",
        }}
      />
      <span
        style={{
          width: "9px",
          height: "1.5px",
          backgroundColor: lineColor,
          borderRadius: "1px",
          alignSelf: "flex-end",
          marginRight: "15px",
          transition: "background-color 0.2s ease",
        }}
      />
    </button>
  );
};
