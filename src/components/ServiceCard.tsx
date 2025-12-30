import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
  variant?: 'default' | 'emergency';
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
  variant = 'default',
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300",
        "bg-card shadow-card hover:shadow-elevated hover:-translate-y-1",
        "active:scale-[0.98] group",
        variant === 'emergency' && "border-2 border-crimson/20",
        className
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300",
        variant === 'default' 
          ? "bg-emerald-light group-hover:bg-secondary group-hover:text-secondary-foreground text-secondary" 
          : "bg-crimson/10 group-hover:bg-crimson group-hover:text-destructive-foreground text-crimson"
      )}>
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-0.5">{title}</h3>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </button>
  );
};

export default ServiceCard;
