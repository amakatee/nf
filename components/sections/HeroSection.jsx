'use client';

import {
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
  useEffect,
  useState
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import LetsTalkButton from '../helpers/MainButton';

// ----------------------------------------------------------------------

export default function NorthernFoxHeroAnimated() {
  const videoContainerRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const overlayWordsRef = useRef(null);
  const buttonRef = useRef(null);
  const overlayContainerRef = useRef(null);
  const imageColumnRef = useRef(null);
  const textColumnRef = useRef(null);
  
  const [mounted, setMounted] = useState(false);

  const overlayText = 'Northern Fox Co.';
  const overlayWords = useMemo(() => overlayText.split(' '), []);

  const headingText = 'Ваш надежный мост между Китаем и Россией.';
  const headingWords = useMemo(() => headingText.split(' '), []);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useLayoutEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // image container animation
      if (videoContainerRef.current) {
        tl.fromTo(
          videoContainerRef.current,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6 },
          0
        );
      }

      // overlay words
      if (overlayWordsRef.current) {
        const words = overlayWordsRef.current.querySelectorAll('.overlay-word');
        
        if (words && words.length) {
          tl.fromTo(
            words,
            { x: '-100%', opacity: 0 },
            {
              x: '0%',
              opacity: 1,
              duration: 0.8,
              stagger: 0.1
            },
            0.4
          );
        }
      }

      // heading words
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.heading-word');
        
        if (words && words.length) {
          tl.fromTo(
            words,
            { y: '100%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: 0.7,
              stagger: 0.05
            },
            0.9
          );
        }
      }

      // paragraph
      if (paragraphRef.current) {
        tl.fromTo(
          paragraphRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          1.2
        );
      }

      // button
      if (buttonRef.current) {
        const btn = buttonRef.current.querySelector('button');
        
        if (btn) {
          tl.fromTo(
            btn,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 },
            1.4
          );
        }
      }

      // STICKY SCROLL EFFECT FOR IMAGE COLUMN
      if (imageColumnRef.current) {
        // Get the second component (Home component container)
        const secondComponent = document.querySelector('#home-component');
        
        if (secondComponent) {
          // Create pin animation for image column
          ScrollTrigger.create({
            trigger: imageColumnRef.current,
            start: 'top top',
            endTrigger: secondComponent,
            end: 'top top',
            pin: true,
            pinSpacing: false,
            scrub: 1,
            id: 'image-column-pin'
          });

          // Move image column to the top when second component reaches it
          ScrollTrigger.create({
            trigger: secondComponent,
            start: 'top bottom',
            end: 'top top',
            onUpdate: (self) => {
              if (imageColumnRef.current) {
                const progress = self.progress;
                // Move image up as second component approaches
                gsap.to(imageColumnRef.current, {
                  y: -progress * 100,
                  duration: 0.1,
                  overwrite: true,
                  ease: 'none'
                });
              }
            }
          });
        }
      }

      // Parallax effect for overlay text
      if (overlayContainerRef.current) {
        gsap.to(overlayContainerRef.current, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: overlayContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }
    });

    return () => {
      ctx.revert();
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative flex flex-col md:flex-row items-stretch bg-white min-h-[70vh]">
      
      {/* IMAGE COLUMN - This will become sticky */}
      <div
        ref={imageColumnRef}
        className="relative w-full md:w-1/2 h-[30vh] md:h-screen bg-gray-100 will-change-transform"
      >
        <div
          ref={videoContainerRef}
          className="relative w-full h-full overflow-hidden"
        >
          <Image
            src="/images/video-poster.jpg"
            alt="Logistics operations"
            fill
            priority
            className="object-cover"
          />

          {/* overlay text */}
          <div
            ref={overlayContainerRef}
            className="absolute bottom-4 left-0 flex items-center justify-center pl-8"
          >
            <div className="text-3xl md:text-4xl font-semibold bg-black/25 tracking-wide text-white drop-shadow-xl rounded-sm inline-block py-2 px-1">
              <div
                ref={overlayWordsRef}
                className="flex flex-wrap items-center"
              >
                {overlayWords.map((word, i) => (
                  <div
                    key={i}
                    className="word-wrapper overflow-hidden mr-2"
                  >
                    <span className="overlay-word inline-block opacity-0 will-change-transform">
                      {word}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEXT COLUMN - This scrolls normally */}
      <div
        ref={textColumnRef}
        className="w-full md:w-1/2 bg-white z-10 md:min-h-screen p-8 md:p-12 flex items-center"
      >
        <div className="max-w-lg pr-4 md:pr-6">

          <h2
            ref={headingRef}
            className="text-3xl heading-word md:text-4xl lg:text-5xl font-medium text-[#0b2249] mb-5 leading-[1.2] tracking-tight flex flex-wrap pb-1"
          >
            {headingWords.map((word, i) => {
              const italic = i >= 4 && i <= 6;

              return (
                <div
                  key={i}
                  className="word-wrapper overflow-hidden mr-2"
                >
                  <span
                    className={`
                      heading-word inline-block will-change-transform
                      ${
                        italic
                          ? 'italic font-semibold translate-x-[0.03em] pr-[0.2em]'
                          : 'font-light'
                      }
                    `}
                  >
                    {word}
                  </span>
                </div>
              );
            })}
          </h2>

          <p
            ref={paragraphRef}
            className="text-[#0b2249] md:text-xl leading-relaxed text-[16px] font-light"
          >
            Мы не просто перевозим грузы — мы берем на себя всю логистику: от
            верификации поставщиков в Китае до стопроцентной страховки и
            легального таможенного оформления. Работаем в белую, чтобы ваш
            бизнес рос без рисков.
          </p>

          <div ref={buttonRef} className="mt-10 mb-5">
            <LetsTalkButton>
              Получить консультацию
            </LetsTalkButton>
          </div>

        </div>
      </div>
    </div>
  );
}