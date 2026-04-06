// components/navbar/animations/mobile.ts
import gsap from "gsap";

export const mobileMenuAnimations = {
  // Panel slide animation
  panelSlide: (panel: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(panel,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power4.out" }
      );
    } else {
      gsap.to(panel, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power4.in"
      });
    }
  },

  // Staggered navigation items
  navItemsStagger: (items: HTMLElement[], isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(items,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.05,
          ease: "power2.out"
        }
      );
    }
  },

  // Contact section animation
  contactSection: (section: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(section,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  },

  // Social links animation
  socialLinks: (links: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(links,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  },

  // Footer animation
  footerSection: (footer: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(footer,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  },

  // Backdrop fade
  backdropFade: (backdrop: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }
};