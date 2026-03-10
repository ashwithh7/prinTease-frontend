import React from 'react';
const AdminPlaceholder = ({ name }) => (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="text-3xl font-mono text-secondary mb-2">[ADMIN] {name}</div>
        <div className="text-white/50">Management Module - Coming Soon</div>
    </div>
);

export const AdminDashboard = () => <AdminPlaceholder name="Dashboard" />;
export const AdminOrders = () => <AdminPlaceholder name="Order Queue" />;
export const AdminOrderDetail = () => <AdminPlaceholder name="Order Manager" />;
export const AdminInventory = () => <AdminPlaceholder name="Inventory & Stationery" />;
