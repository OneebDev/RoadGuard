import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, CreditCard, Wallet, Building2, 
  CheckCircle2, Shield, ChevronRight, Receipt 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', sublabel: '•••• 4532' },
  { id: 'jazzcash', icon: Wallet, label: 'JazzCash', sublabel: 'Mobile wallet' },
  { id: 'easypaisa', icon: Wallet, label: 'Easypaisa', sublabel: 'Mobile wallet' },
  { id: 'netbanking', icon: Building2, label: 'Bank Transfer', sublabel: 'HBL, UBL, MCB' },
];

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/rating');
    }, 2000);
  };

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        {/* Header */}
        <div className="px-6 pt-4 pb-6 flex items-center gap-4">
          <button 
            onClick={() => navigate('/tracking')}
            className="p-3 rounded-xl bg-card shadow-card"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Payment</h1>
        </div>

        <div className="flex-1 px-6 pb-32 overflow-auto">
          {/* Bill Summary */}
          <div className="bg-card rounded-2xl p-5 shadow-card mb-6 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <Receipt className="w-5 h-5 text-secondary" />
              <h2 className="font-semibold text-foreground">Bill Summary</h2>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Battery Jump Start</span>
                <span className="text-foreground">Rs. 1,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Charge</span>
                <span className="text-foreground">Rs. 200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span className="text-foreground">Rs. 100</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-lg text-foreground">Rs. 1,500</span>
              </div>
            </div>

            {/* Discount */}
            <div className="p-3 rounded-xl bg-emerald-light flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="text-sm text-secondary font-medium">First time discount applied!</span>
              </div>
              <span className="text-secondary font-bold">-Rs. 300</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-semibold text-foreground mb-4">Select Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      "w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300",
                      selectedMethod === method.id
                        ? "bg-emerald-light ring-2 ring-secondary"
                        : "bg-card shadow-card hover:shadow-elevated"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      selectedMethod === method.id ? "bg-secondary" : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        selectedMethod === method.id ? "text-secondary-foreground" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">{method.label}</h3>
                      <p className="text-sm text-muted-foreground">{method.sublabel}</p>
                    </div>
                    {selectedMethod === method.id && (
                      <CheckCircle2 className="w-6 h-6 text-secondary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Promo Code */}
          <button className="w-full p-4 rounded-2xl bg-card shadow-card flex items-center justify-between animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-foreground font-medium">Apply Promo Code</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-xs">100% Secure Payment</span>
          </div>
          <Button 
            variant="secondary" 
            size="xl" 
            className="w-full"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              <>Pay Rs. 1,500</>
            )}
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default PaymentScreen;
