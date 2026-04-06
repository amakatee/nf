// components/navbar/components/NavLinks.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavLinksProps } from "../types";
import { navbarAnimations } from "../animations";

const NavLinks: React.FC<NavLinksProps> = ({ 
  items, 
  variant = "desktop",
  onItemClick 
}) => {
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    if (variant === "desktop" && itemRefs.current[index]) {
      navbarAnimations.navItemHover(itemRefs.current[index]!, true);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (variant === "desktop" && itemRefs.current[index]) {
      navbarAnimations.navItemHover(itemRefs.current[index]!, false);
    }
  };

  if (variant === "mobile") {
    return (
      <div className="py-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="mobile-nav-item block px-3 py-2 text-base font-medium text-[#3a3a3a] hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
            onClick={onItemClick}
            target={item.target}
          >
            <div className="flex items-center justify-between">
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-[#b7a99a] text-white px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <ul className="flex items-center gap-8">
      {items.map((item, index) => (
        <li
          key={item.label}
          ref={(el) => {
            if (el) itemRefs.current[index] = el;
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="relative group"
        >
          <Link
            href={item.href}
            className={cn(
              "text-[#0b2249] font-normal text-sm",
              "transition-colors duration-200",
              "hover:text-black relative",
              "after:content-[''] after:absolute after:bottom-[-2px]",
              "after:left-0 after:w-[var(--underline-width,0%)] after:h-[2px]",
              "after:bg-[#0b2249] after:transition-all after:duration-300"
            )}
            target={item.target}
          >
            <span className="flex items-center gap-1">
              {item.label}
              {item.badge && (
                <span className="text-xs bg-[#0b2249] text-white px-1.5 py-0.5 rounded-full ml-1">
                  {item.badge}
                </span>
              )}
            </span>
          </Link>

          {/* Dropdown Menu */}
          {item.dropdown && (
            <div className={cn(
              "absolute top-full left-0 mt-2 w-64",
              "bg-white rounded-lg shadow-xl border border-gray-100",
              "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
              "transition-all duration-300 transform",
              "group-hover:translate-y-0 translate-y-2",
              "z-50"
            )}>
              <div className="py-2">
                {item.dropdown.map((dropdownItem) => (
                  <Link
                    key={dropdownItem.label}
                    href={dropdownItem.href}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {dropdownItem.icon && (
                        <div className="flex-shrink-0 mt-0.5">
                          {dropdownItem.icon}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#0b2249]">
                            {dropdownItem.label}
                          </span>
                          {dropdownItem.badge && (
                            <span className="text-xs bg-[#0b2249] text-white px-1.5 py-0.5 rounded-full">
                              {dropdownItem.badge}
                            </span>
                          )}
                        </div>
                        {dropdownItem.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {dropdownItem.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;