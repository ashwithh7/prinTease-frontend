import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const { adminLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await adminLogin(formData.email, formData.password);
        } catch (err) {
            setError(err.message || 'Verification failed. Access denied.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 font-poppins">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-white/20 to-secondary"></div>

            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-4 border border-white/10">
                        <ShieldAlert size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">Admin Portal</h1>
                    <p className="text-secondary font-semibold uppercase tracking-widest text-sm">VNRVJIET PrintEase</p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16"></div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Admin Identity</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none text-gray-900"
                                    placeholder="admin@vnrvjiet.in"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Master Code</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none text-gray-900"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center space-x-2 animate-shake">
                                <ShieldAlert size={18} className="shrink-0" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <span>Authorize Access</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400 font-medium tracking-wide flex items-center justify-center space-x-1">
                            <span>HINT: admin@vnrvjiet.in</span>
                        </p>
                    </div>
                </div>

                <p className="text-center mt-8 text-white/40 text-xs uppercase tracking-widest font-bold">
                    Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
