import React from 'react';
import { Users, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';

const StatsBar = () => {
    const stats = [
        { icon: Users, label: '500+', sublabel: 'Students' },
        { icon: ShoppingBag, label: '1000+', sublabel: 'Orders' },
        { icon: Zap, label: '2 min', sublabel: 'Wait Time' },
        { icon: ShieldCheck, label: '100%', sublabel: 'Secure' },
    ];

    return (
        <div className="bg-primary py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center text-white border-r last:border-0 border-white/10 px-4">
                            <stat.icon size={32} className="text-secondary mb-3" />
                            <span className="text-3xl font-bold mb-1">{stat.label}</span>
                            <span className="text-sm text-white/60 tracking-widest uppercase font-semibold">{stat.sublabel}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-dark text-white/50 py-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:row justify-between items-center text-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <span className="text-white font-bold tracking-tight">PrintEase</span>
                    <span className="text-xs">© 2024 VNRVJIET</span>
                </div>
                <div className="flex space-x-6 text-sm">
                    <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-secondary transition-colors">Contact Support</a>
                </div>
            </div>
        </footer>
    );
};

export { StatsBar, Footer };
