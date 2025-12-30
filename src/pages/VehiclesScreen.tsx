import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft, Car, Bike, Plus, Trash2, Star, Edit2, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

const VehiclesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [vehicleType, setVehicleType] = useState<'car' | 'bike' | 'rickshaw'>('car');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    loadVehicles();
  }, [user]);

  const loadVehicles = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', user.id)
      .order('is_primary', { ascending: false });

    if (data && !error) {
      setVehicles(data);
    }
    setLoading(false);
  };

  const handleAddVehicle = async () => {
    if (!user || !brand || !model || !registrationNumber) {
      toast.error('Please fill all fields');
      return;
    }

    const { data, error } = await supabase
      .from('vehicles')
      .insert({
        user_id: user.id,
        vehicle_type: vehicleType,
        brand,
        model,
        registration_number: registrationNumber,
        color: color || null,
        year: year ? parseInt(year) : null,
        is_primary: vehicles.length === 0,
      })
      .select()
      .single();

    if (data && !error) {
      setVehicles([...vehicles, data]);
      toast.success('Vehicle added successfully!');
      resetForm();
    } else {
      toast.error('Failed to add vehicle');
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (!error) {
      setVehicles(vehicles.filter(v => v.id !== id));
      toast.success('Vehicle deleted successfully');
    }
  };

  const handleSetPrimary = async (id: string) => {
    // First, unset all as primary
    await supabase
      .from('vehicles')
      .update({ is_primary: false })
      .eq('user_id', user?.id);

    // Set selected as primary
    await supabase
      .from('vehicles')
      .update({ is_primary: true })
      .eq('id', id);

    loadVehicles();
    toast.success('Primary vehicle set successfully');
  };

  const resetForm = () => {
    setShowAddForm(false);
    setVehicleType('car');
    setBrand('');
    setModel('');
    setRegistrationNumber('');
    setColor('');
    setYear('');
  };

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        {/* Header */}
        <div className="px-6 pt-4 pb-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-3 rounded-xl bg-card shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">My Vehicles</h1>
        </div>

        <div className="flex-1 overflow-auto px-6 pb-32">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Vehicles List */}
              {vehicles.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={cn(
                        "bg-card rounded-2xl p-4 shadow-card",
                        vehicle.is_primary && "ring-2 ring-secondary"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                          {vehicle.vehicle_type === 'car' ? (
                            <Car className="w-7 h-7 text-foreground" />
                          ) : (
                            <Bike className="w-7 h-7 text-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {vehicle.brand} {vehicle.model}
                            </h3>
                            {vehicle.is_primary && (
                              <Star className="w-4 h-4 text-secondary fill-secondary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{vehicle.registration_number}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {vehicle.color && (
                              <span className="text-xs text-muted-foreground">{vehicle.color}</span>
                            )}
                            {vehicle.year && (
                              <span className="text-xs text-muted-foreground">• {vehicle.year}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {!vehicle.is_primary && (
                            <button
                              onClick={() => handleSetPrimary(vehicle.id)}
                              className="p-2 rounded-lg bg-emerald-light"
                            >
                              <Star className="w-4 h-4 text-secondary" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            className="p-2 rounded-lg bg-crimson/10"
                          >
                            <Trash2 className="w-4 h-4 text-crimson" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Car className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Vehicles</h3>
                  <p className="text-muted-foreground text-sm mb-6">Add your first vehicle</p>
                </div>
              )}

              {/* Add Form */}
              {showAddForm ? (
                <div className="bg-card rounded-2xl p-5 shadow-card animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Add New Vehicle</h3>
                    <button onClick={resetForm}>
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Vehicle Type */}
                  <div className="flex gap-3 mb-4">
                    {(['car', 'bike', 'rickshaw'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setVehicleType(type)}
                        className={cn(
                          "flex-1 p-3 rounded-xl flex flex-col items-center gap-1 transition-all",
                          vehicleType === type
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {type === 'car' ? <Car className="w-5 h-5" /> : <Bike className="w-5 h-5" />}
                        <span className="text-xs font-medium capitalize">{type}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Brand (e.g. Toyota, Honda)"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                    <Input
                      placeholder="Model (e.g. Corolla, Civic)"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                    <Input
                      placeholder="Registration Number (e.g. ABC-123)"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                      <Input
                        placeholder="Year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full mt-4"
                    onClick={handleAddVehicle}
                  >
                    Add Vehicle
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="w-5 h-5" />
                  Add New Vehicle
                </Button>
              )}
            </>
          )}
        </div>

        <BottomNav />
      </div>
    </MobileFrame>
  );
};

export default VehiclesScreen;
