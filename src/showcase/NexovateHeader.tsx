import React from "react";
import { HamburgerButton } from "./HamburgerButton";

interface NexovateHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  className?: string;
}

export const NexovateHeader: React.FC<NexovateHeaderProps> = ({
  onMenuToggle,
  isMenuOpen,
  className = "",
}) => {
  return (
    <header
      className={`w-full pt-[48px] px-[19px] flex items-center justify-between z-40 relative select-none font-manrope ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[17px] font-normal tracking-[0.08em] text-white uppercase">
          NEXOVATE
        </span>
      </div>

      <HamburgerButton isOpen={isMenuOpen} onClick={onMenuToggle} />
    </header>
  );
};

export default NexovateHeader;
