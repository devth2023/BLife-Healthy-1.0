import React, { useState, useMemo } from 'react';
import { MOCK_ORDERS } from '../../constants';
import { Order, OrderStatus } from '../../types';
import OrdersTable from '../../components/admin/OrdersTable';

type StatusFilter = OrderStatus | 'all';

const ManageOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const filteredOrders = useMemo(() => {
        if (activeFilter === 'all') {
            return orders;
        }
        return orders.filter(order => order.status === activeFilter);
    }, [orders, activeFilter]);
    
    const filterOptions: { label: string; value: StatusFilter }[] = [
        { label: 'All', value: 'all' },
        { label: 'Processing', value: OrderStatus.PROCESSING },
        { label: 'Shipped', value: OrderStatus.SHIPPED },
        { label: 'Delivered', value: OrderStatus.DELIVERED },
        { label: 'Cancelled', value: OrderStatus.CANCELLED },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manage Orders</h2>
                <div className="mt-4 md:mt-0 flex items-center bg-white border border-gray-200 rounded-lg p-1 space-x-1">
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setActiveFilter(option.value)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeFilter === option.value
                                    ? 'bg-brand-green text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <OrdersTable orders={filteredOrders} onStatusChange={handleStatusChange} />
        </div>
    );
};

export default ManageOrdersPage;
