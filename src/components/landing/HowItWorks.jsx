import React from 'react';

const Step = ({ number, title, description, isLast }) => (
    <div className="flex flex-col items-center text-center relative">
        <div className="relative z-10 w-16 h-16 bg-white border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-2xl shadow-lg mb-6 group-hover:bg-primary group-hover:text-white transition-all transform hover:scale-110">
            {number}
        </div>
        {!isLast && (
            <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-dashed border-t-2 border-dashed border-gray-300"></div>
        )}
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-gray-600 px-4">{description}</p>
    </div>
);

const HowItWorks = () => {
    const steps = [
        {
            title: 'Register',
            description: 'Sign up with your VNRVJIET college email address.'
        },
        {
            title: 'Upload',
            description: 'Drag and drop your documents and choose file types.'
        },
        {
            title: 'Customize',
            description: 'Choose print options and add any needed stationery.'
        },
        {
            title: 'Collect',
            description: 'Pay online securely and collect when your order is ready.'
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">How It Works</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Getting your documents printed has never been this simple. Follow these 4 easy steps.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {steps.map((step, index) => (
                        <Step
                            key={index}
                            number={index + 1}
                            title={step.title}
                            description={step.description}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
