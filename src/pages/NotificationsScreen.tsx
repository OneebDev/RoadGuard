import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface NotificationSettings {
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    bookingUpdates: boolean;
    promotions: boolean;
    serviceReminders: boolean;
    paymentConfirmations: boolean;
}

const NotificationsScreen: React.FC = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<NotificationSettings>({
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        bookingUpdates: true,
        promotions: true,
        serviceReminders: true,
        paymentConfirmations: true,
    });

    const toggleSetting = (key: keyof NotificationSettings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationSections = [
        {
            title: 'Channels',
            items: [
                {
                    key: 'pushNotifications' as keyof NotificationSettings,
                    label: 'Push Notifications',
                    description: 'Receive notifications on your device',
                },
                {
                    key: 'emailNotifications' as keyof NotificationSettings,
                    label: 'Email Notifications',
                    description: 'Receive updates via email',
                },
                {
                    key: 'smsNotifications' as keyof NotificationSettings,
                    label: 'SMS Notifications',
                    description: 'Receive text messages for important updates',
                },
            ],
        },
        {
            title: 'Preferences',
            items: [
                {
                    key: 'bookingUpdates' as keyof NotificationSettings,
                    label: 'Booking Updates',
                    description: 'Notifications about your service bookings',
                },
                {
                    key: 'promotions' as keyof NotificationSettings,
                    label: 'Promotions & Offers',
                    description: 'Special deals and discounts',
                },
                {
                    key: 'serviceReminders' as keyof NotificationSettings,
                    label: 'Service Reminders',
                    description: 'Reminders for scheduled services',
                },
                {
                    key: 'paymentConfirmations' as keyof NotificationSettings,
                    label: 'Payment Confirmations',
                    description: 'Receipts and payment updates',
                },
            ],
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
                    <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                </div>

                <div className="flex-1 overflow-auto px-6 pb-6">
                    {notificationSections.map((section, sectionIndex) => (
                        <div
                            key={section.title}
                            className="mb-6 animate-slide-up"
                            style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                        >
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                                {section.items.map((item, index) => (
                                    <div
                                        key={item.key}
                                        className={`p-5 ${index !== section.items.length - 1 ? 'border-b border-border' : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-foreground mb-1">
                                                    {item.label}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <Switch
                                                checked={settings[item.key]}
                                                onCheckedChange={() => toggleSetting(item.key)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Info Card */}
                    <div
                        className="bg-secondary/10 rounded-2xl p-5 border border-secondary/20 animate-slide-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <p className="text-sm text-foreground">
                            💡 <span className="font-medium">Tip:</span> You can manage notification permissions in your device settings.
                        </p>
                    </div>
                </div>
            </div>
        </MobileFrame>
    );
};

export default NotificationsScreen;
