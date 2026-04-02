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
  borderColor = '177, 100%, 50%',
  glowIntensity = 3,
  animationDuration = 7,
  borderRadius = 20,
  className = '',
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ 
        borderRadius,
        background: 'transparent'
      }}
    >
      {/* CONTENT CONTAINER */}
      <div
        className="relative z-10 "
        style={{ 
          borderRadius,
          background: 'inherit',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>

      {/* BORDER CONTAINER */}
      <div
        className="absolute inset-0 pointer-events-none "
        style={{
          borderRadius,
          padding: '1px',
          background: 'transparent',
        }}
      >
        {/* ANIMATED GRADIENT BORDER */}
        <div
          className="w-full h-full "
          style={{
            borderRadius,
            background: `
              conic-gradient(
                from var(--angle),
                transparent 0%,
                hsla(${borderColor}, 0.2) 20%,
                hsla(${borderColor}, 1) 50%,
                hsla(${borderColor}, 0.2) 80%,
                transparent 100%
              )
            `,
            animation: `spin ${animationDuration}s linear infinite`,
          }}
        />
      </div>

      {/* GLOW LAYER */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          padding: '2px',
          background: 'transparent',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius,
            background: `
              conic-gradient(
                from var(--angle),
                transparent 0%,
                hsla(${borderColor}, 0.1) 15%,
                hsla(${borderColor}, 0.8) 50%,
                hsla(${borderColor}, 0.1) 85%,
                transparent 100%
              )
            `,
            filter: `blur(${4 * glowIntensity}px)`,
            opacity: 0.8 * glowIntensity,
            animation: `spin ${animationDuration}s linear infinite`,
          }}
        />
      </div>

      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }
      `}</style>
    </div>
  );
};

export default FinchStyleBorderCard;