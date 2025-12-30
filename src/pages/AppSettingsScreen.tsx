import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft, Globe, Palette, Ruler, DollarSign, MapPin, Info } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const AppSettingsScreen: React.FC = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const [language, setLanguage] = useState('en');
    const [distanceUnit, setDistanceUnit] = useState('km');
    const [currency, setCurrency] = useState('PKR');
    const [mapStyle, setMapStyle] = useState('standard');

    const settingsSections = [
        {
            title: 'General',
            items: [
                {
                    icon: Globe,
                    label: 'Language',
                    value: language,
                    onChange: setLanguage,
                    options: [
                        { value: 'en', label: 'English' },
                        { value: 'ur', label: 'Urdu' },
                        { value: 'ar', label: 'Arabic' },
                    ],
                },
                {
                    icon: Palette,
                    label: 'Theme',
                    value: theme || 'system',
                    onChange: setTheme,
                    options: [
                        { value: 'light', label: 'Light' },
                        { value: 'dark', label: 'Dark' },
                        { value: 'system', label: 'System' },
                    ],
                },
            ],
        },
        {
            title: 'Units & Formats',
            items: [
                {
                    icon: Ruler,
                    label: 'Distance Unit',
                    value: distanceUnit,
                    onChange: setDistanceUnit,
                    options: [
                        { value: 'km', label: 'Kilometers (km)' },
                        { value: 'mi', label: 'Miles (mi)' },
                    ],
                },
                {
                    icon: DollarSign,
                    label: 'Currency',
                    value: currency,
                    onChange: setCurrency,
                    options: [
                        { value: 'PKR', label: 'Pakistani Rupee (PKR)' },
                        { value: 'USD', label: 'US Dollar (USD)' },
                        { value: 'EUR', label: 'Euro (EUR)' },
                    ],
                },
            ],
        },
        {
            title: 'Map Preferences',
            items: [
                {
                    icon: MapPin,
                    label: 'Map Style',
                    value: mapStyle,
                    onChange: setMapStyle,
                    options: [
                        { value: 'standard', label: 'Standard' },
                        { value: 'satellite', label: 'Satellite' },
                        { value: 'terrain', label: 'Terrain' },
                    ],
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
                    <h1 className="text-2xl font-bold text-foreground">App Settings</h1>
                </div>

                <div className="flex-1 overflow-auto px-6 pb-6">
                    {settingsSections.map((section, sectionIndex) => (
                        <div
                            key={section.title}
                            className="mb-6 animate-slide-up"
                            style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                        >
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                                {section.items.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.label}
                                            className={`p-5 ${index !== section.items.length - 1 ? 'border-b border-border' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-foreground" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-foreground mb-2">
                                                        {item.label}
                                                    </h4>
                                                    <Select value={item.value} onValueChange={item.onChange}>
                                                        <SelectTrigger className="w-full bg-muted border-border">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {item.options.map((option) => (
                                                                <SelectItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* App Info */}
                    <div
                        className="animate-slide-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                            About
                        </h3>
                        <div className="bg-card rounded-2xl shadow-card p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                    <Info className="w-5 h-5 text-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-foreground">App Information</h4>
                                </div>
                            </div>
                            <div className="space-y-2 pl-14">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Version</span>
                                    <span className="text-foreground font-medium">1.0.0</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Build</span>
                                    <span className="text-foreground font-medium">2024.12.31</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Platform</span>
                                    <span className="text-foreground font-medium">Web</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MobileFrame>
    );
};

export default AppSettingsScreen;
