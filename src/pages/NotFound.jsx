import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Home, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-poppins">
            <div className="max-w-md w-full text-center">
                <div className="relative inline-block mb-8">
                    <div className="text-[150px] font-extrabold text-primary/10 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-6 bg-white rounded-3xl shadow-xl flex items-center justify-center text-primary group hover:rotate-[360deg] transition-transform duration-700">
                            <Printer size={64} />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">Oops! Page not found</h1>
                <p className="text-gray-500 mb-10 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved to a different location.
                    Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-3.5 bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-95 transition-all shadow-lg shadow-primary/20"
                    >
                        <Home size={20} />
                        <span>Go to Home</span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Go Back
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center space-x-1 text-gray-400">
                    <Search size={14} />
                    <span className="text-xs font-medium uppercase tracking-widest">Searching for something else?</span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
