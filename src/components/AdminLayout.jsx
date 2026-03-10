import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ClipboardList,
    Package,
    LogOut,
    Printer,
    Menu,
    X,
    Bell,
    User
} from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'All Orders', path: '/admin/orders', icon: ClipboardList },
        { name: 'Inventory', path: '/admin/inventory', icon: Package },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-primary text-white flex-col fixed inset-y-0 z-50">
                <div className="p-6 border-b border-white/10 flex items-center space-x-3">
                    <div className="p-2 bg-secondary rounded-lg">
                        <Printer size={24} className="text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-black tracking-tighter">PrintEase</span>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5 leading-none">Admin Panel</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-6">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all
                  ${isActive ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <Icon size={20} />
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}

                    <div className="h-px bg-white/10 my-6"></div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>

                <div className="p-6 border-t border-white/10 bg-black/10">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="truncate">
                            <p className="text-xs font-black truncate">{user?.name || 'System Admin'}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-black">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Wrapper */}
            <div className="flex-1 lg:pl-64 flex flex-col">
                {/* Top Header */}
                <header className="bg-white h-16 border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="hidden lg:flex items-center text-sm font-bold text-gray-400">
                        {navLinks.find(l => l.path === location.pathname)?.name || 'Admin'}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100"></div>
                        <div className="flex items-center space-x-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 leading-none">Admin Station</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">A-Block Main</p>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6 lg:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
