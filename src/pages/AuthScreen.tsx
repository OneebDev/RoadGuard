import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');
const nameSchema = z.string().min(2, 'Name must be at least 2 characters');

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, resetPassword, user, loading } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') setMode('signup');
    else if (modeParam === 'forgot') setMode('forgot');
    else setMode('login');
  }, [searchParams]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    
    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }

    if (mode !== 'forgot') {
      try {
        passwordSchema.parse(password);
      } catch (e) {
        if (e instanceof z.ZodError) {
          newErrors.password = e.errors[0].message;
        }
      }
    }

    if (mode === 'signup') {
      try {
        nameSchema.parse(fullName);
      } catch (e) {
        if (e instanceof z.ZodError) {
          newErrors.name = e.errors[0].message;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Login successful!');
          navigate('/home');
        }
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created! Please login');
          setMode('login');
        }
      } else if (mode === 'forgot') {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Password reset link sent to your email');
          setMode('login');
        }
      }
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Reset Password';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Sign in to continue';
      case 'signup': return 'Join RoadGuard today';
      case 'forgot': return 'Enter your email to reset password';
    }
  };

  if (loading) {
    return (
      <MobileFrame>
        <div className="h-full bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </MobileFrame>
    );
  }

  return (
    <MobileFrame>
      <div className="h-full bg-background flex flex-col">
        <StatusBar />

        <div className="flex-1 px-6 pt-4 pb-8 flex flex-col overflow-auto">
          {/* Back button */}
          {mode !== 'login' && (
            <button 
              onClick={() => setMode('login')}
              className="p-3 rounded-xl bg-card shadow-card w-fit mb-4"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">{getTitle()}</h1>
            <p className="text-muted-foreground">{getSubtitle()}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 flex-1">
            {/* Name Input - Only for signup */}
            {mode === 'signup' && (
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.05s' }}>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-14 pl-12 text-base rounded-xl bg-card border-border focus:border-secondary focus:ring-secondary"
                  />
                </div>
                {errors.name && <p className="text-xs text-crimson">{errors.name}</p>}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 text-base rounded-xl bg-card border-border focus:border-secondary focus:ring-secondary"
                />
              </div>
              {errors.email && <p className="text-xs text-crimson">{errors.email}</p>}
            </div>

            {/* Password Input - Not for forgot mode */}
            {mode !== 'forgot' && (
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 pr-12 text-base rounded-xl bg-card border-border focus:border-secondary focus:ring-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-crimson">{errors.password}</p>}
              </div>
            )}

            {/* Forgot Password Link */}
            {mode === 'login' && (
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-sm text-secondary font-medium"
              >
                Forgot password?
              </button>
            )}

            <div className="flex-1" />

            {/* Submit Button */}
            <Button 
              type="submit"
              variant="secondary"
              size="xl"
              className="w-full animate-slide-up"
              style={{ animationDelay: '0.2s' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  {mode === 'login' && 'Login'}
                  {mode === 'signup' && 'Sign Up'}
                  {mode === 'forgot' && 'Send Reset Link'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>

            {/* Switch mode */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.25s' }}>
              {mode === 'login' ? (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-secondary font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              ) : mode === 'signup' ? (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-secondary font-semibold"
                  >
                    Login
                  </button>
                </p>
              ) : null}
            </div>
          </form>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Your data is secure with us</span>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default AuthScreen;
