import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [orders, setOrders] = useState([
        { id: 'PE-2024-0010', student: 'Rahul Sharma', cid: '22071A0501', files: 2, type: 'B&W', amount: 45, pStatus: 'Paid', oStatus: 'pending' },
        { id: 'PE-2024-0011', student: 'Priya Reddy', cid: '21071A1208', files: 1, type: 'Color', amount: 120, pStatus: 'Paid', oStatus: 'printing' },
        { id: 'PE-2024-0012', student: 'Amit Kumar', cid: '23071A0415', files: 3, type: 'B&W', amount: 15, pStatus: 'Paid', oStatus: 'ready' },
        { id: 'PE-2024-0013', student: 'Sneha Kapur', cid: '22071A6602', files: 1, type: 'B&W', amount: 89, pStatus: 'Pending', oStatus: 'confirmed' },
        { id: 'PE-2024-0014', student: 'Varun Tej', cid: '20071A0234', files: 5, type: 'Mixed', amount: 200, pStatus: 'Paid', oStatus: 'printing' },
        { id: 'PE-2024-0015', student: 'Anjali P', cid: '22075A0512', files: 2, type: 'Color', amount: 34, pStatus: 'Paid', oStatus: 'pending' },
        { id: 'PE-2024-0016', student: 'Karthik S', cid: '21071A05J9', files: 1, type: 'B&W', amount: 55, pStatus: 'Paid', oStatus: 'ready' },
        { id: 'PE-2024-0017', student: 'Mona Lisa', cid: '23071A0510', files: 4, type: 'Mixed', amount: 67, pStatus: 'Failed', oStatus: 'pending' },
        { id: 'PE-2024-0018', student: 'David J', cid: '22071A0545', files: 1, type: 'B&W', amount: 10, pStatus: 'Paid', oStatus: 'collected' },
        { id: 'PE-2024-0019', student: 'Sita Rani', cid: '21071A05L2', files: 2, type: 'Color', amount: 95, pStatus: 'Paid', oStatus: 'collected' },
        { id: 'PE-2024-0020', student: 'Arjun Das', cid: '23071A1211', files: 1, type: 'B&W', amount: 5, pStatus: 'Paid', oStatus: 'ready' },
        { id: 'PE-2024-0021', student: 'Leo Das', cid: '22071A0400', files: 2, type: 'Color', amount: 45, pStatus: 'Paid', oStatus: 'printing' },
        { id: 'PE-2024-0022', student: 'Vikram R', cid: '20071A0501', files: 3, type: 'B&W', amount: 30, pStatus: 'Paid', oStatus: 'collected' },
    ]);

    const statusCounts = useMemo(() => {
        const counts = { All: orders.length };
        orders.forEach(o => {
            const s = o.oStatus.charAt(0).toUpperCase() + o.oStatus.slice(1);
            counts[s] = (counts[s] || 0) + 1;
        });
        return counts;
    }, [orders]);

    const filteredOrders = useMemo(() => {
        return orders.filter(o => {
            const matchSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.student.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatus = statusFilter === 'All' || o.oStatus.toLowerCase() === statusFilter.toLowerCase();
            return matchSearch && matchStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleStatusUpdate = (id, status) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, oStatus: status } : o));
        toast.success(`Order ${id} updated`);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'printing': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'ready': return 'bg-green-50 text-green-700 border-green-200';
            case 'collected': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-gray-50';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-black text-primary uppercase tracking-widest">Order Management</h1>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search ID or Student..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl outline-none focus:border-secondary transition-all w-64 text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="flex overflow-x-auto pb-2 space-x-2 no-scrollbar">
                {Object.entries(statusCounts).map(([status, count]) => (
                    <button
                        key={status}
                        onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                        className={`px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border whitespace-nowrap flex items-center
              ${statusFilter === status ? 'bg-secondary border-secondary text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                        {status}
                        <span className={`ml-2 px-1.5 rounded-md ${statusFilter === status ? 'bg-white text-secondary' : 'bg-gray-50 text-gray-400'}`}>
                            {count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Student / College ID</th>
                                <th className="px-8 py-5 text-center">Details</th>
                                <th className="px-8 py-5">Value</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-5 font-black text-primary text-sm">{order.id}</td>
                                    <td className="px-8 py-5">
                                        <p className="font-bold text-gray-900 text-sm">{order.student}</p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase">{order.cid}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-center space-x-2">
                                            <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 rounded text-[10px] font-black text-gray-600">
                                                {order.files}F
                                            </span>
                                            <span className="inline-flex items-center px-2 py-0.5 bg-primary/5 rounded text-[10px] font-black text-primary uppercase">
                                                {order.type}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="font-black text-gray-900 text-sm">₹{order.amount}</p>
                                        <p className={`text-[10px] font-black uppercase tracking-tighter ${order.pStatus === 'Paid' ? 'text-green-500' :
                                                order.pStatus === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                                            }`}>{order.pStatus}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <select
                                            value={order.oStatus}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border outline-none cursor-pointer transition-all
                        ${getStatusStyle(order.oStatus)}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="printing">Printing</option>
                                            <option value="ready">Ready</option>
                                            <option value="collected">Collected</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                <Download size={18} />
                                            </button>
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                                className="p-2 text-primary hover:text-secondary hover:bg-gray-50 rounded-lg transition-all border border-transparent hover:border-gray-100"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 underline decoration-2 underline-offset-4 decoration-gray-200 uppercase tracking-widest">
                        Showing {(currentPage - 1) * itemsPerPage + 1}-Math.min(currentPage * itemsPerPage, filteredOrders.length) of {filteredOrders.length}
                    </p>
                    <div className="flex items-center space-x-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-primary disabled:opacity-50 transition-all cursor-pointer"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-xs font-black text-primary">Page {currentPage} of {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-primary disabled:opacity-50 transition-all cursor-pointer"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
