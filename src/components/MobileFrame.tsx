import React from 'react';
import { cn } from '@/lib/utils';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div 
        className={cn(
          "relative w-full max-w-[390px] h-[844px] bg-background rounded-[3rem] overflow-hidden shadow-elevated",
          "border-[8px] border-charcoal",
          className
        )}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-charcoal rounded-b-2xl z-50" />
        
        {/* Screen content */}
        <div className="relative h-full overflow-hidden">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-charcoal/30 rounded-full" />
      </div>
    </div>
  );
};

export default MobileFrame;
