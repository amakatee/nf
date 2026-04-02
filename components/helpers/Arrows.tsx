interface ArrowIconProps {
    direction: 'left' | 'right'
    className?: string
  }
  
  export function ArrowIcon({ direction, className = '' }: ArrowIconProps) {
    const pathD = direction === 'left' 
      ? 'M15 6L9 12L15 18' 
      : 'M9 6L15 12L9 18'
  
    return (
      <svg 
        width="44" 
        height="44" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path 
          d={pathD} 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    )
  }