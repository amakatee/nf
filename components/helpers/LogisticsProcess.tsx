// app/components/LogisticsProcess.tsx
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  stage: 'preparation' | 'start' | 'development' | 'finish';
}

const stageConfig = {
  preparation: {
    label: 'Подготовка',
    color: 'cyan',    // neon cyan/teal
    bg: 'bg-cyan-950/30',
    border: 'border-cyan-500/50',
    text: 'text-cyan-300',
    glow: 'shadow-cyan-500/70',
  },
  start: {
    label: 'Старт',
    color: 'rose',
    bg: 'bg-rose-950/30',
    border: 'border-rose-500/50',
    text: 'text-rose-300',
    glow: 'shadow-rose-600/70',
  },
  development: {
    label: 'Развитие',
    color: 'amber',
    bg: 'bg-amber-950/30',
    border: 'border-amber-500/50',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/70',
  },
  finish: {
    label: 'Финиш',
    color: 'emerald',
    bg: 'bg-emerald-950/30',
    border: 'border-emerald-500/50',
    text: 'text-emerald-300',
    glow: 'shadow-emerald-500/70',
  },
};

const getNumberShape = (num: number) => {
  if (num === 1 || num === 4) return 'rounded-full';
  if (num === 2 || num === 5) return 'rounded-none';
  return 'rounded-lg';
};

const getNeonNumberClasses = (num: number) => {
  const colors = [
    'text-cyan-300   shadow-cyan-400/80   border-cyan-400/60',
    'text-rose-300   shadow-rose-500/80   border-rose-500/60',
    'text-teal-300   shadow-teal-400/80   border-teal-400/60',
    'text-fuchsia-300 shadow-fuchsia-500/80 border-fuchsia-500/60',
    'text-sky-300    shadow-sky-400/80    border-sky-400/60',
    'text-red-300    shadow-red-500/80    border-red-500/60',
  ];
  return colors[(num - 1) % colors.length];
};

const StepCard: React.FC<StepCardProps> = ({ number, title, description, stage }) => {
  const config = stageConfig[stage];
  const shape = getNumberShape(number);
  const neonNum = getNeonNumberClasses(number);
  const isEven = number % 2 === 0;

  return (
    <div
      className={`
        group relative rounded-2xl p-6 lg:p-8
        bg-black/40 backdrop-blur-xl border border-white/5
        transition-all duration-500
        hover:scale-[1.04] hover:shadow-2xl hover:-translate-y-2
        min-h-[260px] flex flex-col
        shadow-xl ${config.glow.replace('shadow', 'shadow-2xl')}
        ${isEven ? 'lg:translate-y-10' : ''}
      `}
    >
      {/* Neon number — top-left */}
      <div
        className={`
          absolute -top-5 -left-5 w-16 h-16
          bg-black/60 backdrop-blur-md border-2
          flex items-center justify-center text-4xl font-black
          shadow-[0_0_25px_8px,0_0_50px_4px]
          transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_40px_15px]
          ${shape} ${neonNum}
        `}
      >
        {number}
      </div>

      {/* Stage badge — top-right with neon glow */}
      <div
        className={`
          absolute top-5 right-5
          ${config.bg} ${config.border} border-2
          ${config.text} text-xs font-bold uppercase tracking-widest
          px-5 py-2 rounded-full
          shadow-[0_0_20px_4px] ${config.glow}
          backdrop-blur-sm
        `}
      >
        {config.label}
      </div>

      {/* Content */}
      <div className="mt-14 flex flex-col flex-grow">
        <h3 className="text-2xl font-extrabold text-white/95 mb-5 tracking-tight">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed text-base lg:text-[15.5px]">
          {description}
        </p>
      </div>
    </div>
  );
};

const MobileStepCard: React.FC<StepCardProps & { showArrow: boolean }> = ({
  number,
  title,
  description,
  stage,
  showArrow,
}) => {
  const config = stageConfig[stage];
  const shape = getNumberShape(number);
  const neonNum = getNeonNumberClasses(number);

  return (
    <div className="flex gap-5 items-start">
      {/* Neon number + arrow */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`
            w-12 h-12
            bg-black/60 backdrop-blur-md border-2
            flex items-center justify-center text-3xl font-black
            shadow-[0_0_20px_6px,0_0_35px_3px]
            ${shape} ${neonNum}
          `}
        >
          {number}
        </div>
        {showArrow && (
          <div className="mt-4 text-cyan-400/80 font-light text-3xl select-none animate-pulse-slow">
            ↓
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div
          className={`
            inline-flex mb-4
            ${config.bg} ${config.border} border
            ${config.text} text-xs font-bold uppercase tracking-wider
            px-4 py-1.5 rounded-full
            shadow-[0_0_15px_3px] ${config.glow}
            backdrop-blur-sm
          `}
        >
          {config.label}
        </div>
        <h3 className="text-xl font-extrabold text-white/95 mb-3">
          {title}
        </h3>
        <p className="text-white/85 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Arrow = ({ direction }: { direction: 'right' | 'left' | 'down' }) => {
  const base = "text-cyan-400/70 font-light text-5xl select-none animate-pulse-slow";

  if (direction === 'down') {
    return <div className={`${base} mx-auto`}>↓</div>;
  }
  if (direction === 'right') {
    return <div className={`${base}`}>→</div>;
  }
  return <div className={`${base}`}>←</div>;
};

const LogisticsProcess: React.FC = () => {
  const steps: StepCardProps[] = [
    // ... (your steps array remains unchanged)
    {
      number: 1,
      title: 'Консультация и стратегия поиска',
      description:
        'Первичная встреча, анализ потребностей клиента, определение целевого рынка в России, требований compliance. Разработка стратегии поиска поставщиков в Китае.',
      stage: 'preparation',
    },
    {
      number: 2,
      title: 'Поиск и верификация поставщиков',
      description:
        'Выявление надёжных производителей в Китае, аудит заводов, проверка образцов, согласование цен и условий.',
      stage: 'preparation',
    },
    {
      number: 3,
      title: 'Контроль качества и мониторинг производства',
      description:
        'Сопровождение производства, проведение промежуточных и предпогрузочных инспекций, контроль соответствия спецификациям.',
      stage: 'start',
    },
    {
      number: 4,
      title: 'Таможенное оформление и freight forwarding',
      description:
        'Организация экспорта из Китая, выбор маршрута, трансграничная перевозка, таможенное оформление в России.',
      stage: 'start',
    },
    {
      number: 5,
      title: 'Складирование и фулфилмент',
      description:
        'Приёмка товаров на складах в России, управление запасами, комплектация заказов.',
      stage: 'development',
    },
    {
      number: 6,
      title: 'White label доставка и финальная миля',
      description:
        'Доставка под брендом клиента, брендированные уведомления, трекинг, передача конечному покупателю в России.',
      stage: 'finish',
    },
  ];

  return (
    <section className="py-16 lg:py-32 px-5 bg-gradient-to-b from-gray-950 via-indigo-950/80 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-5xl md:text-6xl font-black text-white mb-16 lg:mb-24 tracking-tight drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]">
          Процесс работы
        </h2>

        {/* Mobile + tablet version */}
        <div className="block lg:hidden space-y-12">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <MobileStepCard 
                {...step} 
                showArrow={idx < steps.length - 1}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Desktop zigzag layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-10 xl:gap-16 relative">
          {/* Row 1 → */}
          <div className="col-span-3 grid grid-cols-3 gap-10 xl:gap-16 items-start">
            {steps.slice(0, 3).map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>

          {/* Arrows row 1 */}
          <div className="absolute top-[40%] left-[15%] right-[15%] flex justify-between pointer-events-none">
            <Arrow direction="right" />
            <Arrow direction="right" />
          </div>

          {/* Row 2 ← (shifted down) */}
          <div className="col-span-3 grid grid-cols-3 gap-10 xl:gap-16 items-start mt-20 xl:mt-28">
            {steps.slice(3, 6).reverse().map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>

          {/* Arrows row 2 ← */}
          <div className="absolute top-[78%] left-[15%] right-[15%] flex justify-between pointer-events-none scale-x-[-1]">
            <Arrow direction="right" />
            <Arrow direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogisticsProcess;