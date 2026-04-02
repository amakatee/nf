"use client";

import { FC } from "react";

interface DeliveryMethodCardProps {
  id: number;
  icon?: React.ReactNode;               // SVG или компонент иконки (рекомендую размер 32–40px)
  title: string;
  subtitle: string;
  duration: string;
  suitableFor: string[];
  cost: "Низкая" | "Средняя" | "Высокая";
  reliability: number;                  // можно отобразить звёздочками позже
  features: string[];
  imageSrc?: string;                    // если хочешь фоновое изображение (пока закомментировано)
  onCalculate?: (id: number) => void;
  bgGradient?: string;
}

const DeliveryMethodCard: FC<DeliveryMethodCardProps> = ({
  id,
  icon,
  title,
  subtitle,
  duration,
  suitableFor,
  cost,
  reliability,
  features,
  imageSrc,
  onCalculate,
  bgGradient = "bg-gradient-to-br from-gray-950/90 to-gray-900/90",
}) => {
  const costStyles = {
    Низкая: "text-emerald-400/90",
    Средняя: "text-amber-400/90",
    Высокая: "text-rose-400/90",
  };

  return (
    <div
      className={`
        group relative h-auto min-h-[260px] w-full
        ${bgGradient}
        backdrop-blur-2xl bg-opacity-65
        rounded-2xl md:rounded-3xl
        overflow-hidden
        transition-all duration-700 ease-out
        hover:scale-[1.01] hover:shadow-2xl hover:shadow-black/60
        hover:border-cyan-500/15
      `}
    >
      <div className="relative z-10 flex flex-col h-full p-5 sm:p-5 md:p-6">
        {/* Верхняя часть: иконка + заголовок + длительность */}
        <div className="flex items-start justify-between gap-4 mb-6 md:mb-5">
          <div className="flex items-center gap-2 md:gap-3">
            {icon && <div className="shrink-0 text-cyan-300/80">{icon}</div>}
            <div>
              <h3 className="text-ml md:text-xl font-medium text-white tracking-tight leading-tight">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-cyan-200/70 mt-0.5 font-light">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-sm md:text-base font-semibold text-white/90 whitespace-nowrap">
              {duration}
            </div>
            <div className="text-[0.65rem] md:text-xs text-cyan-300/60 mt-0.5">доставка</div>
          </div>
        </div>

        {/* Подходящие грузы */}
        <div className="mb-4 md:mb-5 px-2">
          <h4 className="text-[0.6rem] uppercase tracking-wider text-cyan-300/80 mb-2 font-medium">
            Подходящие грузы
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {suitableFor.map((item, i) => (
              <span
                key={i}
                className="text-xs font-medium text-cyan-100/90"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Особенности */}
        <div className="mt-auto px-2">
          <h4 className="text-[0.6rem] uppercase tracking-wider text-cyan-300/80 mb-2 font-medium">
            Особенности
          </h4>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs text-gray-200/90"
              >
                <div className="w-[.4px] h-3.5 rounded-full bg-cyan-400/70 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка — если понадобится, раскомментировать и уменьшить отступы */}
        {/* {onCalculate && (
          <button
            onClick={() => onCalculate(id)}
            className="
              mt-5 w-full py-3
              bg-gradient-to-r from-cyan-600/20 to-blue-600/20
              hover:from-cyan-500/40 hover:to-blue-500/40
              border border-cyan-500/30 hover:border-cyan-400/50
              rounded-xl text-white font-medium text-sm
              transition-all duration-500
              hover:shadow-lg hover:shadow-cyan-500/20
              active:scale-98
            "
          >
            Рассчитать стоимость →
          </button>
        )} */}
      </div>
    </div>
  );
};

export default DeliveryMethodCard;