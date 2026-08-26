import React from "react";

interface PaperCardProps {
  children: React.ReactNode;
  className?: string;
  tape?: boolean;
  tapeColor?: string;
  rotate?: string; // e.g. "rotate-1" or "-rotate-1"
  bg?: string;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  children,
  className = "",
  tape = false,
  tapeColor = "bg-[#F97316]/30",
  rotate = "",
  bg = "bg-white",
}) => {
  return (
    <div
      className={`relative ${bg} rounded-3xl border border-[#101536]/10 p-6 shadow-md transition-all duration-300 ${rotate} ${className}`}
    >
      {tape && (
        <div
          className={`absolute -top-3 right-6 w-10 h-4 ${tapeColor} rounded-xs shadow-xs pointer-events-none transform rotate-3 backdrop-blur-xs`}
        />
      )}
      {children}
    </div>
  );
};
