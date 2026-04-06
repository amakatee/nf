'use client';

import React, { useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import LetsTalkButton from '../helpers/MainButton';

gsap.registerPlugin(ScrollTrigger);

export default function NorthernFoxHeroAnimated() {
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const overlayContainerRef = useRef(null);
  const overlayWordsRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  const overlayWords = useMemo(
    () => 'Northern Fox Co.'.split(' '),
    []
  );

  const headingWords = useMemo(
    () => 'Ваш надежный мост между Китаем и Россией.'.split(' '),
    []
  );

  // ---------------- GSAP ----------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        imageContainerRef.current,
        { y: 120, opacity: 0, scale: 1.08 },
        { y: 0, opacity: 1, scale: 1, duration: 1.6 },
        0
      );

      tl.fromTo(
        overlayWordsRef.current.querySelectorAll('.overlay-word'),
        { x: '-100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.8, stagger: 0.1 },
        0.4
      );

      tl.fromTo(
        headingRef.current.querySelectorAll('.heading-word'),
        { y: '120%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.7, stagger: 0.05 },
        0.9
      );

      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.2
      );

      tl.fromTo(
        buttonRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        1.4
      );

      gsap.to(overlayContainerRef.current, {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Desktop pin
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    });
    return () => pin.kill();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white pt-[var(--navbar-height)] min-h-[100svh]"
    >
      <div className="flex h-full flex-col lg:flex-row">

        {/* IMAGE */}
        <div
          ref={imageContainerRef}
          className="relative w-full lg:w-1/2 h-[42svh] lg:h-auto overflow-hidden"
        >
          <Image
            src="/images/video-poster.jpg"
            alt="Логистика"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          <div
            ref={overlayContainerRef}
            className="absolute bottom-10 left-7 z-20"
          >
            <div className="bg-black/30 text-white backdrop-blur-md px-4 py-2 rounded-md">
              <div
                ref={overlayWordsRef}
                className="flex flex-wrap text-4xl font-semibold tracking-tight"
              >
                {overlayWords.map((word, i) => (
                  <div key={i} className="overflow-hidden mr-3">
                    <div className="overlay-word">
                      {word}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="w-full lg:w-1/2 flex items-center px-8 lg:px-16 py-8">
          <div className="max-w-[560px]">

            <h1
              ref={headingRef}
              className="text-[32px] md:text-[44px] lg:text-[58px] font-light text-[#0b2249] leading-[1.1] tracking-[-0.02em] flex flex-wrap gap-y-2"
            >
              {headingWords.map((word, i) => {
                const italic = i >= 4 && i <= 6;
                return (
                  <div key={i} className="overflow-hidden pr-2">
                    <div
                      className={`heading-word ${
                        italic ? 'italic font-semibold' : 'font-light'
                      }`}
                    >
                      {word}
                    </div>
                  </div>
                );
              })}
            </h1>

            <p
              ref={paragraphRef}
              className="mt-4 text-[#0b2249]/85 text-[18px] leading-[1.9] font-light max-w-md"
            >
              Мы не просто перевозим грузы — мы берем на себя всю логистику: от
              верификации поставщиков в Китае до стопроцентной страховки и
              легального таможенного оформления. Работаем в белую, чтобы ваш
              бизнес рос без рисков.

            </p>

            <div ref={buttonRef} className="mt-8">
              <LetsTalkButton>
                Получить консультацию
              </LetsTalkButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}