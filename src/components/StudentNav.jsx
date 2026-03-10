import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Printer, LogOut, Package, User, ChevronDown, Menu, X } from 'lucide-react';

const StudentNav = () => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 font-poppins">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <div className="p-1.5 bg-primary rounded-lg text-white">
                            <Printer size={22} />
                        </div>
                        <span className="text-xl font-bold text-primary tracking-tight">PrintEase</span>
                    </Link>

                    {/* Right: Desktop Profile */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/new-order" className="text-gray-600 hover:text-primary font-medium transition-colors">
                            New Order
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                            >
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                    {getInitials(user?.name)}
                                </div>
                                <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
                                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <Package size={16} />
                                        <span>My Orders</span>
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-600 rounded-lg hover:bg-gray-50"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg">
                    <div className="flex items-center space-x-3 px-2 mb-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {getInitials(user?.name)}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                    >
                        <Package size={20} className="text-primary" />
                        <span>My Orders</span>
                    </Link>
                    <Link
                        to="/new-order"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                    >
                        <Printer size={20} className="text-primary" />
                        <span>New Order</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default StudentNav;
