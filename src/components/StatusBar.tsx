import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

const StatusBar: React.FC = () => {
  const time = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="flex justify-between items-center px-6 pt-10 pb-2 text-foreground">
      <span className="text-sm font-semibold">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-5 h-5" />
      </div>
    </div>
  );
};

export default StatusBar;
