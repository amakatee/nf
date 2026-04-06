// components/navbar/components/Logo.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoProps } from "../types";
import { navbarAnimations } from "../animations";
import Image from "next/image";

const Logo: React.FC<LogoProps> = ({ 
  text, 
  href = "/", 
  showEmoji = true 
}) => {
  const logoRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (logoRef.current) {
      navbarAnimations.logoHover(logoRef.current, true);
    }
  };

  const handleMouseLeave = () => {
    if (logoRef.current) {
      navbarAnimations.logoHover(logoRef.current, false);
    }
  };

  return (
    <Link href={href} className="flex items-center gap-1 group">
      <div
        ref={logoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          " flex items-center",
          " transform -rotate-[0.5deg]",
          "transition-all duration-300 cursor-pointer",
          "hover:rotate-0 hover:scale-105",
          
        )}
      >  <Image className="text-2xl text-[#7f6e5f]  transition-transform duration-300 group-hover:rotate-12" src="/images/fox2.png" alt="fox logo" width="50" height="50" />

        <div className="hidden sm:block text-[#0b2249] ml-[-4] mt-1 text-xl font-semibold tracking-tight">
          
          {text}
        </div>
      </div>
      {/* {showEmoji && (
        <span className="text-2xl text-[#7f6e5f] ml-1 transition-transform duration-300 group-hover:rotate-12">
          ⚱️
        </span>
      )} */}
    </Link>
  );
};

export default Logo;