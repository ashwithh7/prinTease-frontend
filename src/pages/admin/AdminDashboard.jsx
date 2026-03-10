import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag,
    Clock,
    Printer,
    TrendingUp,
    BarChart3,
    Eye,
    User,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([
        { id: 'PE-2024-0010', student: 'Rahul Sharma', cid: '22071A0501', amount: 45, status: 'pending', time: '10:15 AM' },
        { id: 'PE-2024-0011', student: 'Priya Reddy', cid: '21071A1208', amount: 120, status: 'printing', time: '10:30 AM' },
        { id: 'PE-2024-0012', student: 'Amit Kumar', cid: '23071A0415', amount: 15, status: 'ready', time: '10:45 AM' },
        { id: 'PE-2024-0013', student: 'Sneha Kapur', cid: '22071A6602', amount: 89, status: 'confirmed', time: '11:00 AM' },
        { id: 'PE-2024-0014', student: 'Varun Tej', cid: '20071A0234', amount: 200, status: 'printing', time: '11:15 AM' },
        { id: 'PE-2024-0015', student: 'Anjali P', cid: '22075A0512', amount: 34, status: 'pending', time: '11:20 AM' },
        { id: 'PE-2024-0016', student: 'Karthik S', cid: '21071A05J9', amount: 55, status: 'ready', time: '11:35 AM' },
        { id: 'PE-2024-0017', student: 'Mona Lisa', cid: '23071A0510', amount: 67, status: 'collected', time: '11:45 AM' },
    ]);

    const [flashingRow, setFlashingRow] = useState(null);

    const stats = [
        { label: 'Orders Today', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending', value: '5', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Printing', value: '3', icon: Printer, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Today Revenue', value: '₹1,240', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Total Revenue', value: '₹45,890', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/5' },
    ];

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        setFlashingRow(orderId);
        toast.success(`Order ${orderId} updated to ${newStatus}`);

        setTimeout(() => {
            setFlashingRow(null);
        }, 1000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'printing': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'ready': return 'bg-green-50 text-green-700 border-green-200';
            case 'collected': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-50';
        }
    };

    const getRowBg = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50/50';
            case 'printing': return 'bg-blue-50/50';
            case 'ready': return 'bg-green-50/50';
            default: return 'bg-white';
        }
    };

    const statusBars = useMemo(() => {
        const total = orders.length;
        const counts = orders.reduce((acc, o) => {
            acc[o.status] = (acc[o.status] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(counts).map(([status, count]) => ({
            status,
            count,
            pct: (count / total) * 100
        }));
    }, [orders]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Table */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-black text-primary uppercase tracking-widest">Active Orders Queue</h2>
                            <Link to="/admin/orders" className="text-sm font-bold text-secondary hover:underline underline-offset-4">
                                View Full Logs →
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-8 py-4">Order ID</th>
                                        <th className="px-8 py-4">Student</th>
                                        <th className="px-8 py-4 text-center">Amount</th>
                                        <th className="px-8 py-4">Time</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className={`transition-all duration-300 ${getRowBg(order.status)} 
                        ${flashingRow === order.id ? 'bg-green-100 scale-[1.01] z-10 relative' : ''}`}
                                        >
                                            <td className="px-8 py-5 font-black text-primary text-sm tracking-tight">{order.id}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                        <User size={14} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{order.student}</p>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase">{order.cid}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center font-black text-gray-900">₹{order.amount}</td>
                                            <td className="px-8 py-5 text-xs font-bold text-gray-400">{order.time}</td>
                                            <td className="px-8 py-5">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border outline-none transition-all cursor-pointer
                            ${getStatusColor(order.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="printing">Printing</option>
                                                    <option value="ready">Ready</option>
                                                    <option value="collected">Collected</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <Link
                                                    to={`/admin/orders/${order.id}`}
                                                    className="p-2 text-primary hover:text-secondary hover:bg-white rounded-lg transition-all inline-block border border-transparent hover:border-gray-100"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-6 flex items-center">
                            <BarChart3 size={18} className="mr-2 text-secondary" />
                            Status Analytics
                        </h3>

                        <div className="space-y-6">
                            {statusBars.map(item => (
                                <div key={item.status}>
                                    <div className="flex justify-between items-center text-xs font-bold uppercase mb-2">
                                        <span className="text-gray-500">{item.status}</span>
                                        <span className="text-gray-900">{item.count} ({item.pct.toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${item.status === 'printing' ? 'bg-indigo-500' :
                                                    item.status === 'ready' ? 'bg-green-500' :
                                                        item.status === 'pending' ? 'bg-yellow-500' :
                                                            item.status === 'confirmed' ? 'bg-blue-500' : 'bg-gray-400'
                                                }`}
                                            style={{ width: `${item.pct}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-black text-gray-400 uppercase">System Status</span>
                                <span className="flex items-center text-[10px] uppercase font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                                    Online
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium"> All print stations are functional. Stock sync is up to date.</p>
                        </div>
                    </div>

                    <div className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
                            <Printer size={120} />
                        </div>
                        <h4 className="text-lg font-black mb-2">Inventory Alert</h4>
                        <p className="text-sm opacity-70 mb-6">3 items are below threshold.</p>
                        <Link to="/admin/inventory" className="inline-block px-6 py-2 bg-secondary text-white rounded-xl font-bold text-sm shadow-lg shadow-secondary/20 hover:scale-105 transition-all">
                            Restock Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
