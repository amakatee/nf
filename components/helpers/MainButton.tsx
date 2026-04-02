// components/LetsTalkButton.tsx

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LetsTalkButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const LetsTalkButton = forwardRef<HTMLButtonElement, LetsTalkButtonProps>(
  ({ className, children = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group relative flex items-center justify-center",

          // responsive size
          "w-full max-w-[420px]",
          "h-[55px] sm:h-[64px] md:h-[72px]",
          "px-6 sm:px-8 md:px-10",

          "rounded-full overflow-hidden select-none",

          // typography (better for Cyrillic)
          "text-[0.95rem] sm:text-base font-medium tracking-[0.02em] text-white",

          // Orizon-style gradient
          "bg-[linear-gradient(90deg,#2049e9_0%,#2b01d4_50%,#2049e9_100%)]",

          // border
          "border-[1.2px] border-[#a7c2f9]/80",

          // shadow
          "shadow-[0_14px_34px_rgba(0,0,0,0.35)]",

          // transitions
          "transition-all duration-300 ease-out",

          // hover
          "hover:-translate-y-[1px]",
          "hover:brightness-[1.05]",
          "hover:shadow-[0_18px_38px_rgba(0,0,0,0.38)]",

          // press
          "active:scale-[0.97]",

          // accessibility
          "focus-visible:outline-none",
          "focus-visible:ring-4 focus-visible:ring-[#a7c2f9]/30",

          className
        )}
        {...props}
      >
        {/* highlight */}
        <span
          className="
          pointer-events-none
          absolute inset-0 rounded-full
          bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.08)_40%,transparent_70%)]
          opacity-40
        "
        />

        {/* text */}
        <span className="relative z-10">{children}</span>

        {/* arrow */}
        <svg
          viewBox="0 0 24 24"
          className="relative z-10 ml-3 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" />
          <path d="M9 7h8v8" />
        </svg>
      </button>
    );
  }
);

LetsTalkButton.displayName = "LetsTalkButton";

export default LetsTalkButton;