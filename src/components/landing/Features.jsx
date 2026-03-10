import React from 'react';
import { UploadCloud, Settings, CreditCard } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <div
        className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border-b-4 hover:border-b-secondary"
    >
        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors mb-6">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const Features = () => {
    const features = [
        {
            icon: UploadCloud,
            title: 'Upload Files',
            description: 'PDF, DOC, Images — drag & drop easy. Support for multiple files in a single order.'
        },
        {
            icon: Settings,
            title: 'Print Options',
            description: 'Color/BW, A4/A3, single or double sided. Pick exactly what you need.'
        },
        {
            icon: CreditCard,
            title: 'Pay & Pickup',
            description: 'Pay online securely, skip the queue entirely. Get notified when its ready.'
        }
    ];

    return (
        <section id="features" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Powerful Features</h2>
                    <div className="w-20 h-1.5 bg-secondary mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
