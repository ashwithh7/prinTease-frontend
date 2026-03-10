import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const storedToken = localStorage.getItem('pe_token');
            const storedUser = localStorage.getItem('pe_user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = (email, password) => {
        if (!email.endsWith('@vnrvjiet.in')) {
            toast.error('Please use your VNRVJIET email');
            return;
        }

        const mockUser = {
            id: '1',
            name: email.split('@')[0],
            email,
            role: 'student'
        };

        localStorage.setItem('pe_token', 'mock_token_123');
        localStorage.setItem('pe_user', JSON.stringify(mockUser));

        setUser(mockUser);
        setToken('mock_token_123');
        setIsAuthenticated(true);
        toast.success('Login Successful!');
        navigate('/dashboard');
    };

    const register = (formData) => {
        const mockUser = {
            id: '1',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            collegeId: formData.collegeId,
            role: 'student'
        };

        localStorage.setItem('pe_token', 'mock_token_123');
        localStorage.setItem('pe_user', JSON.stringify(mockUser));

        setUser(mockUser);
        setToken('mock_token_123');
        setIsAuthenticated(true);
        toast.success('Account Created!');
        navigate('/dashboard');
    };

    const adminLogin = (email, password) => {
        if (email === 'admin@vnrvjiet.in' && password === 'Admin@123') {
            const mockAdmin = {
                id: 'admin_1',
                name: 'System Admin',
                email,
                role: 'admin'
            };

            localStorage.setItem('pe_token', 'admin_mock_token_456');
            localStorage.setItem('pe_user', JSON.stringify(mockAdmin));

            setUser(mockAdmin);
            setToken('admin_mock_token_456');
            setIsAuthenticated(true);
            toast.success('Admin Access Granted');
            navigate('/admin/dashboard');
        } else {
            toast.error('Invalid admin credentials');
            throw new Error('Invalid admin credentials');
        }
    };

    const logout = () => {
        localStorage.removeItem('pe_token');
        localStorage.removeItem('pe_user');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        toast.success('Logged out');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, register, adminLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
