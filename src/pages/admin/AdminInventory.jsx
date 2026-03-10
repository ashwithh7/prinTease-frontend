import React, { useState, useMemo } from 'react';
import {
    Plus,
    Edit2,
    Trash2,
    Package,
    AlertCircle,
    CheckCircle,
    X,
    PlusCircle,
    MinusCircle,
    Save,
    ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminInventory = () => {
    const [products, setProducts] = useState([
        { id: '1', name: 'Blue Ball Pen', price: 5, stock: 100, category: 'pen', emoji: '🖊️', isActive: true },
        { id: '2', name: 'Black Ball Pen', price: 5, stock: 85, category: 'pen', emoji: '🖊️', isActive: true },
        { id: '3', name: 'A4 Notebook 200pg', price: 60, stock: 45, category: 'notebook', emoji: '📓', isActive: true },
        { id: '4', name: 'A5 Notebook 100pg', price: 35, stock: 4, category: 'notebook', emoji: '📔', isActive: true },
        { id: '5', name: 'Yellow Highlighter', price: 30, stock: 0, category: 'highlighter', emoji: '🖍️', isActive: true },
        { id: '6', name: 'Pink Highlighter', price: 30, stock: 25, category: 'highlighter', emoji: '🖍️', isActive: true },
        { id: '7', name: 'Clear Folder A4', price: 15, stock: 40, category: 'folder', emoji: '📁', isActive: true },
        { id: '8', name: 'Sticky Notes Pack', price: 20, stock: 60, category: 'sticky-notes', emoji: '🗒️', isActive: true },
        { id: '9', name: 'Stapler', price: 80, stock: 15, category: 'other', emoji: '📌', isActive: true },
        { id: '10', name: 'Whitener', price: 15, stock: 40, category: 'other', emoji: '✏️', isActive: true }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: 'pen', emoji: '🛍️' });

    // Summary logic
    const summary = useMemo(() => ({
        total: products.length,
        low: products.filter(p => p.stock > 0 && p.stock < 5).length,
        out: products.filter(p => p.stock === 0).length,
    }), [products]);

    const handleStockUpdate = (id, delta) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', price: '', stock: '', category: 'pen', emoji: '🛍️' });
        }
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.stock) {
            toast.error("All fields are required");
            return;
        }

        if (editingProduct) {
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData, stock: parseInt(formData.stock), price: parseFloat(formData.price) } : p));
            toast.success("Product updated successfully");
        } else {
            const newProduct = {
                ...formData,
                id: Date.now().toString(),
                stock: parseInt(formData.stock),
                price: parseFloat(formData.price),
                isActive: true
            };
            setProducts([...products, newProduct]);
            toast.success("New product added to inventory");
        }
        setShowModal(false);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Remove ${name} from inventory?`)) {
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success("Product removed from inventory");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-primary uppercase tracking-widest">Inventory Management</h1>
                    <p className="text-sm text-gray-400 font-medium">Manage stationery products and real-time stock levels.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center space-x-2 px-8 py-3 bg-secondary text-white rounded-2xl font-black text-sm shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-all"
                >
                    <Plus size={20} />
                    <span>New Product</span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Items</p>
                        <p className="text-3xl font-black text-gray-900">{summary.total}</p>
                    </div>
                    <div className="p-3 bg-primary/5 text-primary rounded-2xl"><Package size={28} /></div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Low Stock</p>
                        <p className="text-3xl font-black text-yellow-500">{summary.low}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 text-yellow-500 rounded-2xl"><AlertCircle size={28} /></div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Out of Stock</p>
                        <p className="text-3xl font-black text-red-500">{summary.out}</p>
                    </div>
                    <div className="p-3 bg-red-50 text-red-500 rounded-2xl"><X size={28} /></div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                <th className="px-8 py-5">Product</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5 text-center">Stock Control</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                                                {p.emoji}
                                            </div>
                                            <span className="font-bold text-gray-900">{p.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-lg uppercase tracking-widest border border-gray-200">{p.category}</span>
                                    </td>
                                    <td className="px-8 py-6 font-black text-primary">₹{p.price}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center space-x-3">
                                            <button
                                                onClick={() => handleStockUpdate(p.id, -1)}
                                                className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <MinusCircle size={24} />
                                            </button>
                                            <div className={`w-12 text-center font-black text-lg ${p.stock === 0 ? 'text-red-500' : p.stock < 5 ? 'text-yellow-500' : 'text-green-600'}`}>
                                                {p.stock}
                                            </div>
                                            <button
                                                onClick={() => handleStockUpdate(p.id, 1)}
                                                className="p-1 text-gray-300 hover:text-green-500 transition-colors"
                                            >
                                                <PlusCircle size={24} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {p.stock === 0 ? (
                                            <span className="flex items-center text-[10px] uppercase font-black text-red-500">
                                                <AlertCircle size={14} className="mr-1.5" /> Out of Stock
                                            </span>
                                        ) : p.stock < 5 ? (
                                            <span className="flex items-center text-[10px] uppercase font-black text-yellow-500">
                                                <AlertCircle size={14} className="mr-1.5" /> ⚠️ Low Stock
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-[10px] uppercase font-black text-green-500 transition-all">
                                                <CheckCircle size={14} className="mr-1.5" /> Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => openModal(p)}
                                                className="p-2 text-primary hover:bg-primary/5 rounded-xl transition-all"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id, p.name)}
                                                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">
                                {editingProduct ? 'Update Product' : 'Add New Item'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-1">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Emoji</label>
                                    <input
                                        type="text"
                                        className="w-full py-4 text-center rounded-2xl border-2 border-gray-100 text-2xl outline-none focus:border-secondary transition-all"
                                        value={formData.emoji}
                                        onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Product Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Spiral Notebook"
                                        className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold outline-none focus:border-secondary transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold outline-none focus:border-secondary transition-all"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Initial Stock</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold outline-none focus:border-secondary transition-all"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 font-bold text-gray-700 outline-none focus:border-secondary transition-all appearance-none bg-no-repeat bg-[right_1.5rem_center]"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23FF6B35\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundSize: '1.25rem' }}
                                >
                                    <option value="pen">Pen</option>
                                    <option value="notebook">Notebook</option>
                                    <option value="highlighter">Highlighter</option>
                                    <option value="folder">Folder</option>
                                    <option value="sticky-notes">Sticky Notes</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg flex items-center justify-center space-x-2"
                            >
                                <Save size={20} />
                                <span>{editingProduct ? 'Commit Changes' : 'Initialize Product'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInventory;
