'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function NeonSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);   // container ref for GSAP context
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const glowRef3 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Create a GSAP context scoped to the section element
    const ctx = gsap.context(() => {
      // CYAN GLOW (main)
      gsap.to(glowRef1.current, {
        x: 40,
        y: -30,
        scale: 1.1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // TEAL GLOW (secondary)
      gsap.to(glowRef2.current, {
        x: -30,
        y: 20,
        scale: 1.05,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // RED ACCENT (pulse)
      gsap.to(glowRef3.current, {
        scale: 1.2,
        opacity: 0.4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, sectionRef); // <-- pass the container ref here

    return () => ctx.revert(); // clean up on unmount
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden ">
      {/* Base gradient layer (no solid background needed, it's covered by the gradient div) */}
      <div className="absolute  rounded-t-3xl inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-black" />

      {/* CYAN GLOW */}
      <div
        ref={glowRef1}
        className="
          pointer-events-none
          absolute 
          top-[-20%] right-[-10%] 
          w-[600px] h-[600px] 
          bg-cyan-400/20 
          rounded-full 
          blur-[120px]
          will-change-transform
        "
      />

      {/* TEAL GLOW */}
      <div
        ref={glowRef2}
        className="
          pointer-events-none
          absolute 
          bottom-[-20%] left-[20%] 
          w-[500px] h-[500px] 
          bg-teal-400/10 
          rounded-full 
          blur-[100px]
          will-change-transform
        "
      />

      {/* RED ACCENT */}
      <div
        ref={glowRef3}
        className="
          pointer-events-none
          absolute 
          bottom-[10%] left-[10%] 
          w-[200px] h-[200px] 
          bg-red-500/20 
          rounded-full 
          blur-[80px]
          will-change-transform
        "
      />

      {/* LIGHT BEAM */}
      <div className="
        pointer-events-none
        absolute 
        top-0 right-[25%] 
        w-[2px] h-full 
        bg-gradient-to-b 
        from-cyan-300/40 
        via-transparent 
        to-transparent
      " />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto  ">
        {children}
      </div>
    </section>
  );
}