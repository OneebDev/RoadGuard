import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft, Lock, Shield, Fingerprint, Eye, Trash2, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const PrivacySecurityScreen: React.FC = () => {
    const navigate = useNavigate();
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [biometricLogin, setBiometricLogin] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    const securityActions = [
        {
            icon: Lock,
            label: 'Change Password',
            description: 'Update your account password',
            onClick: () => {/* Change password logic */ },
        },
        {
            icon: Eye,
            label: 'Login History',
            description: 'View your recent login activity',
            onClick: () => {/* View login history */ },
        },
    ];

    return (
        <MobileFrame>
            <div className="h-full bg-background flex flex-col">
                <StatusBar />

                {/* Header */}
                <div className="px-6 pt-4 pb-6 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/profile')}
                        className="w-10 h-10 rounded-xl bg-card flex items-center justify-center hover:bg-muted transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <h1 className="text-2xl font-bold text-foreground">Privacy & Security</h1>
                </div>

                <div className="flex-1 overflow-auto px-6 pb-6">
                    {/* Security Actions */}
                    <div className="mb-6 animate-slide-up">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                            Account Security
                        </h3>
                        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                            {securityActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={action.label}
                                        onClick={action.onClick}
                                        className={`w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors ${index !== securityActions.length - 1 ? 'border-b border-border' : ''
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-foreground" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className="font-medium text-foreground">{action.label}</h4>
                                            <p className="text-sm text-muted-foreground">{action.description}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                            Security Preferences
                        </h3>
                        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                            <div className="p-5 border-b border-border">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mt-0.5">
                                            <Shield className="w-5 h-5 text-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-foreground mb-1">
                                                Two-Factor Authentication
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={twoFactorAuth}
                                        onCheckedChange={setTwoFactorAuth}
                                    />
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mt-0.5">
                                            <Fingerprint className="w-5 h-5 text-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-foreground mb-1">
                                                Biometric Login
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Use fingerprint or face recognition
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={biometricLogin}
                                        onCheckedChange={setBiometricLogin}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                            Privacy Preferences
                        </h3>
                        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                            <div className="p-5 border-b border-border">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-foreground mb-1">
                                            Data Sharing
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Share data with partners for better service
                                        </p>
                                    </div>
                                    <Switch
                                        checked={dataSharing}
                                        onCheckedChange={setDataSharing}
                                    />
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-foreground mb-1">
                                            Analytics
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Help us improve by sharing usage data
                                        </p>
                                    </div>
                                    <Switch
                                        checked={analytics}
                                        onCheckedChange={setAnalytics}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                            Danger Zone
                        </h3>
                        <button
                            onClick={() => {/* Delete account logic */ }}
                            className="w-full bg-crimson/10 rounded-2xl p-5 border-2 border-crimson/20 hover:bg-crimson/20 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-crimson/20 flex items-center justify-center">
                                    <Trash2 className="w-5 h-5 text-crimson" />
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="font-medium text-crimson">Delete Account</h4>
                                    <p className="text-sm text-crimson/80">
                                        Permanently delete your account and data
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-crimson" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </MobileFrame>
    );
};

export default PrivacySecurityScreen;
