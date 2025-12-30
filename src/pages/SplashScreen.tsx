import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import { Wrench, Shield, Zap } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileFrame>
      <div className="h-full gradient-charcoal flex flex-col items-center justify-center px-8">
        {/* Logo */}
        <div className="relative mb-8 animate-fade-in">
          <div className="w-28 h-28 rounded-3xl gradient-emerald flex items-center justify-center shadow-glow">
            <Wrench className="w-14 h-14 text-secondary-foreground" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-crimson flex items-center justify-center">
            <Zap className="w-4 h-4 text-destructive-foreground" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-primary-foreground mb-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          RoadGuard
        </h1>
        
        {/* Tagline */}
        <p className="text-lg text-primary-foreground/70 font-medium animate-slide-up" style={{ animationDelay: '0.5s' }}>
          24/7 Roadside Help
        </p>

        {/* Features */}
        <div className="flex gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-xs text-primary-foreground/60">Trusted</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-xs text-primary-foreground/60">Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-xs text-primary-foreground/60">Expert</span>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full bg-secondary animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default SplashScreen;
