import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { 
  Car, Bike, Battery, Fuel, CircleDot, 
  AlertTriangle, MapPin, Bell, ChevronRight 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { supabase } from '@/integrations/supabase/client';

const services = [
  { icon: Car, title: 'Car Repair', subtitle: 'Tow & Fix' },
  { icon: Bike, title: 'Bike Service', subtitle: 'Quick Help' },
  { icon: Battery, title: 'Battery', subtitle: 'Jump Start' },
  { icon: Fuel, title: 'Fuel Delivery', subtitle: 'Emergency' },
  { icon: CircleDot, title: 'Flat Tyre', subtitle: 'Replace/Fix' },
];

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSelectedService } = useBooking();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data?.full_name) {
          setUserName(data.full_name);
        } else {
          setUserName(user.email?.split('@')[0] || 'User');
        }
      }
    };

    fetchProfile();
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        {/* Header */}
        <div className="px-6 pt-4 pb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">{getGreeting()}</p>
              <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
            </div>
            <button className="relative p-3 rounded-xl bg-card shadow-card">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-crimson rounded-full" />
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-sm">DHA Phase 6, Karachi</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Emergency Banner */}
        <div 
          className="mx-6 mb-6 p-4 rounded-2xl bg-crimson/10 border border-crimson/20 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-crimson flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">Emergency?</h3>
              <p className="text-xs text-muted-foreground">Get immediate help within 5 mins</p>
            </div>
            <Button 
              variant="emergency" 
              size="sm"
              onClick={() => navigate('/map')}
            >
              SOS
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 flex-1 overflow-auto pb-32">
          <h2 className="text-lg font-semibold text-foreground mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            How can we help?
          </h2>
          
          <div className="grid grid-cols-2 gap-4 stagger-children">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                subtitle={service.subtitle}
                onClick={() => {
                  setSelectedService(service.title);
                  navigate('/map');
                }}
                variant={index === services.length - 1 ? 'default' : 'default'}
              />
            ))}
            
            {/* More Services */}
            <button 
              onClick={() => {}}
              className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-border hover:border-secondary transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
                <span className="text-2xl text-muted-foreground">+</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">More</h3>
              <p className="text-xs text-muted-foreground">Services</p>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-light flex items-center justify-center">
                  <Battery className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">Battery Jump Start</h3>
                  <p className="text-xs text-muted-foreground">Dec 28, 2025 • Completed</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">Rs. 1,500</p>
                  <p className="text-xs text-secondary">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default HomeScreen;
