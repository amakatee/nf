// components/navbar/components/NavActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavActionsProps } from "../types";
import { navbarAnimations } from "../animations";

const NavActions: React.FC<NavActionsProps> = ({
  showSignIn = true,
  showDemo = true,
  signInHref = "/signin",
  demoHref = "/demo",
  onSignInClick,
  onDemoClick,
  isMobile = false,
}) => {
  const router = useRouter();
  const demoButtonRef = React.useRef<HTMLAnchorElement>(null);

  const handleDemoHover = (isEnter: boolean) => {
    if (demoButtonRef.current) {
      navbarAnimations.buttonHover(demoButtonRef.current, isEnter);
    }
  };

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSignInClick) {
      onSignInClick();
    } else {
      router.push(signInHref);
    }
  };

  const handleDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDemoClick) {
      onDemoClick();
    } else {
      router.push(demoHref);
    }
  };

  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        {showSignIn && (
          <Link
            href={signInHref}
            onClick={handleSignIn}
            className={cn(
              "px-3 py-2 text-sm font-medium",
              "text-[#3a3a3a] hover:text-black",
              "hover:bg-gray-50 rounded-lg",
              "transition-all duration-200"
            )}
          >
            Sign in
          </Link>
        )}
        {showDemo && (
          <Link
            ref={demoButtonRef}
            href={demoHref}
            onClick={handleDemo}
            onMouseEnter={() => handleDemoHover(true)}
            onMouseLeave={() => handleDemoHover(false)}
            className={cn(
              "demo-button bg-[#0b2249] text-white",
              "px-4 py-2 rounded-3xl",
              "text-sm font-medium border border-[#0b2249]",
              "shadow-md hover:shadow-lg",
              "transition-all duration-300",
              "whitespace-nowrap",
              "inline-flex items-center tracking-wide font-normal  justify-center",
              "ml-2" // Added margin to separate from hamburger
            )}
          >
             Cвязаться
          </Link>
        )}
      </div>
    );
  }

  // Desktop version remains the same
  return (
    <div className="flex items-center gap-4">
      {showSignIn && (
        <Link
          href={signInHref}
          onClick={handleSignIn}
          className={cn(
            "text-[#0b2249] font-medium text-sm",
            "hover:text-[] transition-colors duration-200",
            "hidden sm:inline-block"
          )}
        >
          Cвязаться
        </Link>
      )}
      
      {showDemo && (
        <Link
          ref={demoButtonRef}
          href={demoHref}
          onClick={handleDemo}
          onMouseEnter={() => handleDemoHover(true)}
          onMouseLeave={() => handleDemoHover(false)}
          className={cn(
            "demo-button bg-[#0b2249] text-white",
            "px-4 py-2 sm:px-6 sm:py-2.5 rounded-full",
            "text-sm font-medium border border-[#0b2249]",
            "shadow-md hover:shadow-lg",
            "transition-all duration-300",
            "whitespace-nowrap",
            "inline-flex items-center justify-center"
          )}
        >
          Расчет
        </Link>
      )}
    </div>
  );
};

export default NavActions;