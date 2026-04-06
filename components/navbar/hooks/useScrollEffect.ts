// components/navbar/hooks/useScrollEffect.ts
import { useState, useEffect, useCallback } from "react";
import { SCROLL_THRESHOLD } from "../constants";

export const useScrollEffect = (threshold: number = SCROLL_THRESHOLD) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isScrolled;
};