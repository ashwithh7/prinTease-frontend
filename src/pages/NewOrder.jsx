import React, { useState, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentNav from '../components/StudentNav';
import toast from 'react-hot-toast';
import {
    UploadCloud, FileText, Trash2, ChevronRight, ChevronLeft,
    Settings, ShoppingBag, CreditCard, CheckCircle,
    Minus, Plus, Info, Layout, Layers, Type, Maximize,
    Calendar, CreditCard as CardIcon, Loader2, Search, Filter, X
} from 'lucide-react';

// --- MOCK DATA ---
const STATIONERY_PRODUCTS = [
    { id: '1', name: 'Blue Ball Pen', price: 5, stock: 100, category: 'pen', emoji: '🖊️' },
    { id: '2', name: 'Black Ball Pen', price: 5, stock: 100, category: 'pen', emoji: '🖊️' },
    { id: '3', name: 'A4 Notebook 200pg', price: 60, stock: 50, category: 'notebook', emoji: '📓' },
    { id: '4', name: 'A5 Notebook 100pg', price: 35, stock: 50, category: 'notebook', emoji: '📔' },
    { id: '5', name: 'Yellow Highlighter', price: 30, stock: 30, category: 'highlighter', emoji: '🖍️' },
    { id: '6', name: 'Pink Highlighter', price: 30, stock: 30, category: 'highlighter', emoji: '🖍️' },
    { id: '7', name: 'Clear Folder A4', price: 15, stock: 40, category: 'folder', emoji: '📁' },
    { id: '8', name: 'Sticky Notes Pack', price: 20, stock: 60, category: 'sticky-notes', emoji: '🗒️' },
    { id: '9', name: 'Stapler', price: 80, stock: 20, category: 'other', emoji: '📌' },
    { id: '10', name: 'Whitener', price: 15, stock: 40, category: 'other', emoji: '✏️' }
];

const CATEGORIES = [
    { id: 'all', label: 'All', emoji: '📦' },
    { id: 'pen', label: 'Pen', emoji: '🖊️' },
    { id: 'notebook', label: 'Notebook', emoji: '📓' },
    { id: 'highlighter', label: 'Highlighter', emoji: '🖍️' },
    { id: 'folder', label: 'Folder', emoji: '📁' },
    { id: 'sticky-notes', label: 'Sticky Notes', emoji: '🗒️' },
    { id: 'other', label: 'Other', emoji: '📌' },
];

const NewOrder = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // --- STATE ---
    const [currentStep, setCurrentStep] = useState(1);
    const [files, setFiles] = useState([]); // File objects
    const [filesMeta, setFilesMeta] = useState([]); // [{id, pageCount: 1}]
    const [filesOptions, setFilesOptions] = useState([]); // [{id, type:'bw', size:'A4', sides:'single', copies:1, binding:'none', orientation:'portrait', instructions:''}]
    const [cartItems, setCartItems] = useState([]); // [{id, qty}]
    const [activeCategory, setActiveCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');

    // --- PRICING LOGIC ---
    const calculateFileCost = (options, pages) => {
        let rate = 1;
        if (options.type === 'bw') {
            rate = options.sides === 'single' ? 1 : 1.5;
        } else {
            rate = options.sides === 'single' ? 5 : 8;
        }

        if (options.size === 'A3') rate *= 2;
        if (options.size === 'A5') rate *= 0.5;

        return pages * options.copies * rate;
    };

    const printTotal = useMemo(() => {
        return filesOptions.reduce((sum, opt, idx) => {
            const pages = filesMeta[idx]?.pageCount || 1;
            return sum + calculateFileCost(opt, pages);
        }, 0);
    }, [filesOptions, filesMeta]);

    const stationeryTotal = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const product = STATIONERY_PRODUCTS.find(p => p.id === item.id);
            return sum + (product.price * item.qty);
        }, 0);
    }, [cartItems]);

    const grandTotal = printTotal + stationeryTotal;

    // --- HANDLERS ---
    const handleFileUpload = (e) => {
        const uploaded = Array.from(e.target.files);
        if (files.length + uploaded.length > 5) {
            toast.error("Max 5 files allowed");
            return;
        }

        const newFiles = [...files, ...uploaded];
        const newMeta = [...filesMeta, ...uploaded.map(() => ({ id: Math.random(), pageCount: 1 }))];
        const newOptions = [...filesOptions, ...uploaded.map(() => ({
            id: Math.random(),
            type: 'bw',
            size: 'A4',
            sides: 'single',
            copies: 1,
            binding: 'none',
            orientation: 'portrait',
            instructions: ''
        }))];

        setFiles(newFiles);
        setFilesMeta(newMeta);
        setFilesOptions(newOptions);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
        setFilesMeta(filesMeta.filter((_, i) => i !== index));
        setFilesOptions(filesOptions.filter((_, i) => i !== index));
    };

    const updateMeta = (index, field, value) => {
        const updated = [...filesMeta];
        updated[index][field] = value;
        setFilesMeta(updated);
    };

    const updateOption = (index, field, value) => {
        const updated = [...filesOptions];
        updated[index][field] = value;
        setFilesOptions(updated);
    };

    const copyToAll = (index) => {
        const source = filesOptions[index];
        const updated = filesOptions.map(opt => ({ ...source, id: opt.id }));
        setFilesOptions(updated);
        toast.success("Settings copied to all files!");
    };

    const addToCart = (productId) => {
        setCartItems([...cartItems, { id: productId, qty: 1 }]);
    };

    const updateQty = (productId, delta) => {
        const updated = cartItems.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(0, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }).filter(item => item.qty > 0);
        setCartItems(updated);
    };

    const handlePlaceOrder = () => {
        if (grandTotal === 0) return;
        setLoading(true);
        setTimeout(() => {
            const id = `PE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            setOrderId(id);
            setLoading(false);
            setShowSuccess(true);
        }, 2000);
    };

    // --- COMPONENTS ---
    const ProgressBar = () => {
        const steps = [
            { id: 1, label: 'Upload' },
            { id: 2, label: 'Print Options' },
            { id: 3, label: 'Stationery' },
            { id: 4, label: 'Payment' }
        ];

        return (
            <div className="max-w-3xl mx-auto mb-12 relative px-4">
                <div className="flex justify-between items-center relative z-10">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2
                  ${currentStep > step.id ? 'bg-primary border-primary text-white' :
                                        currentStep === step.id ? 'bg-secondary border-secondary text-white' :
                                            'bg-white border-gray-300 text-gray-400'}`}
                            >
                                {currentStep > step.id ? <CheckCircle size={20} /> : step.id}
                            </div>
                            <span className={`mt-2 text-[10px] md:text-sm font-bold uppercase tracking-tighter
                ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
                {/* Connecting Lines */}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 -z-0 px-8">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-poppins pt-20 pb-32">
            <StudentNav />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProgressBar />

                {/* --- STEP 1: UPLOAD --- */}
                {currentStep === 1 && (
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-primary mb-6">Upload Documents</h2>

                        <div
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-secondary'); }}
                            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-secondary'); }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.remove('border-secondary');
                                const droppedFiles = Array.from(e.dataTransfer.files);
                                handleFileUpload({ target: { files: droppedFiles } });
                            }}
                            onClick={() => fileInputRef.current.click()}
                            className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center cursor-pointer hover:border-secondary transition-all group bg-gray-50/50"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                hidden
                                onChange={handleFileUpload}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                            <UploadCloud size={64} className="mx-auto text-gray-400 group-hover:text-secondary group-hover:scale-110 transition-all mb-4" />
                            <p className="text-xl font-bold text-gray-700">Drag & drop files here</p>
                            <p className="text-sm text-gray-400 mt-2">PDF, DOC, DOCX, JPG, PNG • Max 5 files • 50MB</p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{files.length} / 5 Files</span>
                            </div>

                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        {file.name.match(/\.(pdf)$/i) && <FileText size={24} className="text-red-500" />}
                                        {file.name.match(/\.(doc|docx)$/i) && <FileText size={24} className="text-blue-500" />}
                                        {file.name.match(/\.(jpg|jpeg|png)$/i) && <FileText size={24} className="text-green-500" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 truncate">
                                            {file.name.length > 30 ? file.name.substring(0, 30) + '...' : file.name}
                                        </p>
                                        <p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex flex-col items-center">
                                            <label className="text-[10px] font-black text-gray-400 uppercase">Pages</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={filesMeta[idx].pageCount}
                                                onChange={(e) => updateMeta(idx, 'pageCount', parseInt(e.target.value) || 1)}
                                                className="w-12 text-center font-bold bg-white border border-gray-200 rounded p-1 outline-none focus:border-primary"
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeFile(idx)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={files.length === 0}
                            onClick={() => setCurrentStep(2)}
                            className="w-full mt-10 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            <span>Set Print Options</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* --- STEP 2: PRINT OPTIONS --- */}
                {currentStep === 2 && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-primary">Print Customization</h2>
                            {files.length > 1 && (
                                <button
                                    onClick={() => copyToAll(0)}
                                    className="text-sm font-bold text-secondary hover:underline flex items-center space-x-1"
                                >
                                    <Layers size={16} />
                                    <span>Copy first file settings to all</span>
                                </button>
                            )}
                        </div>

                        {filesOptions.map((opt, idx) => (
                            <div key={opt.id} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b border-gray-100 flex items-center space-x-3">
                                    <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
                                        <FileText size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-800 truncate">{files[idx].name}</h3>
                                </div>

                                <div className="p-8 grid md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        {/* Print Type */}
                                        <div>
                                            <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Print Type</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['bw', 'color'].map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => updateOption(idx, 'type', type)}
                                                        className={`py-3 rounded-xl font-bold border-2 transition-all ${opt.type === type ? 'bg-primary border-primary text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                                                    >
                                                        {type === 'bw' ? '⬜ Black & White' : '🎨 Full Color'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Paper Size */}
                                        <div>
                                            <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Paper Size</span>
                                            <div className="grid grid-cols-3 gap-2">
                                                {['A5', 'A4', 'A3'].map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => updateOption(idx, 'size', size)}
                                                        className={`py-3 rounded-xl font-bold border-2 transition-all ${opt.size === size ? 'bg-primary border-primary text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sides */}
                                        <div>
                                            <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Sides</span>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['single', 'double'].map(side => (
                                                    <button
                                                        key={side}
                                                        onClick={() => updateOption(idx, 'sides', side)}
                                                        className={`py-3 rounded-xl font-bold border-2 transition-all ${opt.sides === side ? 'bg-primary border-primary text-white' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                                                    >
                                                        {side === 'single' ? 'Single Sided' : 'Double Sided'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            {/* Copies */}
                                            <div>
                                                <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Copies</span>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateOption(idx, 'copies', Math.max(1, opt.copies - 1))}
                                                        className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={opt.copies}
                                                        onChange={(e) => updateOption(idx, 'copies', parseInt(e.target.value) || 1)}
                                                        className="flex-1 text-center font-bold text-lg border border-gray-200 py-1.5 rounded-lg outline-none"
                                                    />
                                                    <button
                                                        onClick={() => updateOption(idx, 'copies', opt.copies + 1)}
                                                        className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Orientation */}
                                            <div>
                                                <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Orientation</span>
                                                <div className="flex bg-gray-100 p-1 rounded-xl">
                                                    {['portrait', 'landscape'].map(mode => (
                                                        <button
                                                            key={mode}
                                                            onClick={() => updateOption(idx, 'orientation', mode)}
                                                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${opt.orientation === mode ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                                                        >
                                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Binding */}
                                        <div>
                                            <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Binding</span>
                                            <select
                                                value={opt.binding}
                                                onChange={(e) => updateOption(idx, 'binding', e.target.value)}
                                                className="w-full py-3 px-4 rounded-xl border-2 border-gray-100 font-bold text-gray-700 outline-none focus:border-primary transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%231E3A5F\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundSize: '1.25rem' }}
                                            >
                                                <option value="none">None</option>
                                                <option value="spiral">Spiral Binding</option>
                                                <option value="staple">Staple</option>
                                            </select>
                                        </div>

                                        {/* Instructions */}
                                        <div>
                                            <span className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Special Instructions</span>
                                            <textarea
                                                rows="2"
                                                value={opt.instructions}
                                                onChange={(e) => updateOption(idx, 'instructions', e.target.value)}
                                                placeholder="e.g. Page 5-10 in color, rest B&W..."
                                                className="w-full p-4 rounded-xl border-2 border-gray-100 outline-none focus:border-primary text-sm font-medium transition-all"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub-total for file */}
                                <div className="bg-gray-50 p-6 flex items-center justify-between border-t border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white rounded-full text-primary shadow-sm">
                                            <Layout size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase uppercase tracking-wider">Estimated Cost</p>
                                            <p className="text-sm font-medium text-gray-500">
                                                ({filesMeta[idx].pageCount} pgs × {opt.copies} cpy × ₹{calculateFileCost(opt, 1) / opt.copies}/pg)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-primary">₹{calculateFileCost(opt, filesMeta[idx].pageCount)}</div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-xl border border-primary/20">
                            <div>
                                <span className="block text-xs font-black text-gray-400 uppercase tracking-widest">Running Total</span>
                                <span className="text-3xl font-black text-primary">₹{printTotal}</span>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="px-8 py-4 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center space-x-2"
                                >
                                    <span>Add Stationery</span>
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- STEP 3: STATIONERY --- */}
                {currentStep === 3 && (
                    <div className="animate-in fade-in duration-500">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-primary mb-2">Essential Stationery</h2>
                            <p className="text-gray-500">Add materials to your print order and pick them up together.</p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex overflow-x-auto pb-4 space-x-3 mb-8 no-scrollbar scroll-smooth">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all border-2
                    ${activeCategory === cat.id ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'}`}
                                >
                                    <span>{cat.emoji}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {STATIONERY_PRODUCTS
                                .filter(p => activeCategory === 'all' || p.category === activeCategory)
                                .map(product => {
                                    const cartItem = cartItems.find(item => item.id === product.id);
                                    return (
                                        <div key={product.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                                                {product.emoji}
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-xl font-black text-primary">₹{product.price}</span>
                                                {product.stock > 0 ? (
                                                    <span className="text-[10px] uppercase font-black text-green-500 flex items-center bg-green-50 px-2 py-1 rounded">
                                                        <CheckCircle size={10} className="mr-1" />
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] uppercase font-black text-red-400 bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                                                )}
                                            </div>

                                            {cartItem ? (
                                                <div className="flex items-center justify-between bg-primary/5 p-1 rounded-xl border border-primary/10">
                                                    <button
                                                        onClick={() => updateQty(product.id, -1)}
                                                        className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <span className="font-bold text-primary px-4">{cartItem.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(product.id, 1)}
                                                        className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(product.id)}
                                                    className="w-full py-3 bg-white border-2 border-secondary text-secondary font-bold rounded-xl hover:bg-secondary hover:text-white transition-all shadow-sm"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Sticky Cart Summary */}
                        {cartItems.length > 0 && (
                            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-primary text-white p-4 rounded-2xl shadow-2xl z-40 animate-in slide-in-from-bottom-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-white/10 rounded-lg">
                                            <ShoppingBag size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{cartItems.length} items added</p>
                                            <p className="text-xs text-white/60">Stationery Total: ₹{stationeryTotal}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setCurrentStep(4)}
                                        className="px-6 py-2 bg-secondary text-white font-bold rounded-lg shadow-lg hover:brightness-110 transition-all"
                                    >
                                        View Summary
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-12 flex justify-center space-x-4">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="px-8 py-3 text-gray-400 font-bold hover:text-primary transition-colors"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={() => setCurrentStep(4)}
                                className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-xl hover:bg-black transition-all"
                            >
                                Skip to Summary →
                            </button>
                        </div>
                    </div>
                )}

                {/* --- STEP 4: SUMMARY & PAYMENT --- */}
                {currentStep === 4 && (
                    <div className="grid lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-primary mb-6 flex items-center space-x-2">
                                    <Printer size={24} className="text-secondary" />
                                    <span>Print Job Breakdown</span>
                                </h3>

                                <div className="space-y-4">
                                    {files.map((file, idx) => {
                                        const opt = filesOptions[idx];
                                        const cost = calculateFileCost(opt, filesMeta[idx].pageCount);
                                        return (
                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800 truncate max-w-[200px]">{file.name}</p>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">{opt.type}</span>
                                                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded uppercase">{opt.size}</span>
                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">{opt.sides}</span>
                                                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">{opt.copies}×</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-lg font-bold text-primary whitespace-nowrap">₹{cost}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {cartItems.length > 0 && (
                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center space-x-2">
                                        <ShoppingBag size={24} className="text-secondary" />
                                        <span>Stationery Items</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {cartItems.map(item => {
                                            const product = STATIONERY_PRODUCTS.find(p => p.id === item.id);
                                            return (
                                                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl">{product.emoji}</span>
                                                        <span className="font-medium text-gray-700 truncate max-w-[200px]">{product.name}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-8">
                                                        <span className="text-sm font-bold text-gray-400">×{item.qty}</span>
                                                        <span className="text-sm font-bold text-gray-900">₹{product.price * item.qty}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="bg-primary p-8 rounded-3xl text-white">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center opacity-70">
                                        <span>Print Subtotal</span>
                                        <span className="font-bold">₹{printTotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center opacity-70">
                                        <span>Stationery Subtotal</span>
                                        <span className="font-bold">₹{stationeryTotal}</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-2"></div>
                                    <div className="flex justify-between items-center text-2xl font-black">
                                        <span>Grand Total</span>
                                        <span className="text-secondary">₹{grandTotal}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                                <div className="text-center mb-8">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Payable</p>
                                    <p className="text-5xl font-black text-primary">₹{grandTotal}</p>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                            <CardIcon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Razorpay Secure</p>
                                            <p className="text-[10px] text-gray-400 uppercase font-black">Cards, UPI, Netbanking</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs text-gray-400 px-2 justify-center">
                                        <CheckCircle size={14} className="text-green-500" />
                                        <span>SSL Encrypted Payment Gateway</span>
                                    </div>
                                </div>

                                <button
                                    disabled={grandTotal === 0 || loading}
                                    onClick={handlePlaceOrder}
                                    className="w-full py-5 bg-secondary text-white rounded-2xl font-black text-lg shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={24} />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={24} />
                                            <span>Place Order & Pay</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    disabled={loading}
                                    onClick={() => setCurrentStep(3)}
                                    className="w-full mt-4 py-3 text-gray-400 font-bold hover:text-primary transition-colors"
                                >
                                    Edit Order Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* --- SUCCESS MODAL --- */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-primary/80 backdrop-blur-md"></div>
                    <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in-75 duration-300">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle size={56} />
                        </div>

                        <h2 className="text-4xl font-black text-primary mb-3">Order Placed! 🎉</h2>
                        <div className="inline-block px-4 py-2 bg-gray-50 rounded-xl text-primary font-bold text-lg mb-6 border border-gray-100">
                            ID: <span className="text-secondary">{orderId}</span>
                        </div>

                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                            We've sent a confirmation to <span className="text-primary font-bold">{user?.email}</span>.
                            You'll be notified as soon as your order is ready for pickup at the counter.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Link
                                to={`/orders/${orderId}`}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                            >
                                View Order
                            </Link>
                            <Link
                                to="/dashboard"
                                className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                            >
                                To Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewOrder;
