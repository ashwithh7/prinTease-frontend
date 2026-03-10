import React from 'react';
import { useParams, Link } from 'react-router-dom';
import StudentNav from '../components/StudentNav';
import {
    ChevronLeft, FileText, CheckCircle, Package,
    Printer, Home, Clock, CreditCard, HelpCircle,
    Phone, Calendar, ClipboardCheck, Truck
} from 'lucide-react';

const OrderDetail = () => {
    const { id } = useParams();

    // MOCK DATA (Hardcoded but dynamic to orderId)
    const order = {
        orderId: id || 'PE-2024-0001',
        date: '10 Mar 2026, 2:30 PM',
        status: 'printing', // pending, confirmed, printing, ready, collected
        paymentStatus: 'paid',
        paymentId: 'pay_mock_' + Math.random().toString(36).substring(7),
        totalAmount: 57,
        files: [
            {
                name: 'Assignment.pdf',
                pages: 4,
                options: { type: 'bw', size: 'A4', sides: 'single', copies: 2, binding: 'none' },
                cost: 8
            },
            {
                name: 'Notes.pdf',
                pages: 10,
                options: { type: 'color', size: 'A4', sides: 'double', copies: 1, binding: 'spiral' },
                cost: 49
            }
        ],
        stationery: [
            { name: 'Blue Ball Pen', qty: 2, price: 5 },
            { name: 'Sticky Notes', qty: 1, price: 20 }
        ]
    };

    const steps = [
        { label: 'Placed', icon: ClipboardCheck, status: 'placed', msg: "Order received" },
        { label: 'Confirmed', icon: CheckCircle, status: 'confirmed', msg: "Order verified by admin" },
        { label: 'Printing', icon: Printer, status: 'printing', msg: "Documents being printed" },
        { label: 'Ready', icon: Package, status: 'ready', msg: "Your order is ready for pickup!" },
        { label: 'Collected', icon: Home, status: 'collected', msg: "Order collected from station" }
    ];

    const currentStepIdx = steps.findIndex(s => s.status === order.status);

    return (
        <div className="min-h-screen bg-gray-50 font-poppins pt-20 pb-16">
            <StudentNav />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/dashboard" className="inline-flex items-center text-gray-500 hover:text-primary font-bold mb-6 transition-colors">
                        <ChevronLeft size={20} className="mr-1" />
                        Back to Dashboard
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <h1 className="text-3xl font-black text-primary">Order {order.orderId}</h1>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${order.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                                    {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Pending Payment'}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-400 font-medium text-sm space-x-4">
                                <div className="flex items-center">
                                    <Calendar size={14} className="mr-1" />
                                    {order.date}
                                </div>
                                <div className="flex items-center">
                                    <CreditCard size={14} className="mr-1" />
                                    ID: {order.paymentId}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Total Paid</p>
                            <p className="text-4xl font-black text-primary">₹{order.totalAmount}</p>
                        </div>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 mb-8 overflow-hidden relative">
                    <div className="hidden md:flex justify-between items-center relative z-10">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isPast = idx < currentStepIdx;
                            const isCurrent = idx === currentStepIdx;
                            const isFuture = idx > currentStepIdx;

                            return (
                                <div key={step.status} className="flex flex-col items-center flex-1 relative">
                                    {/* Line Segment */}
                                    {idx < steps.length - 1 && (
                                        <div
                                            className={`absolute top-5 left-[50%] w-full h-1 z-0 ${isPast ? 'bg-primary' : 'bg-gray-100'}`}
                                        ></div>
                                    )}

                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-500
                    ${isPast ? 'bg-primary text-white' :
                                            isCurrent ? 'bg-secondary text-white ring-4 ring-secondary/20 active-step-pulse' :
                                                'bg-white border-2 border-gray-200 text-gray-300'}`}>
                                        <Icon size={24} />
                                        {isCurrent && <span className="absolute inset-0 rounded-full border-4 border-secondary animate-ping opacity-25"></span>}
                                    </div>
                                    <span className={`mt-4 text-xs font-black uppercase tracking-widest ${isPast || isCurrent ? 'text-primary' : 'text-gray-300'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Timeline (Simplified) */}
                    <div className="md:hidden space-y-6">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            const isPast = idx < currentStepIdx;
                            const isCurrent = idx === currentStepIdx;

                            if (isPast || isCurrent) {
                                return (
                                    <div key={step.status} className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPast ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <p className={`font-black uppercase tracking-widest text-xs ${isCurrent ? 'text-secondary' : 'text-primary'}`}>{step.label}</p>
                                            {isCurrent && <p className="text-sm font-medium text-gray-500">{step.msg}</p>}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    <div className="mt-10 p-6 bg-primary/5 rounded-2xl flex items-center space-x-4 border border-primary/10">
                        <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-primary uppercase text-xs tracking-widest">Update</h4>
                            <p className="text-gray-700 font-bold">{steps[currentStepIdx]?.msg || "Your order is being processed."}</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Files Section */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-black text-primary mb-6 flex items-center uppercase tracking-widest">
                                <Printer size={20} className="mr-2 text-secondary" />
                                Print Jobs
                            </h3>
                            <div className="space-y-4">
                                {order.files.map((file, idx) => (
                                    <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
                                                    <FileText size={20} />
                                                </div>
                                                <h4 className="font-bold text-gray-800 text-lg">{file.name}</h4>
                                            </div>
                                            <span className="text-xl font-black text-primary">₹{file.cost}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{file.options.type}</span>
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{file.options.size}</span>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{file.options.sides}</span>
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{file.options.copies} Copies</span>
                                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{file.options.binding} binding</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stationery Section */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-black text-primary mb-6 flex items-center uppercase tracking-widest">
                                <Package size={20} className="mr-2 text-secondary" />
                                Stationery
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <th className="px-4 py-3">Item</th>
                                            <th className="px-4 py-3 text-center">Qty</th>
                                            <th className="px-4 py-3 text-right">Price</th>
                                            <th className="px-4 py-3 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {order.stationery.map((item, idx) => (
                                            <tr key={idx} className="text-sm font-bold text-gray-700">
                                                <td className="px-4 py-4">{item.name}</td>
                                                <td className="px-4 py-4 text-center">{item.qty}</td>
                                                <td className="px-4 py-4 text-right">₹{item.price}</td>
                                                <td className="px-4 py-4 text-right">₹{item.price * item.qty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {/* Breakdown */}
                        <div className="bg-primary text-white rounded-[2rem] p-8 shadow-xl">
                            <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-60">Cost Breakdown</h3>
                            <div className="space-y-4 font-bold">
                                <div className="flex justify-between items-center text-sm">
                                    <span>Print Jobs Total</span>
                                    <span>₹{order.files.reduce((sum, f) => sum + f.cost, 0)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span>Stationery Total</span>
                                    <span>₹{order.stationery.reduce((sum, i) => sum + (i.price * i.qty), 0)}</span>
                                </div>
                                <div className="h-px bg-white/10 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-sm opacity-60">Grand Total</span>
                                    <span className="text-3xl font-black text-secondary">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                                    <HelpCircle size={24} />
                                </div>
                                <h3 className="font-black text-primary uppercase tracking-widest text-sm">Need Help?</h3>
                            </div>
                            <div className="space-y-4">
                                <a href="tel:+919876543210" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                                    <Phone size={18} className="text-primary" />
                                    <div>
                                        <p className="text-sm font-black text-gray-900 leading-none mb-1">Stationery Shop</p>
                                        <p className="text-xs text-gray-500">+91 98765 43210</p>
                                    </div>
                                </a>
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                                    <Clock size={18} className="text-primary" />
                                    <div>
                                        <p className="text-sm font-black text-gray-900 leading-none mb-1">Pick up Hours</p>
                                        <p className="text-xs text-gray-500">9AM - 6PM • Mon-Sat</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderDetail;
