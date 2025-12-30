import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFrame from '@/components/MobileFrame';
import StatusBar from '@/components/StatusBar';
import { ArrowLeft, CreditCard, Plus, Trash2, Check } from 'lucide-react';

interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'easypaisa';
    last4: string;
    expiryDate?: string;
    isDefault: boolean;
}

const PaymentMethodsScreen: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: '1', type: 'visa', last4: '4532', expiryDate: '12/25', isDefault: true },
        { id: '2', type: 'mastercard', last4: '8901', expiryDate: '08/26', isDefault: false },
        { id: '3', type: 'easypaisa', last4: '7890', isDefault: false },
    ]);

    const getCardIcon = (type: string) => {
        const icons: Record<string, string> = {
            visa: '💳',
            mastercard: '💳',
            easypaisa: '📱',
        };
        return icons[type] || '💳';
    };

    const getCardName = (type: string) => {
        const names: Record<string, string> = {
            visa: 'Visa',
            mastercard: 'Mastercard',
            easypaisa: 'Easypaisa',
        };
        return names[type] || 'Card';
    };

    const handleSetDefault = (id: string) => {
        setPaymentMethods(methods =>
            methods.map(method => ({
                ...method,
                isDefault: method.id === id,
            }))
        );
    };

    const handleDelete = (id: string) => {
        setPaymentMethods(methods => methods.filter(method => method.id !== id));
    };

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
                    <h1 className="text-2xl font-bold text-foreground">Payment Methods</h1>
                </div>

                <div className="flex-1 overflow-auto px-6 pb-24">
                    {/* Payment Methods List */}
                    {paymentMethods.length > 0 ? (
                        <div className="space-y-4">
                            {paymentMethods.map((method, index) => (
                                <div
                                    key={method.id}
                                    className="bg-card rounded-2xl p-5 shadow-card animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-2xl">
                                                {getCardIcon(method.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-foreground">
                                                        {getCardName(method.type)}
                                                    </h3>
                                                    {method.isDefault && (
                                                        <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs font-medium flex items-center gap-1">
                                                            <Check className="w-3 h-3" />
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    •••• •••• •••• {method.last4}
                                                </p>
                                                {method.expiryDate && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Expires {method.expiryDate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(method.id)}
                                            className="w-9 h-9 rounded-lg bg-crimson/10 flex items-center justify-center hover:bg-crimson/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 text-crimson" />
                                        </button>
                                    </div>

                                    {!method.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(method.id)}
                                            className="mt-4 w-full py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                                        >
                                            Set as Default
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 animate-slide-up">
                            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                                <CreditCard className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <p className="text-lg font-semibold text-foreground mb-2">
                                No Payment Methods
                            </p>
                            <p className="text-sm text-muted-foreground text-center px-8">
                                Add a payment method to make bookings easier
                            </p>
                        </div>
                    )}
                </div>

                {/* Add Payment Method Button */}
                <div className="absolute bottom-6 left-6 right-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <button
                        onClick={() => {/* Add payment method logic */ }}
                        className="w-full py-4 rounded-2xl gradient-emerald text-white font-semibold shadow-elevated hover:shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Payment Method
                    </button>
                </div>
            </div>
        </MobileFrame>
    );
};

export default PaymentMethodsScreen;
