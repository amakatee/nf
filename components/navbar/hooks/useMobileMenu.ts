// components/navbar/hooks/useMobileMenu.ts
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return {
    isOpen,
    menuRef,
    hamburgerRef,
    toggleMenu,
    closeMenu,
  };
};