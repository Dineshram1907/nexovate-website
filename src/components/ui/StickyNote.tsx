import React from "react";

interface StickyNoteProps {
  children: React.ReactNode;
  className?: string;
  color?: "yellow" | "blue" | "orange" | "green" | "pink";
  tapePosition?: "top-right" | "top-left" | "top-center";
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  className = "",
  color = "yellow",
  tapePosition = "top-right",
}) => {
  const bgColors = {
    yellow: "bg-[#FEF3C7] border-[#F59E0B]/30 text-[#101536]",
    blue: "bg-[#E0F2FE] border-[#38BDF8]/30 text-[#101536]",
    orange: "bg-[#FFEDD5] border-[#F97316]/30 text-[#101536]",
    green: "bg-[#D1FAE5] border-[#34D399]/30 text-[#101536]",
    pink: "bg-[#FCE7F3] border-[#F472B6]/30 text-[#101536]",
  };

  const tapePositions = {
    "top-right": "-top-3 right-4 rotate-6",
    "top-left": "-top-3 left-4 -rotate-6",
    "top-center": "-top-3 left-1/2 -translate-x-1/2 rotate-1",
  };

  return (
    <div className={`relative p-5 rounded-2xl border ${bgColors[color]} shadow-md backdrop-blur-xs font-mono select-none ${className}`}>
      <div className={`absolute w-10 h-4 bg-[#F97316]/35 rounded-xs shadow-xs pointer-events-none backdrop-blur-xs ${tapePositions[tapePosition]}`} />
      {children}
    </div>
  );
};
