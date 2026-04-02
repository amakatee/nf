"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DeliveryMethodCard from "../helpers/DeliveryMethodCard";
import LetsTalkButton from "../helpers/MainButton";

gsap.registerPlugin(ScrollTrigger);

export default function ShippingMethodsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const gradients = [
    // 1. Авиаперевозки — самый "воздушный", лёгкий blue-indigo с намёком на cyan glow
    "bg-gradient-to-br from-[#0a0a0f]/95 via-indigo-950/60 via-blue-900/40 via-cyan-900/30 to-[#0b0b12]/95",
  
    // 2. Железнодорожные — спокойный teal-cyan-industrial, глубокий и сбалансированный
    "bg-gradient-to-br from-[#0a0a0f]/96 via-teal-950/60 via-cyan-900/45 via-emerald-900/30 to-[#0b0b13]/94",
  
    // 3. Автомобильные — более тёплый purple-rose shift, но всё ещё холодный и глубокий
    "bg-gradient-to-r from-[#0a0a0f]/96 via-slate-900/60 via-zinc-800/40 via-blue-900/30 to-[#0c0c13]/92",
  
    // 4. Морские — самый "глубокий", violet-purple с намёком на magenta/fuchsia глубину
    "bg-gradient-to-tr from-[#0a0a0f]/95 via-fuchsia-950bg-gradient-to-br from-[#0a0a0f]/96 via-indigo-950/55 via-sky-900/45 via-cyan-800/35 to-[#0c0c14]/92/55 via-purple-900/45 via-indigo-900/35 to-[#0c0c15]/92",
  ];

  const shippingMethods = [
    {
      id: 1,
      icon: <></>,
      title: "Авиаперевозки",
      subtitle: "Самый быстрый способ",
      duration: "3-7 дн.",
      suitableFor: ["Образцы", "Электроника", "Мед. товары", "Документы"],
      cost: "Высокая" as const,
      reliability: 5,
      features: ["Скорость доставки", "Безопасность", "Трекинг", "Таможня"],
      imageSrc: "/images/airpng.png",
    },
    {
      id: 2,
      icon: <></>,
      title: "Железнодорожные",
      subtitle: "Баланс цены и скорости",
      duration: "18-40 дн.",
      suitableFor: ["Контейнеры FCL", "Сборные грузы LCL", "Оборудование", "Стройматериалы"],
      cost: "Средняя" as const,
      reliability: 4,
      features: ["Оптимальная стоимость", "Надежность", "Контейнерные", "Сборные грузы"],
      imageSrc: "/images/train.jpg",
    },
    {
      id: 3,
      icon: <></>,
      title: "Автомобильные",
      subtitle: "Гибкий и универсальный",
      duration: "14-25 дн.",
      suitableFor: ["Региональные", "Междугородные", "Температура", "Частичные загрузки"],
      cost: "Средняя" as const,
      reliability: 4,
      features: ["Гибкость маршрутов", "Дверь-дверь", "Экспедирование", "Мультимодальные"],
      imageSrc: "/images/truck-cargo.jpg",
    },
    {
      id: 4,
      icon: <></>,
      title: "Морские контейнерные",
      subtitle: "Самый экономичный",
      duration: "30-60 дн.",
      suitableFor: ["Международные", "Консолидация", "Крупногабаритные", "Сырье"],
      cost: "Низкая" as const,
      reliability: 3,
      features: ["Низкая стоимость", "Большие объёмы", "Международные", "Контейнеры"],
      imageSrc: "/images/cargo.jpg",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current;
    if (cards.length !== 4) return;
  
    const ctx = gsap.context(() => {
      const getVh = () => window.innerHeight * 0.01;
  
      const PEEK_VH = 10;
      const INITIAL_GAP_VH = 36;
  
      const vh = getVh();
  
      // convert to PIXELS ONCE (critical for performance)
      const PEEK = PEEK_VH * vh;
      const INITIAL_GAP = INITIAL_GAP_VH * vh;
      const DELTA = INITIAL_GAP - PEEK;
  
      // ----------------------------------------------------------------
      // INITIAL STATE (GPU friendly)
      cards.forEach((card, index) => {
        gsap.set(card, {
          y: index * INITIAL_GAP,
          zIndex: index + 1,
          force3D: true,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        });
      });
  
      // ----------------------------------------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(cards.length - 1) * window.innerHeight * 1.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
  
      // CASCADE (same logic, px instead of vh)
      for (let phase = 1; phase < cards.length; phase++) {
        const group = cards.slice(phase);
  
        tl.to(
          group,
          {
            y: `-=${DELTA}`,
            ease: "none",
            duration: 1,
          },
          phase - 1
        );
      }
  
      // ----------------------------------------------------------------
      // refresh values on resize/orientation change (important for vh→px)
      const handleRefresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleRefresh);
      window.addEventListener("orientationchange", handleRefresh);
  
      ScrollTrigger.refresh();
  
      return () => {
        window.removeEventListener("resize", handleRefresh);
        window.removeEventListener("orientationchange", handleRefresh);
      };
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section
    
  
  // остальные классы
      ref={sectionRef}
      className="relative  text-white overflow-hidden"
    >
      
      <div className="max-w-6xl px-4 mx-auto h-screen flex items-center justify-center">
        <div className="relative w-full h-[550px]">
          {shippingMethods.map((method, index) => (
            <div
              key={method.id}
              ref={(el) => setCardRef(el, index)}
              className="absolute w-full will-change-transform left-0 top-0"
            >
              <DeliveryMethodCard
                {...method}
                bgGradient={gradients[index % gradients.length]}
              />
            </div>
          ))}
        </div>
       
     
        
      </div>
     
     
    </section>
  );
}