-- Create vehicles table for user's vehicles
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('car', 'bike', 'rickshaw')),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  color TEXT,
  year INTEGER,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mechanics table
CREATE TABLE public.mechanics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialty TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  total_jobs INTEGER DEFAULT 0,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  area TEXT NOT NULL,
  avatar TEXT,
  is_available BOOLEAN DEFAULT true,
  price_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mechanic_id UUID REFERENCES public.mechanics(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  pickup_location TEXT NOT NULL,
  pickup_lat DECIMAL(10,8),
  pickup_lng DECIMAL(11,8),
  mechanic_lat DECIMAL(10,8),
  mechanic_lng DECIMAL(11,8),
  price DECIMAL(10,2),
  notes TEXT,
  eta_minutes INTEGER,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mechanics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Vehicles policies (users can only manage their own vehicles)
CREATE POLICY "Users can view their own vehicles" ON public.vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own vehicles" ON public.vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own vehicles" ON public.vehicles FOR DELETE USING (auth.uid() = user_id);

-- Mechanics policies (everyone can view mechanics)
CREATE POLICY "Anyone can view available mechanics" ON public.mechanics FOR SELECT USING (true);

-- Bookings policies (users can only manage their own bookings)
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Triggers for updated_at
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for bookings table (for live tracking)
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;

-- Insert sample mechanics for Karachi
INSERT INTO public.mechanics (name, phone, specialty, rating, total_jobs, area, price_range, is_available) VALUES
('Ahmed Khan', '0321-1234567', 'All vehicles', 4.9, 1200, 'DHA Phase 6', 'Rs. 1,000 - 3,000', true),
('Bilal Mechanics', '0333-9876543', 'Cars only', 4.7, 850, 'Clifton', 'Rs. 800 - 2,500', true),
('Karachi Auto Care', '0300-5551234', 'Battery expert', 4.8, 650, 'Gulshan-e-Iqbal', 'Rs. 1,200 - 4,000', true),
('Imran Auto Works', '0312-7654321', 'Bike specialist', 4.6, 450, 'North Nazimabad', 'Rs. 500 - 1,500', true),
('Faisal Towing', '0345-1112233', 'Towing service', 4.9, 320, 'Saddar', 'Rs. 2,000 - 5,000', true),
('Hassan Motors', '0322-4445566', 'Engine repair', 4.5, 580, 'PECHS', 'Rs. 1,500 - 4,500', true);