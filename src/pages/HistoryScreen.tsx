import React, { useEffect, useState } from 'react';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import { Battery, Car, Fuel, CircleDot, CheckCircle2, Wrench } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface BookingHistory {
  id: string;
  service_type: string;
  status: string;
  price: number | null;
  created_at: string;
  pickup_location: string;
  mechanics: {
    name: string;
    phone: string;
  } | null;
}

const getServiceIcon = (serviceType: string) => {
  const type = serviceType.toLowerCase();
  if (type.includes('battery')) return Battery;
  if (type.includes('tyre') || type.includes('tire')) return CircleDot;
  if (type.includes('fuel')) return Fuel;
  if (type.includes('car') || type.includes('tow')) return Car;
  return Wrench;
};

const HistoryScreen: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, spent: 0 });

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('bookings')
      .select('*, mechanics(name, phone)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setBookings(data);
      const totalSpent = data.reduce((sum, b) => sum + (b.price || 0), 0);
      setStats({ total: data.length, spent: totalSpent });
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        {/* Header */}
        <div className="px-6 pt-4 pb-6">
          <h1 className="text-2xl font-bold text-foreground">History</h1>
          <p className="text-muted-foreground">Your past service requests</p>
        </div>

        <div className="flex-1 overflow-auto px-6 pb-32">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 animate-slide-up">
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Services</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <p className="text-2xl font-bold text-foreground">
                Rs. 9.3K
              </p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-3 stagger-children">
              {bookings.map((booking) => {
                const Icon = getServiceIcon(booking.service_type);
                return (
                  <button
                    key={booking.id}
                    className="w-full bg-card rounded-2xl p-4 shadow-card flex items-center gap-4 hover:shadow-elevated transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-emerald-light flex items-center justify-center">
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">{booking.service_type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.mechanics?.name || 'Mechanic'} • {booking.mechanics?.phone || ''}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {booking.pickup_location} • {formatDate(booking.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {booking.price ? `Rs. ${booking.price.toLocaleString()}` : 'Pending'}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                        <span className="text-xs text-secondary capitalize">{booking.status}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No History</h3>
              <p className="text-muted-foreground text-sm">Your booking history will appear here</p>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default HistoryScreen;
