// components/navbar/components/MobileMenu.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MobileMenuProps } from "../types";

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ isOpen, items, onClose, showSignIn = true, signInHref = "/signin", onSignInClick }, ref) => {
    const menuPanelRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    // GSAP animations for mobile menu
    useEffect(() => {
      if (!menuPanelRef.current) return;

      const ctx = gsap.context(() => {
        if (isOpen) {
          // First ensure the menu is visible
          gsap.set(menuPanelRef.current, { display: 'block' });
          
          // Master timeline for menu open
          const tl = gsap.timeline();

          // Panel slide animation
          tl.fromTo(menuPanelRef.current,
            { 
              y: "-100%",
              opacity: 0,
            },
            { 
              y: "0%",
              opacity: 1,
              duration: 0.6,
              ease: "power4.out",
              clearProps: "transform" // Clean up after animation
            }
          );

          // Stagger navigation items
          if (navItemsRef.current.length > 0) {
            tl.fromTo(navItemsRef.current.filter(Boolean),
              { 
                y: 30,
                opacity: 0,
              },
              { 
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out"
              },
              "-=0.3"
            );
          }

          // Contact info animation
          if (contactRef.current) {
            tl.fromTo(contactRef.current,
              { 
                y: 20,
                opacity: 0,
              },
              { 
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
              },
              "-=0.2"
            );
          }

          // Social links animation
          if (socialRef.current) {
            tl.fromTo(socialRef.current,
              { 
                y: 20,
                opacity: 0,
              },
              { 
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
              },
              "-=0.2"
            );
          }

          // Footer animation
          if (footerRef.current) {
            tl.fromTo(footerRef.current,
              { 
                y: 20,
                opacity: 0,
              },
              { 
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
              },
              "-=0.2"
            );
          }
        } else {
          // Close animation
          gsap.to(menuPanelRef.current, {
            y: "-100%",
            opacity: 0,
            duration: 0.5,
            ease: "power4.in",
            onComplete: () => {
              if (menuPanelRef.current) {
                menuPanelRef.current.style.display = "none";
              }
            }
          });
        }
      });

      return () => ctx.revert();
    }, [isOpen]);

    return (
      <div
        ref={ref}
        className="fixed inset-0 top-16 md:hidden z-40 pointer-events-none"
        style={{ display: isOpen ? "block" : "none" }}
        aria-hidden={!isOpen}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />
        
        {/* Menu Panel */}
        <div
          ref={menuPanelRef}
          className="absolute top-0 left-0 right-0 bg-white shadow-xl rounded-b-3xl overflow-hidden pointer-events-auto"
          style={{ 
            display: "none",
            transform: "translateY(-100%)",
            opacity: 0
          }}
        >
          <div className="px-6 py-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Navigation Items */}
            <nav className="space-y-1 mb-8">
              {items.map((item, index) => (
                <Link
                  key={item.label}
                  ref={(el) => {
                    if (el) navItemsRef.current[index] = el;
                  }}
                  href={item.href}
                  className="flex items-center justify-between py-3 text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-100 last:border-0 group"
                  onClick={onClose}
                  target={item.target}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-[#b7a99a] text-white px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <svg 
                    className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Contact Section */}
            <div ref={contactRef} className="mb-6 space-y-4">
              <div>
                <a 
                  href="mailto:northernfox@mail.ru" 
                  className="text-lg text-gray-600 hover:text-gray-900 transition-colors inline-block contact-link"
                  onClick={onClose}
                >
                  northernfox@mail.ru
                </a>
              </div>
              <div>
                <a 
                  href="tel:+79847738223" 
                  className="text-lg text-gray-600 hover:text-gray-900 transition-colors inline-block contact-link"
                  onClick={onClose}
                >
                  +79847738223
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="mb-8">
              <div className="flex items-center gap-8">
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium social-link"
                  onClick={onClose}
                >
                  Be
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium social-link"
                  onClick={onClose}
                >
                  in
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium social-link"
                  onClick={onClose}
                >
                  X
                </a>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium social-link"
                  onClick={onClose}
                >
                  f
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div ref={footerRef} className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-900 transition-colors" onClick={onClose}>
                  Privacy
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors" onClick={onClose}>
                  Terms
                </a>
                <a href="#" className="hover:text-gray-900 transition-colors" onClick={onClose}>
                  Sitemap
                </a>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Northern Fox
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;