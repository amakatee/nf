// components/navbar/index.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NavbarProps } from "./types";
import { DEFAULT_NAV_ITEMS } from "./constants";
import { useScrollEffect } from "./hooks/useScrollEffect";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { navbarAnimations } from "./animations";
import Logo from "./components/Logo";
import NavLinks from "./components/NavLinks";
import NavActions from "./components/NavActions";
import MobileMenu from "./components/MobileMenu";
import HamburgerButton from "./components/HamburgerButton";
import gsap from "gsap";

const Navbar: React.FC<NavbarProps> = ({
  logoText = "北狐 Northern Fox",
  logoHref = "/",
  navItems = DEFAULT_NAV_ITEMS,
  showSignIn = true,
  showDemo = true,
  signInHref = "/contact",
  demoHref = "/demo",
  className,
  sticky = true,
  transparent = false,
}) => {
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  const isScrolled = useScrollEffect();
  const { 
    isOpen: isMobileMenuOpen, 
    menuRef, 
    hamburgerRef, 
    toggleMenu, 
    closeMenu 
  } = useMobileMenu();

  // Initial entrance animation
  useEffect(() => {
    if (!navbarRef.current) return;

    const ctx = gsap.context(() => {
      navbarAnimations.entrance({
        navbar: navbarRef.current,
        logo: logoRef.current,
        navItems: navItemsRef.current,
        actions: actionsRef.current,
      });
    });

    return () => ctx.revert();
  }, []);

  // Scroll effect
  useEffect(() => {
    if (navbarRef.current) {
      navbarAnimations.scrollUpdate(navbarRef.current, isScrolled);
    }
  }, [isScrolled]);

  // Event handlers
  const handleSignInClick = () => {
    window.location.href = signInHref;
  };

  const handleDemoClick = () => {
    window.location.href = demoHref;
  };

  return (
    <nav
      ref={navbarRef}
      className={cn(
        "w-full z-50 transition-all duration-300",
        sticky ? "fixed top-0" : "relative",
        transparent && !isScrolled ? "bg-transparent" : "bg-white",
        "border-b border-black/5",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div ref={logoRef}>
            <Logo text={logoText} href={logoHref} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 ml-8">
            <NavLinks 
              items={navItems} 
              variant="desktop"
            />
          </div>

          {/* Right Actions - Desktop */}
          <div ref={actionsRef} className="hidden md:block">
            <NavActions
              showSignIn={showSignIn}
              showDemo={showDemo}
              signInHref={signInHref}
              demoHref={demoHref}
              onSignInClick={handleSignInClick}
              onDemoClick={handleDemoClick}
            />
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-2 md:hidden">
            <NavActions
              showSignIn={false}
              showDemo={showDemo}
              signInHref={signInHref}
              demoHref={demoHref}
              onSignInClick={handleSignInClick}
              onDemoClick={handleDemoClick}
              isMobile={true}
            />
            
            <HamburgerButton
              ref={hamburgerRef}
              isOpen={isMobileMenuOpen}
              onClick={toggleMenu}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          ref={menuRef}
          isOpen={isMobileMenuOpen}
          items={navItems}
          onClose={closeMenu}
          showSignIn={showSignIn}
          signInHref={signInHref}
          onSignInClick={handleSignInClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;