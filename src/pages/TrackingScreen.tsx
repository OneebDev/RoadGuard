import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Phone, MessageSquare, Navigation, 
  CheckCircle2, Circle, Clock, MapPin, AlertTriangle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBooking } from '@/contexts/BookingContext';
import { supabase } from '@/integrations/supabase/client';

const TrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking, updateBookingStatus, setCurrentBooking } = useBooking();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: 'Booking Accepted', time: 'Just now', completed: currentStep >= 1 },
    { id: 2, label: 'Mechanic On The Way', time: currentStep >= 2 ? 'Now' : '', completed: currentStep >= 2 },
    { id: 3, label: 'Arrived at Location', time: currentStep >= 3 ? 'Now' : `Est. ${currentBooking?.eta_minutes || 5} min`, completed: currentStep >= 3 },
    { id: 4, label: 'Service in Progress', time: currentStep >= 4 ? 'Now' : '', completed: currentStep >= 4 },
    { id: 5, label: 'Completed', time: '', completed: currentStep >= 5 },
  ];

  // Subscribe to real-time booking updates
  useEffect(() => {
    if (!currentBooking?.id) return;

    const channel = supabase
      .channel('tracking-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${currentBooking.id}`
        },
        (payload) => {
          console.log('Tracking update:', payload);
          const newBooking = { ...currentBooking, ...payload.new } as any;
          setCurrentBooking(newBooking);
          
          // Update step based on status
          const status = payload.new.status;
          if (status === 'accepted') setCurrentStep(2);
          else if (status === 'in_progress') setCurrentStep(4);
          else if (status === 'completed') setCurrentStep(5);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentBooking?.id]);

  // Simulate progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Simulate step progression for demo
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStep(2), 3000),
      setTimeout(() => setCurrentStep(3), 8000),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleComplete = async () => {
    if (currentBooking) {
      await updateBookingStatus(currentBooking.id, 'completed');
    }
    navigate('/payment');
  };

  const mechanicName = (currentBooking?.mechanics as any)?.name || 'Ahmed Khan';
  const mechanicPhone = (currentBooking?.mechanics as any)?.phone || '0321-1234567';
  const eta = currentBooking?.eta_minutes || 5;

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        {/* Map area */}
        <div className="relative h-[40%] bg-muted overflow-hidden">
          {/* Fake map */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-border"
                style={{ left: `${(i + 1) * 7}%` }}
              />
            ))}
          </div>

          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 50 200 Q 100 150 200 180 Q 300 210 350 120"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="4"
              strokeDasharray="8 4"
            />
          </svg>

          {/* Your location */}
          <div className="absolute top-[55%] left-[15%]">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-secondary-foreground" />
            </div>
          </div>

          {/* Mechanic location - animated */}
          <div 
            className="absolute transition-all duration-1000"
            style={{ 
              top: `${45 - (progress * 0.2)}%`, 
              left: `${70 - (progress * 0.4)}%` 
            }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full gradient-charcoal flex items-center justify-center shadow-elevated">
                <Navigation className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-secondary rounded-full">
                <span className="text-[10px] font-bold text-secondary-foreground">
                  {Math.max(1, eta - Math.floor(progress / 20))} min
                </span>
              </div>
            </div>
          </div>

          {/* Header overlay */}
          <div className="absolute top-0 left-0 right-0 pt-4 px-6">
            <button 
              onClick={() => navigate('/home')}
              className="p-3 rounded-xl bg-card shadow-card"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Bottom sheet */}
        <div className="flex-1 -mt-6 bg-card rounded-t-3xl shadow-elevated relative z-10 overflow-hidden">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-muted rounded-full" />
          </div>

          <div className="px-6 pb-6 overflow-auto h-full">
            {/* ETA Header */}
            <div className="flex items-center justify-between mb-6 animate-slide-up">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {currentStep >= 3 ? 'Mechanic Arrived!' : 'Mechanic Arriving'}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span className="text-secondary font-semibold">
                    {currentStep >= 3 ? 'At your location' : `${Math.max(1, eta - Math.floor(progress / 20))} minutes away`}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${mechanicPhone}`} className="p-3 rounded-xl bg-secondary shadow-glow">
                  <Phone className="w-5 h-5 text-secondary-foreground" />
                </a>
              </div>
            </div>

            {/* Mechanic card */}
            <div className="p-4 rounded-2xl bg-background mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl gradient-emerald flex items-center justify-center text-2xl">
                  👨‍🔧
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{mechanicName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentBooking?.service_type || 'General Repair'}
                  </p>
                  <p className="text-xs text-secondary mt-1">{mechanicPhone}</p>
                </div>
              </div>
            </div>

            {/* Progress steps */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold text-foreground mb-4">Service Status</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-secondary" />
                      ) : index === currentStep ? (
                        <div className="w-6 h-6 rounded-full border-2 border-secondary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-muted" />
                      )}
                      {index < steps.length - 1 && (
                        <div className={cn(
                          "w-0.5 h-8 mt-1",
                          step.completed ? "bg-secondary" : "bg-muted"
                        )} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={cn(
                        "font-medium",
                        step.completed ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-sm text-muted-foreground">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            {currentStep >= 3 && (
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full mt-4"
                onClick={handleComplete}
              >
                {currentStep >= 5 ? 'Proceed to Payment' : 'Complete Service (Demo)'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default TrackingScreen;
