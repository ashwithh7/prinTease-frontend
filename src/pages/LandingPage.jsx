import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import { StatsBar, Footer } from '../components/landing/StatsAndFooter';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white selection:bg-secondary/30 selection:text-primary">
            <Navbar />
            <main>
                <Hero />
                <StatsBar />
                <Features />
                <HowItWorks />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
