"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ProblemSolutionCard from "../helpers/SolutionCard";

interface QAItem {
  question: string;
  answer: string;
}

const qaItems: QAItem[] = [
  {
    question: "Нужен надёжный представитель в Китае?",
    answer: "Ваш законный агент с правом подписи и контролем на месте.",
  },
  {
    question: "Хотите экспортировать с нулевой ставкой НДС?",
    answer: "Легально оптимизируйте налоги и возвращайте НДС при экспорте.",
  },
  {
    question: "Боитесь ошибок в таможенных документах?",
    answer: "Мы подготовим все документы: от инвойсов до сертификатов.",
  },
  {
    question: "Хотите вернуть НДС 20–22%?",
    answer: "Законная экономия: возврат НДС из бюджета или его зачет.",
  },
];

export default function ServiceQAPage() {
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (rowsRef.current.length === 0) return;

    gsap.set(rowsRef.current, { y: 40 });
    gsap.to(rowsRef.current, {
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;

    const heading = headingRef.current;
    const originalText = heading.innerText;
    const chars = originalText.split('');

    heading.innerHTML = '';
    const spans: HTMLSpanElement[] = [];

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
        span.style.minWidth = '0.3em';
      } else {
        span.textContent = char;
      }
      heading.appendChild(span);
      spans.push(span);
    });

    const tl = gsap.timeline();
    spans.forEach((span, index) => {
      tl.to(span, {
        opacity: 1,
        duration: 0.05,
        ease: "none",
      }, index * 0.05);
    });
  }, []);

  return (
    <main 
      id="home-component"
      ref={containerRef}
      className="min-h-screen pt-20 px-4 flex flex-col items-center relative z-20 bg-black"
    >
      {/* <div className="text-center w-full px-2 pb-25">
        <h1
          ref={headingRef}
          className="text-3xl text-[#0b2249] md:text-4xl font-light text-start leading-8 tracking-wide mb-4"
        >
          Комплексные решения для вашего бизнеса
        </h1>
        <p className="text-[#0b2249]/85 text-[.9rem] max-w-2xl text-start font-light tracking-wide leading-5 mx-auto">
          Полный спектр услуг по логистике, таможенному оформлению и налоговой оптимизации
        </p>
      </div> */}
      <div className="max-w-5xl w-full">
        <div className="flex flex-col gap-3 md:gap-6">
          {qaItems.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="grid grid-cols-2 gap-4 md:gap-6"
              style={{ minHeight: "25vh" }}
            >
              <ProblemSolutionCard
                content={item.question}
                author=""
                mode="question"
              />
              <ProblemSolutionCard
                content={item.answer}
                author="北狐 Northern Fox"
                mode="solution"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}