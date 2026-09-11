import React from "react";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`w-[36px] h-[36px] flex flex-col justify-center items-end gap-[5px] p-1.5 focus:outline-none cursor-pointer transition-transform active:scale-95 ${className}`}
    >
      {isOpen ? (
        <div className="relative w-5 h-5 flex items-center justify-center">
          <span className="absolute w-5 h-[1.5px] bg-white rotate-45 transition-transform" />
          <span className="absolute w-5 h-[1.5px] bg-white -rotate-45 transition-transform" />
        </div>
      ) : (
        <>
          {/* Top long line */}
          <span className="w-5 h-[1.5px] bg-white rounded-full block transition-all" />
          {/* Middle long line */}
          <span className="w-5 h-[1.5px] bg-white rounded-full block transition-all" />
          {/* Bottom shorter line */}
          <span className="w-3.5 h-[1.5px] bg-white rounded-full block transition-all" />
        </>
      )}
    </button>
  );
};

export default HamburgerButton;
