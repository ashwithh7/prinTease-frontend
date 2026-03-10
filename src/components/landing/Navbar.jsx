import React, { useState, useEffect } from 'react';
import { Menu, X, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How it Works', href: '#how-it-works' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="p-2 bg-primary rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
                            <Printer size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-xl font-bold leading-none ${isScrolled ? 'text-primary' : 'text-white'}`}>PrintEase</span>
                            <span className={`text-[10px] uppercase tracking-widest ${isScrolled ? 'text-primary/70' : 'text-white/70'}`}>VNRVJIET</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`font-medium transition-colors hover:text-secondary ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className={`px-6 py-2 rounded-full font-semibold transition-all border ${isScrolled ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white text-white hover:bg-white hover:text-primary'}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-2 rounded-full font-semibold bg-secondary text-white hover:bg-opacity-90 transition-all shadow-lg hover:shadow-secondary/30"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${isScrolled ? 'text-primary' : 'text-white'}`}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <div className="px-4 pt-4 pb-6 space-y-4 text-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-lg font-semibold text-gray-700 hover:text-secondary"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                        <Link to="/login" className="w-full py-3 rounded-xl font-bold text-primary border-2 border-primary">Login</Link>
                        <Link to="/register" className="w-full py-3 rounded-xl font-bold bg-secondary text-white">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
