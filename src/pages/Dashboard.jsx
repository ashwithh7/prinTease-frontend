import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentNav from '../components/StudentNav';
import {
    Plus,
    ShoppingBag,
    Clock,
    CheckCircle,
    TrendingUp,
    FileText,
    ChevronRight,
    Printer
} from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    const mockOrders = [
        { id: 'PE-2024-0001', date: '2024-03-01', files: 2, amount: 45, status: 'ready' },
        { id: 'PE-2024-0002', date: '2024-03-05', files: 1, amount: 12, status: 'printing' },
        { id: 'PE-2024-0003', date: '2024-03-07', files: 3, amount: 89, status: 'pending' },
        { id: 'PE-2024-0004', date: '2024-03-08', files: 1, amount: 5, status: 'collected' },
        { id: 'PE-2024-0005', date: '2024-03-10', files: 2, amount: 34, status: 'confirmed' }
    ];

    // Stats Calculations
    const stats = useMemo(() => ({
        total: mockOrders.length,
        pending: mockOrders.filter(o => o.status === 'pending').length,
        ready: mockOrders.filter(o => o.status === 'ready').length,
        totalSpent: mockOrders.reduce((sum, o) => sum + o.amount, 0)
    }), [mockOrders]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-50 text-blue-800 border-blue-200';
            case 'printing': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
            case 'ready': return 'bg-green-50 text-green-800 border-green-200';
            case 'collected': return 'bg-gray-50 text-gray-600 border-gray-200';
            default: return 'bg-gray-50 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins pt-16">
            <StudentNav />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">
                            {new Date().toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <Link
                        to="/new-order"
                        className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-secondary text-white rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-[1.02] transition-all"
                    >
                        <Plus size={20} />
                        <span>New Order</span>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-primary hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                <ShoppingBag size={24} />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Orders</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-sm text-gray-500 font-medium">Total Volume</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                <Clock size={24} />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        <p className="text-sm text-gray-500 font-medium">Pending Processing</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <CheckCircle size={24} />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ready</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.ready}</p>
                        <p className="text-sm text-gray-500 font-medium">Pickup Waiting</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-secondary hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-secondary/5 rounded-lg text-secondary">
                                <TrendingUp size={24} />
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Spent</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent}</p>
                        <p className="text-sm text-gray-500 font-medium">Total Investment</p>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                        <button className="text-sm font-semibold text-primary hover:text-secondary transition-colors underline decoration-2 underline-offset-4">
                            View All History
                        </button>
                    </div>

                    {mockOrders.length === 0 ? (
                        /* Empty State */
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 text-gray-300 rounded-full mb-4">
                                <Printer size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No orders yet!</h3>
                            <p className="text-gray-500 mb-6">Place your first print order to skip the queue.</p>
                            <Link
                                to="/new-order"
                                className="inline-flex px-6 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-opacity-95 transition-all"
                            >
                                Place First Order
                            </Link>
                        </div>
                    ) : (
                        /* Orders Table Desktop */
                        <>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50">
                                        <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-center">Files</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {mockOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4 font-bold text-gray-700 text-sm">{order.id}</td>
                                                <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(order.date)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">
                                                        <FileText size={12} />
                                                        <span>{order.files}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-primary">₹{order.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)} uppercase tracking-tighter`}>
                                                        {order.status === 'ready' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>}
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        to={`/orders/${order.id}`}
                                                        className="text-primary hover:text-secondary p-2 inline-block transition-colors"
                                                    >
                                                        <ChevronRight size={20} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Table Stacking */}
                            <div className="md:hidden divide-y divide-gray-100">
                                {mockOrders.map((order) => (
                                    <div key={order.id} className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{order.id}</p>
                                                <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusStyle(order.status)} uppercase tracking-widest`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3 text-sm">
                                                <span className="text-gray-500 flex items-center space-x-1">
                                                    <FileText size={14} />
                                                    <span>{order.files} Files</span>
                                                </span>
                                                <span className="font-bold text-primary">₹{order.amount}</span>
                                            </div>
                                            <Link to={`/orders/${order.id}`} className="text-xs font-bold text-primary flex items-center space-x-1 uppercase">
                                                <span>Details</span>
                                                <ChevronRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
