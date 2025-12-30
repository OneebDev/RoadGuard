import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, MessageSquare, Phone, Mail, 
  HelpCircle, FileText, ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  { question: 'How do I request roadside assistance?', answer: 'Tap on the service you need from the home screen...' },
  { question: 'What payment methods are accepted?', answer: 'We accept all major credit/debit cards, UPI...' },
  { question: 'How long does a mechanic typically take to arrive?', answer: 'Average arrival time is 5-15 minutes...' },
  { question: 'Can I cancel a service request?', answer: 'Yes, you can cancel before the mechanic arrives...' },
];

const SupportScreen: React.FC = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold text-foreground">Help & Support</h1>
        </div>

        <div className="flex-1 overflow-auto px-6 pb-8">
          {/* Contact Options */}
          <div className="grid grid-cols-3 gap-3 mb-8 animate-slide-up">
            <button className="p-4 bg-card rounded-2xl shadow-card flex flex-col items-center gap-2 hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Phone className="w-6 h-6 text-secondary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Call Us</span>
            </button>
            <button className="p-4 bg-card rounded-2xl shadow-card flex flex-col items-center gap-2 hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-light flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">Chat</span>
            </button>
            <button className="p-4 bg-card rounded-2xl shadow-card flex flex-col items-center gap-2 hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Mail className="w-6 h-6 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Email</span>
            </button>
          </div>

          {/* FAQs */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <button
                  key={index}
                  className="w-full p-4 bg-card rounded-2xl shadow-card flex items-center gap-3 hover:shadow-elevated transition-all text-left"
                >
                  <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="flex-1 font-medium text-foreground text-sm">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Emergency */}
          <div className="mt-8 p-5 rounded-2xl bg-crimson/10 border border-crimson/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-foreground mb-2">24/7 Emergency Line</h3>
            <p className="text-sm text-muted-foreground mb-4">
              For urgent roadside emergencies, call our dedicated helpline.
            </p>
            <Button variant="emergency" className="w-full">
              <Phone className="w-5 h-5" />
              1800-ROADGUARD
            </Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default SupportScreen;
