

'use client';

import React from 'react';

interface FinchStyleBorderCardProps {
  children: React.ReactNode;
  borderColor?: string;
  glowIntensity?: number;
  animationDuration?: number;
  borderRadius?: number;
  className?: string;
}

const FinchStyleBorderCard: React.FC<FinchStyleBorderCardProps> = ({
  children,
  borderColor = '195, 70%, 0%',  // очень тёмный, глубокий teal-cyan
  glowIntensity = .1,
  animationDuration = 90,
  borderRadius = 20,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden ${className}  bg-[#05050a]`}
      style={{
        borderRadius: `${borderRadius}px`,
      
      }}
    >
      {/* CONTENT CONTAINER — почти чёрный с едва заметным отражением */}
      <div
        className="relative z-10 h-full"
        style={{
          borderRadius: `${borderRadius}px`,
          background: `
            radial-gradient(
              circle at 15% 85%,
              hsla(200, 60%, 62%, 0.035) 0%,
              transparent 15%
            ),
            radial-gradient(
              circle at 80% 20%,
              hsla(195, 65%, 60%, 0.03) 0%,
              transparent 15%
            )
          `,
        }}
      >
        {children}
      </div>

      {/* ANIMATED BORDER — очень тёмный, сдержанный, глубокий */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: '1px',
          background: 'transparent',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius: `${borderRadius}px`,
            background: `
              conic-gradient(
                from var(--angle),
                transparent 0deg,
                hsla(220, 45%, 12%, 0.25)  40deg,     /* почти чёрный фон */
                hsla(200, 65%, 50%, 0.18)  90deg,     /* глубокий тёмный teal */
                hsla(195, 75%, 58%, 0.70) 140deg,     /* основной премиальный оттенок */
                hsla(190, 70%, 60%, 0.45) 190deg,     /* чуть светлее переход */
                hsla(195, 65%, 56%, 0.75) 240deg,     /* пик свечения */
                hsla(205, 60%, 52%, 0.20) 300deg,     /* возврат к тёмному */
                hsla(220, 50%, 45%, 0.12) 340deg,
                transparent 360deg
              )
            `,
            animation: `spin ${animationDuration}s linear infinite`,
            filter: `blur(${0.9 * glowIntensity}px)`,
          }}
        />
      </div>

      {/* GLOW LAYER — минимальное, почти призрачное свечение */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: '2.5px',
          background: 'transparent',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius: `${borderRadius}px`,
            background: `
              conic-gradient(
                from var(--angle),
                transparent 0deg,
                hsla(195, 75%, 62%, 0.06)  80deg,
                hsla(190, 80%, 60%, 0.10) 140deg,
                hsla(195, 70%, 58%, 0.20) 200deg,
                hsla(200, 65%, 56%, 0.30) 260deg,
                hsla(195, 70%, 60%, 0.07) 320deg,
                transparent 360deg
              )
            `,
            filter: `blur(${3.2 * glowIntensity}px)`,
            opacity: 0.50 * glowIntensity,
            animation: `spin ${animationDuration * 1.5}s linear infinite reverse`,
          }}
        />
      </div>

      {/* Статичный ореол — едва уловимый, создаёт глубину */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: `${borderRadius}px`,
          background: `
            radial-gradient(
              circle at 35% 65%,
              hsla(195, 70%, 60%, 0.035) 0%,
              transparent 75%
            ),
            radial-gradient(
              circle at 70% 35%,
              hsla(200, 65%, 58%, 0.03) 0%,
              transparent 70%
            )
          `,
          opacity: 0.80,
          pointerEvents: 'none',
        }}
      />

      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
      `}</style>
    </div>
  );
};

export default FinchStyleBorderCard;