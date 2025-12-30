import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, MapPin, Navigation, Star, Clock, Phone,
  Wrench, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from 'sonner';

const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    mechanics,
    loadMechanics,
    selectedMechanic,
    setSelectedMechanic,
    selectedService,
    pickupLocation,
    setPickupLocation,
    createBooking
  } = useBooking();

  const [showList, setShowList] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    loadMechanics();
  }, []);

  const handleSelectMechanic = (mechanic: any) => {
    setSelectedMechanic(mechanic);
    setShowList(false);
  };

  const handleConfirmBooking = async () => {
    if (!selectedMechanic) return;

    setIsBooking(true);

    const booking = await createBooking(
      selectedMechanic.id,
      selectedService || 'General Repair'
    );

    if (booking) {
      toast.success('Booking confirmed!');
      navigate('/tracking');
    } else {
      toast.error('Booking failed. Please try again.');
    }

    setIsBooking(false);
  };

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col relative">
        <StatusBar />

        {/* Map placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted">
          {/* Fake map grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-border"
                style={{ left: `${(i + 1) * 5}%` }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px w-full bg-border"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>

          {/* Location pins */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-glow">
                <User className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary rotate-45" />
              <div className="absolute inset-0 rounded-full bg-secondary/30 animate-pulse-ring" />
            </div>
          </div>

          {/* Mechanic pins */}
          {mechanics.map((m, i) => (
            <div
              key={m.id}
              className={cn(
                "absolute cursor-pointer transition-transform hover:scale-110",
                selectedMechanic?.id === m.id && "scale-110"
              )}
              style={{
                top: `${35 + (i * 8)}%`,
                left: `${40 + (i * 12)}%`
              }}
              onClick={() => handleSelectMechanic(m)}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-card",
                selectedMechanic?.id === m.id ? "bg-primary" : "bg-card"
              )}>
                <Wrench className={cn(
                  "w-5 h-5",
                  selectedMechanic?.id === m.id ? "text-primary-foreground" : "text-foreground"
                )} />
              </div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="relative z-10 px-6 pt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="p-3 rounded-xl bg-card shadow-card"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1 bg-card rounded-xl p-3 shadow-card">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">{pickupLocation}</span>
              </div>
            </div>
            <button className="p-3 rounded-xl bg-secondary shadow-glow">
              <Navigation className="w-5 h-5 text-secondary-foreground" />
            </button>
          </div>
        </div>

        {/* Bottom Sheet */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-elevated transition-all duration-500 z-10",
            showList ? "h-[55%]" : "h-[45%]"
          )}
        >
          {/* Handle */}
          <button
            onClick={() => setShowList(!showList)}
            className="w-full flex justify-center pt-3 pb-2"
          >
            <div className="w-10 h-1 bg-muted rounded-full" />
          </button>

          <div className="px-6 pb-8 h-full overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {showList ? 'Nearby Mechanics' : 'Selected Mechanic'}
              </h2>
              {showList && (
                <span className="text-sm text-muted-foreground">{mechanics.length} available</span>
              )}
            </div>

            {showList ? (
              <div className="space-y-3">
                {mechanics.map((mechanic) => (
                  <button
                    key={mechanic.id}
                    onClick={() => handleSelectMechanic(mechanic)}
                    className={cn(
                      "w-full p-4 rounded-2xl bg-background flex items-center gap-4 transition-all duration-300",
                      selectedMechanic?.id === mechanic.id
                        ? "ring-2 ring-secondary bg-emerald-light"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      👨‍🔧
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">{mechanic.name}</h3>
                      <p className="text-xs text-muted-foreground">{mechanic.specialty} • {mechanic.area}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                          <span className="text-xs font-medium text-foreground">{mechanic.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{mechanic.total_jobs}+ jobs</span>
                        <span className="text-xs text-secondary font-medium">{mechanic.price_range}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-slide-up">
                {selectedMechanic && (
                  <>
                    <div className="p-4 rounded-2xl bg-background mb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-3xl">
                          👨‍🔧
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-foreground">{selectedMechanic.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedMechanic.specialty}</p>
                          <p className="text-xs text-secondary mt-1">{selectedMechanic.phone}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-secondary fill-secondary" />
                            <span className="text-sm font-semibold text-foreground">{selectedMechanic.rating}</span>
                            <span className="text-sm text-muted-foreground">({selectedMechanic.total_jobs} jobs)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1 p-3 rounded-xl bg-emerald-light text-center">
                          <Clock className="w-5 h-5 text-secondary mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">ETA</p>
                          <p className="text-sm font-bold text-foreground">5-10 min</p>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-muted text-center">
                          <MapPin className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Area</p>
                          <p className="text-sm font-bold text-foreground">{selectedMechanic.area}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setShowList(true)}
                      >
                        Change
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                        onClick={handleConfirmBooking}
                        disabled={isBooking}
                      >
                        {isBooking ? (
                          <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                        ) : (
                          'Book Now'
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default MapScreen;
