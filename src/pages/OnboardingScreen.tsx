import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Zap, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    icon: MapPin,
    title: "GPS-Based Assistance",
    description: "We instantly locate you and connect you with the nearest verified mechanic in seconds.",
    color: "bg-secondary",
  },
  {
    icon: Shield,
    title: "Verified Mechanics",
    description: "Every mechanic is background-checked and rated by real customers for your peace of mind.",
    color: "bg-secondary",
  },
  {
    icon: Zap,
    title: "Emergency Priority",
    description: "Stuck in a dangerous situation? Get priority response within 5 minutes, guaranteed.",
    color: "bg-crimson",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Day or night, rain or shine—help is always just a tap away, whenever you need it.",
    color: "bg-secondary",
  },
];

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  const currentData = slides[currentSlide];
  const Icon = currentData.icon;

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        {/* Skip button */}
        <div className="flex justify-end px-6 pt-12">
          <button 
            onClick={handleSkip}
            className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Icon */}
          <div 
            key={currentSlide}
            className={cn(
              "w-32 h-32 rounded-[2rem] flex items-center justify-center mb-12 shadow-elevated animate-slide-up",
              currentData.color
            )}
          >
            <Icon className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
          </div>

          {/* Text */}
          <div className="text-center animate-fade-in" key={`text-${currentSlide}`}>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {currentData.title}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs mx-auto">
              {currentData.description}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-8 pb-12">
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "w-8 bg-secondary" 
                    : "w-2 bg-muted hover:bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          {/* Button */}
          <Button 
            onClick={handleNext}
            variant="secondary"
            size="xl"
            className="w-full"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default OnboardingScreen;
