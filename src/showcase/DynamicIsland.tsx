import React from "react";
import { DIMENSIONS } from "./constants/dimensions";

export const DynamicIsland: React.FC = () => {
  return (
    <div
      style={{
        width: `${DIMENSIONS.ISLAND_WIDTH}px`,
        height: `${DIMENSIONS.ISLAND_HEIGHT}px`,
        backgroundColor: "#000000",
        borderRadius: "18px",
        position: "absolute",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
        boxShadow: "0 0 1px rgba(255,255,255,0.15)",
        pointerEvents: "none",
      }}
    >
      {/* Front camera lens & sensor optics */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #1c2738 0%, #080c10 70%, #000 100%)",
            boxShadow: "inset 0 0 1.5px rgba(59, 130, 246, 0.4)",
          }}
        />
        <div
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#0d1b2a",
          }}
        />
      </div>

      {/* Mic / sensor pill */}
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #151b26 0%, #050505 100%)",
        }}
      />
    </div>
  );
};
