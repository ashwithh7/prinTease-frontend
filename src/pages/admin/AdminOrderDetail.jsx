import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft, User, Mail, Phone, Hash, FileText,
    Download, ShoppingBag, CreditCard, Send, Edit3,
    CheckCircle, Clock, Printer, Package, Home, ClipboardCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrderDetail = () => {
    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState('printing');
    const [adminNotes, setAdminNotes] = useState('');

    // Mock data
    const order = {
        id: id || 'PE-2024-0010',
        student: {
            name: 'Rahul Sharma',
            email: 'rahul.s@vnrvjiet.in',
            phone: '+91 98765 43210',
            cid: '22071A0501'
        },
        files: [
            { name: 'Semester_Project.pdf', pages: 20, options: { type: 'B&W', size: 'A4', sides: 'Double', copies: 1, binding: 'Spiral' }, cost: 30 },
        ],
        stationery: [
            { name: 'Blue Ball Pen', qty: 2, price: 5, total: 10 },
            { name: 'A4 Clear Folder', qty: 1, price: 15, total: 15 }
        ],
        payment: {
            status: 'Paid',
            id: 'pay_ABC123XYZ',
            method: 'Razorpay UPI',
            amount: 55,
            time: '12 Mar 2026, 10:15 AM'
        }
    };

    const steps = [
        { label: 'Placed', icon: ClipboardCheck, status: 'pending' },
        { label: 'Confirmed', icon: CheckCircle, status: 'confirmed' },
        { label: 'Printing', icon: Printer, status: 'printing' },
        { label: 'Ready', icon: Package, status: 'ready' },
        { label: 'Collected', icon: Home, status: 'collected' }
    ];

    const currentStepIdx = steps.findIndex(s => s.status === orderStatus);

    const handleStatusUpdate = () => {
        toast.success("Order status updated to " + orderStatus);
    };

    const notifyStudent = () => {
        toast.success(`Notification sent to ${order.student.email}`);
    };

    const saveNotes = () => {
        toast.success("Internal notes saved");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <Link to="/admin/orders" className="inline-flex items-center text-gray-400 hover:text-primary font-bold transition-colors mb-2">
                <ChevronLeft size={18} className="mr-1" />
                Back to All Orders
            </Link>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Student Info Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Student Identity</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white text-3xl font-black shadow-xl">
                                {order.student.name[0]}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 flex-1">
                                <div className="flex items-center space-x-3">
                                    <User size={18} className="text-secondary" />
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Full Name</p>
                                        <p className="font-bold text-gray-900">{order.student.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Hash size={18} className="text-secondary" />
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">College ID</p>
                                        <p className="font-bold text-gray-900">{order.student.cid}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail size={18} className="text-secondary" />
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Email</p>
                                        <p className="font-bold text-gray-900">{order.student.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone size={18} className="text-secondary" />
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Contact</p>
                                        <p className="font-bold text-gray-900">{order.student.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Files Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Print Manifest</h3>
                        <div className="space-y-4">
                            {order.files.map((file, idx) => (
                                <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group transition-all">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg leading-tight">{file.name}</h4>
                                                <p className="text-xs font-bold text-gray-400 tracking-tighter uppercase mt-0.5">{file.pages} Pages × {file.options.copies} Copies</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toast.info("Download available after backend setup")}
                                            className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-primary hover:border-primary transition-all shadow-sm"
                                        >
                                            <Download size={16} />
                                            <span>Download File</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/50">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{file.options.type}</span>
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{file.options.size}</span>
                                        <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{file.options.sides}</span>
                                        <span className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{file.options.binding}</span>
                                        <div className="flex-1"></div>
                                        <span className="text-lg font-black text-primary">₹{file.cost}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stationery Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Stationery Items</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-4 py-4">Product Name</th>
                                        <th className="px-4 py-4 text-center">Qty</th>
                                        <th className="px-4 py-4">Price</th>
                                        <th className="px-4 py-4 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {order.stationery.map((item, idx) => (
                                        <tr key={idx} className="text-sm font-bold text-gray-700">
                                            <td className="px-4 py-5 flex items-center space-x-3">
                                                <div className="p-1.5 bg-gray-100 rounded-lg text-lg leading-none">🛍️</div>
                                                <span>{item.name}</span>
                                            </td>
                                            <td className="px-4 py-5 text-center">{item.qty}</td>
                                            <td className="px-4 py-5 text-gray-400">₹{item.price}</td>
                                            <td className="px-4 py-5 text-right font-black">₹{item.total}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-black text-primary">
                                        <td colSpan="3" className="px-4 py-5 text-right text-xs uppercase tracking-widest opacity-60">Total Value</td>
                                        <td className="px-4 py-5 text-right text-xl">₹{order.payment.amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                    {/* Order Status Controller */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Status</h3>
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">{orderStatus}</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <label className="block text-xs font-black text-gray-900 uppercase mb-2 tracking-widest">Update Order Status</label>
                            <select
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                                className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold text-gray-700 outline-none focus:border-primary transition-all appearance-none bg-no-repeat bg-[right_1.5rem_center]"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%231E3A5F\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundSize: '1.25rem' }}
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="printing">Printing</option>
                                <option value="ready">Ready</option>
                                <option value="collected">Collected</option>
                            </select>
                            <button
                                onClick={handleStatusUpdate}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                Sync Status Change
                            </button>
                        </div>

                        <button
                            onClick={notifyStudent}
                            className="w-full py-4 bg-white border-2 border-secondary text-secondary rounded-2xl font-black text-sm hover:bg-secondary hover:text-white transition-all flex items-center justify-center space-x-2"
                        >
                            <Send size={18} />
                            <span>Notify Student</span>
                        </button>
                    </div>

                    {/* Internal Notes */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                            <Edit3 size={14} className="mr-2" />
                            Internal Notes
                        </h3>
                        <textarea
                            rows="4"
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none mb-4"
                            placeholder="e.g. Spiral binding requested specifically..."
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                        ></textarea>
                        <button
                            onClick={saveNotes}
                            className="w-full py-3 text-xs font-black text-primary uppercase tracking-widest hover:bg-gray-50 rounded-xl transition-all"
                        >
                            Save Internal Notes
                        </button>
                    </div>

                    {/* Mini Timeline */}
                    <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/5">
                        <h3 className="text-[10px] font-black text-primary/50 uppercase tracking-widest mb-6 px-1">Order Progress</h3>
                        <div className="space-y-6">
                            {steps.map((step, idx) => {
                                const Icon = step.icon;
                                const isCompleted = idx <= currentStepIdx;
                                return (
                                    <div key={idx} className="flex items-center space-x-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-primary text-white scale-110' : 'bg-white border text-gray-300'}`}>
                                            <Icon size={16} />
                                        </div>
                                        <span className={`text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-primary' : 'text-gray-300'}`}>{step.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetail;
