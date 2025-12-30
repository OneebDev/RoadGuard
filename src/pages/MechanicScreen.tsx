import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Star, Clock, MapPin, Phone, MessageSquare, 
  Shield, Award, Briefcase, ChevronRight 
} from 'lucide-react';

const MechanicScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        {/* Header */}
        <div className="px-6 pt-4 pb-6">
          <button 
            onClick={() => navigate('/map')}
            className="p-3 rounded-xl bg-card shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-6 pb-32">
          {/* Profile Card */}
          <div className="bg-card rounded-3xl p-6 shadow-card mb-6 animate-slide-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl gradient-emerald flex items-center justify-center text-4xl shadow-glow">
                👨‍🔧
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-foreground">Ahmed Khan</h1>
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-muted-foreground text-sm">Expert Mechanic • 0321-1234567</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-light">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                    <span className="text-sm font-bold text-foreground">4.9</span>
                  </div>
                  <span className="text-sm text-muted-foreground">234 reviews</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-background text-center">
                <Award className="w-5 h-5 text-secondary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">5+</p>
                <p className="text-xs text-muted-foreground">Years Exp</p>
              </div>
              <div className="p-3 rounded-xl bg-background text-center">
                <Briefcase className="w-5 h-5 text-secondary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">1.2K+</p>
                <p className="text-xs text-muted-foreground">Jobs Done</p>
              </div>
              <div className="p-3 rounded-xl bg-background text-center">
                <Clock className="w-5 h-5 text-secondary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">5 min</p>
                <p className="text-xs text-muted-foreground">ETA</p>
              </div>
            </div>

            {/* Contact buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1">
                <Phone className="w-5 h-5" />
                Call
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <MessageSquare className="w-5 h-5" />
                Message
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-bold text-foreground mb-3">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              {['Car Repair', 'Bike Service', 'Battery', 'Tyre Change', 'Engine', 'AC Repair'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full bg-card text-sm font-medium text-foreground shadow-card"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-foreground">Recent Reviews</h2>
              <button className="text-sm text-secondary font-medium flex items-center gap-1">
                See all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
            {[
                { name: 'Faisal A.', rating: 5, text: 'Very professional and quick service. Highly recommended!' },
                { name: 'Sana K.', rating: 5, text: 'Arrived within 5 mins. Fixed my car battery issue perfectly.' },
              ].map((review, i) => (
                <div key={i} className="p-4 rounded-2xl bg-card shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{review.name}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-secondary fill-secondary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <Button 
            variant="secondary" 
            size="xl" 
            className="w-full"
            onClick={() => navigate('/tracking')}
          >
            Book Now • Rs. 1,500
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default MechanicScreen;
