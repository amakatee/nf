// components/SolutionCard.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { FC } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  content: string;
  author?: string;
  mode: 'question' | 'solution';
}

const SolutionCard: FC<CardProps> = ({
  content,
  author = '',
  mode,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isQuestion = mode === 'question';

  // Разная амплитуда параллакса в зависимости от типа карточки
  const parallaxY = isQuestion ? 30 : 35;

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        yPercent: -parallaxY,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, cardRef);

    return () => {
      ctx.revert();
    };
  }, [parallaxY]);

  const bgOpacity = isQuestion 
    ? 'bg-[#0a0c18]/78' 
    : 'bg-[#0f1629]/18';

  const blurStrength = isQuestion 
    ? 'backdrop-blur-xl backdrop-saturate-50' 
    : 'backdrop-blur-sm backdrop-saturate-70';

  const borderOpacity = isQuestion 
    ? 'border-white/[0.10] hover:border-white/[0.18]' 
    : 'border-white/[0.16] hover:border-white/[0.32]';

  const textOpacity = isQuestion 
    ? 'text-white/92' 
    : 'text-white/97';

  const hoverAccent = isQuestion
    ? 'hover:shadow-[0_8px_32px_rgba(0,0,0,0.38)]'
    : 'hover:shadow-[0_16px_48px_rgba(80,140,255,0.10)] hover:ring-1 hover:ring-blue-300/15';

  return (
    <div
      ref={cardRef}
      className={`
        group relative rounded-3xl overflow-hidden
        ${bgOpacity}
        ${blurStrength}
        ${borderOpacity}
        shadow-2xl shadow-black/30
        transition-all duration-800 ease-out
        hover:scale-[1.008] hover:-translate-y-0.5
        ${hoverAccent}
        /* Улучшаем рендеринг для карточек с backdrop‑filter */
        ${!isQuestion ? 'backface-visibility-hidden transform-gpu will-change-[backdrop-filter]' : ''}
      `}
    >
      <div
        className={`
          absolute inset-0 pointer-events-none
          bg-gradient-to-r from-transparent via-white/[${isQuestion ? '0.025' : '0.07'}] to-transparent
          opacity-0 group-hover:opacity-100
          transition-all duration-2000 ease-in-out
          -translate-x-full group-hover:translate-x-full
          skew-x-[10deg]
        `}
      />

      <div className="relative z-10 px-4 py-5 md:px-12 md:py-14 h-full flex flex-col">
        <p
          className={`
            mb-auto ${textOpacity} font-light
            text-[15px] leading-relaxed tracking-wide
            md:text-lg md:leading-[1.65]
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
          `}
        >
          {content}
        </p>

        {author && (
          <p
            className={`
              mt-8 text-[10px] md:text-sm font-medium tracking-widest uppercase
              ${isQuestion ? 'text-slate-300/75' : 'text-blue-200/70'}
              opacity-80 group-hover:opacity-100 transition-opacity duration-500
            `}
          >
            {author}
          </p>
        )}
      </div>

      <div
        className={`
          absolute inset-0 pointer-events-none mix-blend-overlay
          opacity-[${isQuestion ? '0.04' : '0.015'}]
          bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjg1IiBudW1PY3RhdmVzPSIxLjUiIC8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2YpIiBvcGFjaXR5PSIwLjA2IiAvPjwvc3ZnPg==')]
        `}
      />
    </div>
  );
};

export default SolutionCard;