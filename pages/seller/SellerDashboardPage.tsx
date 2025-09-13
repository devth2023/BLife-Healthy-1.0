import React, { useMemo } from 'react';
import { MOCK_ORDERS, SELLER_STATS, PRODUCTS } from '../../constants';
import { OrderStatus, SellerStat } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import RecentSalesTable from '../../components/seller/RecentSalesTable';

const StatCard: React.FC<{ stat: SellerStat }> = ({ stat }) => {
    const changeColor = stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500';
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                {stat.change && (
                    <p className={`text-sm mt-2 font-semibold ${changeColor}`}>{stat.change} vs last week</p>
                )}
            </div>
            <div className="text-brand-green-light bg-green-50 p-3 rounded-full">
                {stat.icon}
            </div>
        </div>
    );
};

const SellerDashboardPage: React.FC = () => {
    const { user } = useAuth();

    const sellerData = useMemo(() => {
        if (!user) return { products: [], orders: [], pendingOrders: 0, totalRevenue: 0 };
        const sellerProducts = PRODUCTS.filter(p => p.shopName === user.name);
        const sellerOrders = MOCK_ORDERS.filter(order => order.shopName === user.name);
        const pending = sellerOrders.filter(o => o.status === OrderStatus.PROCESSING).length;
        const revenue = sellerOrders
            .filter(o => o.status === OrderStatus.DELIVERED)
            .reduce((sum, order) => sum + order.total, 0);

        return {
            products: sellerProducts,
            orders: sellerOrders,
            pendingOrders: pending,
            totalRevenue: revenue
        };
    }, [user]);

    const recentSales = useMemo(() => {
        return [...sellerData.orders]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    }, [sellerData.orders]);

    const dynamicStats = useMemo(() => [
        {
            ...SELLER_STATS[0],
            label: 'Total Revenue',
            value: `฿${sellerData.totalRevenue.toLocaleString()}`,
            change: undefined,
        },
        {
            ...SELLER_STATS[1],
            label: 'Pending Orders',
            value: sellerData.pendingOrders.toString(),
            change: undefined,
        },
        {
            ...SELLER_STATS[2],
            label: 'Total Products',
            value: sellerData.products.length.toString(),
            change: undefined,
        }
    ], [sellerData]);


    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dynamicStats.map(stat => <StatCard key={stat.label} stat={stat} />)}
            </div>

            <RecentSalesTable orders={recentSales} />
        </div>
    );
};

export default SellerDashboardPage;