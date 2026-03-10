import React from 'react';
import { FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen pt-20 flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary to-dark text-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -ml-32 -mb-32"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
                            Skip the Queue. <br />
                            <span className="text-secondary">Order Prints Online.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                            Upload documents, choose options, pay online.
                            Pick up when ready — no waiting in line at the shop!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-secondary hover:bg-opacity-90 text-white rounded-xl font-bold text-lg shadow-xl shadow-secondary/20 flex items-center justify-center space-x-2 transition-all group">
                                <span>Get Started Free</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a href="#how-it-works" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-lg backdrop-blur-sm border border-white/20 transition-all text-center">
                                See How It Works
                            </a>
                        </div>
                    </motion.div>

                    {/* Floating Card Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 floating">
                            <div className="bg-white rounded-2xl p-6 shadow-2xl text-gray-800 border border-gray-100 max-w-sm mx-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg">Order Status</h3>
                                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full animate-pulse">Live</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-2 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                            <div className="h-1.5 w-16 bg-gray-100 rounded"></div>
                                        </div>
                                        <CheckCircle className="text-green-500" size={18} />
                                    </div>

                                    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg opacity-80">
                                        <div className="p-2 bg-secondary/10 text-secondary rounded-md">
                                            <Clock size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-2 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                                            <div className="h-1.5 w-12 bg-gray-100 rounded"></div>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">Pickup Counter</span>
                                    <span className="text-sm font-bold text-primary">A-Block, Room 201</span>
                                </div>
                            </div>

                            {/* Decorative elements around the card */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-20 blur-xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full opacity-30 blur-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
