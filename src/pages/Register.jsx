import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Printer, CheckCircle, User, Mail, Phone, Hash, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        collegeId: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        let error = '';
        if (name === 'email' && value && !value.endsWith('@vnrvjiet.in')) {
            error = 'Only VNRVJIET emails allowed';
        } else if (name === 'phone' && value && !/^\d{10}$/.test(value)) {
            error = 'Enter valid 10-digit number';
        } else if (name === 'password' && value && value.length < 6) {
            error = 'Minimum 6 characters';
        } else if (name === 'confirmPassword' && value && value !== formData.password) {
            error = 'Passwords do not match';
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const handleBlur = (e) => {
        validate(e.target.name, e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) validate(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation check
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const err = validate(key, formData[key]);
            if (err) newErrors[key] = err;
        });

        if (Object.values(newErrors).some(err => err)) return;

        setLoading(true);
        try {
            await register(formData);
        } catch (err) {
            // Errors are handled in context/toast
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
                        Welcome to <br />
                        <span className="text-secondary">VNRVJIET's</span> <br />
                        Premier Print Portal.
                    </h1>

                    <div className="space-y-6">
                        {[
                            "Skip long queues at the stationary shop",
                            "Upload and customize prints from your room",
                            "Secure online payments via multiple modes"
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <CheckCircle className="text-secondary" size={24} />
                                <span className="text-lg opacity-90">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-sm opacity-50">
                    PrintEase © 2024. All rights reserved.
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-7/12 bg-white p-8 md:p-16 flex items-center justify-center overflow-y-auto">
                <div className="max-w-md w-full">
                    <div className="lg:hidden flex items-center space-x-2 text-primary mb-8">
                        <Printer size={32} />
                        <span className="text-xl font-bold">PrintEase</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-500 mb-8">Join the VNRVJIET printing revolution.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        disabled={loading}
                                        onBlur={handleBlur}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-primary transition-all outline-none`}
                                        placeholder="name@vnrvjiet.in"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email ? (
                                    <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>
                                ) : (
                                    <p className="mt-1 text-[10px] text-gray-400 uppercase tracking-wider font-bold">Use your @vnrvjiet.in email</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        disabled={loading}
                                        onBlur={handleBlur}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-primary transition-all outline-none`}
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.phone && <p className="mt-1 text-xs font-medium text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* College ID */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">College ID</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="collegeId"
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary transition-all outline-none"
                                    placeholder="22071A0XXX"
                                    value={formData.collegeId}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        disabled={loading}
                                        onBlur={handleBlur}
                                        className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-primary transition-all outline-none`}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-xs font-medium text-red-500">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        disabled={loading}
                                        onBlur={handleBlur}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:border-primary transition-all outline-none`}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-xs font-medium text-red-500">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <span>Register Now</span>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-secondary font-bold hover:underline">
                            Login →
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
