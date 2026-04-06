// components/navbar/animations/index.ts
import gsap from "gsap";

export const navbarAnimations = {
  // Initial entrance animation
  entrance: (elements: {
    navbar: HTMLElement | null;
    logo: HTMLElement | null;
    navItems: (HTMLElement | null)[];
    actions: HTMLElement | null;
  }) => {
    const { navbar, logo, navItems, actions } = elements;
    const tl = gsap.timeline();

    if (navbar) {
      tl.fromTo(navbar,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    if (logo) {
      tl.fromTo(logo,
        { scale: 0.9, rotation: -2 },
        { 
          scale: 1, 
          rotation: 0, 
          duration: 0.6, 
          ease: "elastic.out(1, 0.5)" 
        },
        "-=0.4"
      );
    }

    if (navItems.length) {
      tl.fromTo(navItems.filter(Boolean),
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out" 
        },
        "-=0.3"
      );
    }

    if (actions) {
      tl.fromTo(actions,
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          ease: "back.out(1.7)" 
        },
        "-=0.2"
      );
    }

    return tl;
  },

  // Hover effects
  logoHover: (logo: HTMLElement, isEnter: boolean) => {
    gsap.to(logo, {
      scale: isEnter ? 1.05 : 1,
      rotation: isEnter ? -1 : 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
    });
  },

  navItemHover: (item: HTMLElement, isEnter: boolean) => {
    const link = item.querySelector('a');
    if (!link) return;

    gsap.to(link, {
      y: isEnter ? -2 : 0,
      color: isEnter ? "#000000" : "#3a3a3a",
      duration: 0.3,
      ease: "power2.out",
    });

    // Animate pseudo-element for underline
    if (isEnter) {
      gsap.set(link, {
        "--underline-width": "100%",
      });
    } else {
      gsap.set(link, {
        "--underline-width": "0%",
      });
    }
  },

  buttonHover: (button: HTMLElement, isEnter: boolean) => {
    gsap.to(button, {
      scale: isEnter ? 1.05 : 1,
      backgroundColor: isEnter ? "#2a2a2a" : "#1e1e1e",
      boxShadow: isEnter 
        ? "0 8px 16px rgba(0, 0, 0, 0.12)" 
        : "0 4px 8px rgba(0, 0, 0, 0.05)",
      duration: 0.3,
      ease: "power2.out",
    });
  },

  // Mobile menu animations
  mobileMenu: (menu: HTMLElement, isOpen: boolean) => {
    if (isOpen) {
      gsap.fromTo(menu,
        { 
          height: 0, 
          opacity: 0,
          display: "none"
        },
        { 
          height: "auto", 
          opacity: 1,
          display: "block",
          duration: 0.6,
          ease: "power4.inOut"
        }
      );

      const items = menu.querySelectorAll('.mobile-nav-item');
      gsap.fromTo(items,
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2
        }
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          menu.style.display = "none";
        }
      });
    }
  },

  // Hamburger to X animation
  hamburgerToX: (spans: HTMLSpanElement[], isOpen: boolean) => {
    if (isOpen) {
      gsap.to(spans[0], { rotate: 45, y: 8, duration: 0.3, ease: "power2.inOut" });
      gsap.to(spans[1], { opacity: 0, duration: 0.2 });
      gsap.to(spans[2], { rotate: -45, y: -8, duration: 0.3, ease: "power2.inOut" });
    } else {
      gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    }
  },

  // Scroll effect
  scrollUpdate: (navbar: HTMLElement, scrolled: boolean) => {
    gsap.to(navbar, {
      backgroundColor: scrolled 
        ? "rgba(255, 255, 255, 0.95)" 
        : "#ffffff",
      boxShadow: scrolled 
        ? "0 8px 20px rgba(0, 0, 0, 0.06)" 
        : "0 4px 12px rgba(0, 0, 0, 0.02)",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      duration: 0.3,
      ease: "power2.out"
    });
  },
};