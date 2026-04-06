// components/navbar/components/HamburgerButton.tsx
"use client";

import React, { forwardRef } from "react";
import { HamburgerButtonProps } from "../types";

const HamburgerButton = forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  ({ isOpen, onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none   z-50 "
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        type="button"
      >
        <span className={`w-7 h-[1.7px] bg-[#0b2249] mb-[10px] transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        {/* <span className={`w-5 h-[1.3px] bg-black mb-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span> */}
        <span className={`w-7 h-[1.7px] bg-[#0b2249] transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
    );
  }
);

HamburgerButton.displayName = "HamburgerButton";

export default HamburgerButton;