import React from "react";
import { ArrowRight } from "lucide-react";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "cream" | "dark";
  icon?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  className = "",
  variant = "cream",
  icon = true,
}) => {
  const isCream = variant === "cream";

  return (
    <button
      onClick={onClick}
      className={`h-[52px] w-full rounded-full flex items-center justify-between px-6 font-manrope font-medium text-[20px] sm:text-[21px] tracking-tight transition-all cursor-pointer active:scale-[0.98] shadow-md group ${
        isCream
          ? "bg-[#F1E5C6] hover:bg-[#FAF0D9] text-[#0A0A0A]"
          : "bg-[#0A0A0A] hover:bg-[#191919] text-white"
      } ${className}`}
    >
      <span>{label}</span>
      {icon && (
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
            isCream ? "bg-[#0A0A0A]/10 text-[#0A0A0A]" : "bg-white/10 text-white"
          }`}
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;
