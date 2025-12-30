import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, CheckCircle2, ThumbsUp, Heart, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const quickFeedback = [
  { icon: ThumbsUp, label: 'Great Service' },
  { icon: Clock, label: 'On Time' },
  { icon: Zap, label: 'Quick Fix' },
  { icon: Heart, label: 'Friendly' },
];

const RatingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFeedback = (label: string) => {
    setSelectedFeedback(prev => 
      prev.includes(label) 
        ? prev.filter(f => f !== label)
        : [...prev, label]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  if (submitted) {
    return (
      <MobileFrame>
        <div className="h-full bg-background flex flex-col items-center justify-center px-8">
          <div className="animate-slide-up text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 shadow-glow">
              <CheckCircle2 className="w-12 h-12 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
            <p className="text-muted-foreground">Your feedback helps us improve</p>
          </div>
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        <div className="flex-1 px-6 pt-8 pb-32 overflow-auto">
          {/* Success badge */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <CheckCircle2 className="w-10 h-10 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Service Completed!</h1>
            <p className="text-muted-foreground">How was your experience?</p>
          </div>

          {/* Mechanic card */}
          <div className="bg-card rounded-2xl p-5 shadow-card mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl gradient-emerald flex items-center justify-center text-3xl">
                👨‍🔧
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">Ahmed Khan</h2>
                <p className="text-sm text-muted-foreground">Battery Jump Start • Rs. 1,500</p>
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-foreground mb-4">Rate your experience</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-2 transition-transform hover:scale-110"
                >
                  <Star 
                    className={cn(
                      "w-10 h-10 transition-colors duration-200",
                      star <= rating 
                        ? "text-secondary fill-secondary" 
                        : "text-muted"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Feedback */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-foreground mb-4">What went well?</h3>
            <div className="flex flex-wrap gap-2">
              {quickFeedback.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => toggleFeedback(label)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300",
                    selectedFeedback.includes(label)
                      ? "bg-secondary text-secondary-foreground shadow-glow"
                      : "bg-card text-foreground shadow-card hover:shadow-elevated"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-semibold text-foreground mb-4">Write a review (optional)</h3>
            <Textarea
              placeholder="Share your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px] rounded-xl bg-card border-border resize-none"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg"
              className="flex-1"
              onClick={() => navigate('/home')}
            >
              Skip
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="flex-1"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default RatingScreen;
