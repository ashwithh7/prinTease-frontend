import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Printer, CheckCircle, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.email.endsWith('@vnrvjiet.in')) {
            newErrors.email = 'Only VNRVJIET emails allowed';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await login(formData.email, formData.password);
        } catch (err) {
            setErrors({ server: 'Invalid email or password' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-poppins">
            {/* Left Panel */}
            <div className="hidden lg:flex w-5/12 bg-primary text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div>
                    <Link to="/" className="flex items-center space-x-3 mb-16 group">
                        <div className="p-2 bg-white rounded-lg text-primary group-hover:rotate-12 transition-transform">
                            <Printer size={28} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">PrintEase</span>
                    </Link>

                    <h1 className="text-4xl font-bold mb-8 leading-tight">
                        Welcome Back to <br />
                        <span className="text-secondary">PrintEase.</span>
                    </h1>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <CheckCircle className="text-secondary" size={24} />
                            <span className="text-lg opacity-90">Track your current orders live</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CheckCircle className="text-secondary" size={24} />
                            <span className="text-lg opacity-90">Manage your print history</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CheckCircle className="text-secondary" size={24} />
                            <span className="text-lg opacity-90">Re-order past documents instantly</span>
                        </div>
                    </div>
                </div>

                <div className="text-sm opacity-50">
                    PrintEase © 2024. All rights reserved.
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-7/12 bg-white p-8 md:p-16 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <div className="lg:hidden flex items-center space-x-2 text-primary mb-8">
                        <Printer size={32} />
                        <span className="text-xl font-bold">PrintEase</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
                    <p className="text-gray-500 mb-8">Enter your college credentials to continue.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">College Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    disabled={loading}
                                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-primary transition-all outline-none`}
                                    placeholder="name@vnrvjiet.in"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-primary transition-all outline-none"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => toast.info('Please contact admin to reset password')}
                                className="text-sm font-semibold text-secondary hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {errors.server && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm text-center font-medium">
                                {errors.server}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                <span>Login</span>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        New here?{' '}
                        <Link to="/register" className="text-secondary font-bold hover:underline">
                            Create Account →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
