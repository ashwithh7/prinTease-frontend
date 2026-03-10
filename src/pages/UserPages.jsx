import React from 'react';
const Placeholder = ({ name }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-4xl font-bold text-primary mb-2">{name}</div>
        <div className="text-gray-500">Coming Soon</div>
    </div>
);

export const NewOrder = () => <Placeholder name="New Print Order" />;
export const OrderDetail = () => <Placeholder name="Order Details" />;
