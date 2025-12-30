import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import {
    ArrowLeft,
    FileText,
    Shield,
    Cookie,
    DollarSign,
    Users,
    Info,
    ExternalLink,
} from 'lucide-react';

const TermsPoliciesScreen: React.FC = () => {
    const navigate = useNavigate();

    const policies = [
        {
            icon: FileText,
            label: 'Terms of Service',
            description: 'Our terms and conditions for using RoadGuard',
            lastUpdated: 'December 15, 2024',
            link: '#',
        },
        {
            icon: Shield,
            label: 'Privacy Policy',
            description: 'How we collect and use your data',
            lastUpdated: 'December 15, 2024',
            link: '#',
        },
        {
            icon: Cookie,
            label: 'Cookie Policy',
            description: 'Information about cookies we use',
            lastUpdated: 'November 20, 2024',
            link: '#',
        },
        {
            icon: DollarSign,
            label: 'Refund Policy',
            description: 'Our refund and cancellation policy',
            lastUpdated: 'October 10, 2024',
            link: '#',
        },
        {
            icon: Users,
            label: 'Community Guidelines',
            description: 'Rules for respectful interaction',
            lastUpdated: 'September 5, 2024',
            link: '#',
        },
        {
            icon: Info,
            label: 'About RoadGuard',
            description: 'Learn more about our mission and team',
            lastUpdated: 'January 1, 2024',
            link: '#',
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
                    <h1 className="text-2xl font-bold text-foreground">Terms & Policies</h1>
                </div>

                <div className="flex-1 overflow-auto px-6 pb-6">
                    {/* Intro Text */}
                    <div className="mb-6 animate-slide-up">
                        <p className="text-sm text-muted-foreground">
                            Review our terms, policies, and guidelines to understand how RoadGuard works and how we protect your data.
                        </p>
                    </div>

                    {/* Policies List */}
                    <div className="space-y-4">
                        {policies.map((policy, index) => {
                            const Icon = policy.icon;
                            return (
                                <a
                                    key={policy.label}
                                    href={policy.link}
                                    className="block bg-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-foreground" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-foreground">
                                                    {policy.label}
                                                </h3>
                                                <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {policy.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Last updated: {policy.lastUpdated}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* Contact Info */}
                    <div
                        className="mt-6 bg-secondary/10 rounded-2xl p-5 border border-secondary/20 animate-slide-up"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <h4 className="font-semibold text-foreground mb-2">
                            Questions?
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            If you have any questions about our terms or policies, please contact us at{' '}
                            <a href="mailto:support@roadguard.com" className="text-secondary font-medium">
                                support@roadguard.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </MobileFrame>
    );
};

export default TermsPoliciesScreen;
