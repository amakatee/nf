// components/WhiteVsGrayDelivery.tsx
'use client';

import { useEffect, useRef } from 'react';

const comparisons = [
  {
    gray: ' Риски блокировки груза на таможне',
    white: ' Полное таможенное оформление',
  },
  {
    gray: ' Отсутствие страховки груза',
    white: ' Полная страховка груза',
  },
  {
    gray: ' Скрытые платежи и непредвиденные расходы',
    white: ' Прозрачные цены без доплат',
  },
  {
    gray: ' Штрафы и административная ответственность',
    white: ' Налоговые вычеты (НДС к возврату)',
  },
  {
    gray: ' Риск потери товара и репутации',
    white: ' Гарантия сохранности и легальности',
  },
];

export default function WhiteVsGrayDelivery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-3 rounded-t-[20px] text-white py-6 md:py-24 px-6 md:px-12 font-sans"
    >
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <h1 className="text-xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 md:mb-16 animate-on-scroll opacity-0">
          Белая доставка из Китая  
          <span className="text-gray-400"> vs Серая доставка</span>
        </h1>

        {/* Две колонки с сравнениями */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Колонка "Серая доставка" */}
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-sm md:text-xl font-semibold mb-6 text-gray-400 border-l-4 border-gray-600 pl-4">
              Серая доставка
            </h2>
            <ul className="space-y-4">
              {comparisons.map((item, idx) => (
                <li key={`gray-${idx}`} className="text-gray-300 text-sm">
                  {item.gray}
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка "Белая доставка" */}
          
        </div>

        {/* Разделитель */}
        <hr className="border-gray-800 my-4 animate-on-scroll opacity-0" />

        {/* Итоговая фраза */}
        <p className="text-sm md:text-xl text-start font-medium mb-0 animate-on-scroll opacity-0">
          Только белая логистика гарантирует безопасность вашего бизнеса
        </p>

 
      </div>

      {/* Добавляем глобальные стили для анимации */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-on-scroll {
          opacity: 0;
        }
      `}</style>
    </section>
  );
}