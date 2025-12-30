import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, ArrowRight, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOTP = () => {
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (otp.every(digit => digit !== '')) {
      navigate('/home');
    }
  };

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        <div className="flex-1 px-6 pt-8 pb-12 flex flex-col">
          {/* Header */}
          <div className="mb-10 animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
            </h1>
            <p className="text-muted-foreground">
              {step === 'phone' 
                ? 'Enter your phone number to continue'
                : `We've sent a code to +92 ${phone}`
              }
            </p>
          </div>

          {step === 'phone' ? (
            <>
              {/* Phone Input */}
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm font-medium">+92</span>
                    <div className="w-px h-5 bg-border" />
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter your number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="h-14 pl-20 text-lg rounded-xl bg-card border-border focus:border-secondary focus:ring-secondary"
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex-1" />

              <Button 
                onClick={handleSendOTP}
                variant="secondary"
                size="xl"
                className="w-full animate-slide-up"
                style={{ animationDelay: '0.2s' }}
                disabled={phone.length < 10}
              >
                Send OTP
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-medium text-foreground">Enter 6-digit code</label>
                <div className="flex gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      className={cn(
                        "w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 bg-card transition-all duration-200",
                        "focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20",
                        digit ? "border-secondary" : "border-border"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Resend */}
              <button className="mt-6 text-secondary font-medium text-sm animate-fade-in">
                Resend code in 30s
              </button>

              <div className="flex-1" />

              <Button 
                onClick={handleVerify}
                variant="secondary"
                size="xl"
                className="w-full animate-slide-up"
                style={{ animationDelay: '0.2s' }}
                disabled={!otp.every(digit => digit !== '')}
              >
                Verify & Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Shield className="w-4 h-4" />
            <span className="text-xs">Your data is secure with us</span>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default LoginScreen;
