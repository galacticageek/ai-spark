import React from 'react';

interface InfiniteSliderProps {
  children: React.ReactNode;
  speed?: number;
  gap?: number;
  className?: string;
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({
  children,
  speed = 40,
  gap = 24,
  className = '',
}) => {
  return (
    <div className={`overflow-hidden flex w-full group ${className}`} style={{ gap: `${gap}px` }}>
      <div 
        className="flex shrink-0 min-w-full justify-around items-center gap-[inherit] animate-infinite-slide group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div 
        className="flex shrink-0 min-w-full justify-around items-center gap-[inherit] animate-infinite-slide group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};
