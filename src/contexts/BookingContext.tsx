import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Mechanic {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  rating: number;
  total_jobs: number;
  area: string;
  price_range: string;
  is_available: boolean;
}

interface Vehicle {
  id: string;
  vehicle_type: string;
  brand: string;
  model: string;
  registration_number: string;
  color: string | null;
  year: number | null;
  is_primary: boolean;
}

interface Booking {
  id: string;
  user_id: string;
  mechanic_id: string | null;
  vehicle_id: string | null;
  service_type: string;
  status: string;
  pickup_location: string;
  pickup_lat: number | null;
  pickup_lng: number | null;
  mechanic_lat: number | null;
  mechanic_lng: number | null;
  price: number | null;
  notes: string | null;
  eta_minutes: number | null;
  created_at: string;
  mechanics?: Mechanic;
  vehicles?: Vehicle;
}

interface BookingContextType {
  currentBooking: Booking | null;
  setCurrentBooking: (booking: Booking | null) => void;
  selectedMechanic: Mechanic | null;
  setSelectedMechanic: (mechanic: Mechanic | null) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  pickupLocation: string;
  setPickupLocation: (location: string) => void;
  createBooking: (mechanicId: string, serviceType: string, vehicleId?: string) => Promise<Booking | null>;
  updateBookingStatus: (bookingId: string, status: string) => Promise<void>;
  mechanics: Mechanic[];
  loadMechanics: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>('DHA Phase 6, Karachi');
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);

  // Subscribe to real-time booking updates
  useEffect(() => {
    if (!currentBooking?.id) return;

    const channel = supabase
      .channel('booking-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `id=eq.${currentBooking.id}`
        },
        (payload) => {
          console.log('Booking updated:', payload);
          setCurrentBooking(prev => prev ? { ...prev, ...payload.new } : null);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentBooking?.id]);

  const loadMechanics = async () => {
    const { data, error } = await supabase
      .from('mechanics')
      .select('*')
      .eq('is_available', true);

    if (data && !error) {
      setMechanics(data);
    }
  };

  const createBooking = async (mechanicId: string, serviceType: string, vehicleId?: string): Promise<Booking | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        mechanic_id: mechanicId,
        vehicle_id: vehicleId || null,
        service_type: serviceType,
        pickup_location: pickupLocation,
        status: 'pending',
        eta_minutes: Math.floor(Math.random() * 10) + 5, // Random ETA 5-15 mins
      })
      .select('*, mechanics(*), vehicles(*)')
      .single();

    if (data && !error) {
      setCurrentBooking(data);
      return data;
    }
    
    console.error('Error creating booking:', error);
    return null;
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const updateData: any = { status };
    
    if (status === 'in_progress') {
      updateData.started_at = new Date().toISOString();
    } else if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId);
  };

  const value = {
    currentBooking,
    setCurrentBooking,
    selectedMechanic,
    setSelectedMechanic,
    selectedService,
    setSelectedService,
    selectedVehicle,
    setSelectedVehicle,
    pickupLocation,
    setPickupLocation,
    createBooking,
    updateBookingStatus,
    mechanics,
    loadMechanics,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
