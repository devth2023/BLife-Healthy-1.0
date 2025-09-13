import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_ORDERS, PRODUCTS } from '../../constants';
import OrderHistoryTable from '../../components/customer/OrderHistoryTable';
import NetworkStructurePage from './NetworkStructurePage';
import { Order, OrderStatus } from '../../types';
import Breadcrumb from '../../components/Breadcrumb';

type AccountTab = 'dashboard' | 'details' | 'orders' | 'network';

const OrderDetailView: React.FC<{ order: Order; onBack: () => void }> = ({ order, onBack }) => {
    const productDetails = useMemo(() => {
        return order.items.map(item => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            return { ...item, product };
        });
    }, [order.items]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                </div>
                <button onClick={onBack} className="text-sm font-semibold text-brand-green hover:underline">
                    &larr; Back to Order History
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 text-lg">Items Ordered</h3>
                    <div className="space-y-4">
                        {productDetails.map(({product, quantity, productName}) => (
                           <div key={product?.id || productName} className="flex items-center">
                                <img src={product?.imageUrl} alt={productName} className="w-16 h-16 rounded-md object-cover mr-4" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{productName}</p>
                                    <p className="text-sm text-gray-500">Qty: {quantity}</p>
                                </div>
                                <div className="text-right">
                                     <p className="font-semibold">{(product?.price || 0) * quantity} ฿</p>
                                     <p className="text-sm text-blue-600 font-medium">{(product?.pv || 0) * quantity} PV</p>
                                </div>
                           </div>
                        ))}
                    </div>
                </div>
                 <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Order Summary</h4>
                        <div className="flex justify-between text-sm"><span>Subtotal:</span><span>{order.total.toLocaleString()} ฿</span></div>
                        <div className="flex justify-between text-sm"><span>Shipping:</span><span>50.00 ฿</span></div>
                        <div className="flex justify-between font-bold mt-2 pt-2 border-t"><span>Total:</span><span>{(order.total + 50).toLocaleString()} ฿</span></div>
                        <div className="flex justify-between font-bold text-blue-600"><span>Total PV:</span><span>{order.totalPV} PV</span></div>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <address className="text-sm text-gray-600 not-italic">
                            {order.shippingAddress.fullName}<br/>
                            {order.shippingAddress.address}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br/>
                            Phone: {order.shippingAddress.phone}
                        </address>
                    </div>
                 </div>
            </div>

            <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                     <p className="text-sm"><strong>Payment Method:</strong> {order.paymentDetails.method.replace('-', ' ')}</p>
                     <p className="text-sm"><strong>Date:</strong> {order.date}</p>
                </div>
                {order.status === OrderStatus.PROCESSING && (
                     <button className="bg-red-100 text-red-700 font-bold py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
};


const DashboardView: React.FC<{ setActiveTab: (tab: AccountTab) => void }> = ({ setActiveTab }) => {
    // Mock data for dashboard
    const pvSummary = { accumulated: 1250, available: 850, pending: 400 };
    const commissionSummary = { total: '15,750 ฿', paid: '12,000 ฿', pending: '3,750 ฿' };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            <h3 className="text-lg font-semibold text-gray-700 mb-4">PV Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-sm text-blue-700">Accumulated PV</p>
                    <p className="text-3xl font-bold text-blue-800">{pvSummary.accumulated}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-sm text-green-700">Available PV</p>
                    <p className="text-3xl font-bold text-green-800">{pvSummary.available}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-sm text-yellow-700">PV Awaiting Confirmation</p>
                    <p className="text-3xl font-bold text-yellow-800">{pvSummary.pending}</p>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-4">Commission Summary</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-indigo-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-sm text-indigo-700">Total Earned</p>
                    <p className="text-3xl font-bold text-indigo-800">{commissionSummary.total}</p>
                </div>
                 <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-sm text-green-700">Paid Out</p>
                    <p className="text-3xl font-bold text-green-800">{commissionSummary.paid}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-sm text-orange-700">Pending Payment</p>
                    <p className="text-3xl font-bold text-orange-800">{commissionSummary.pending}</p>
                </div>
            </div>

            <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h3>
                <div className="flex space-x-4">
                     <button onClick={() => setActiveTab('orders')} className="bg-brand-green text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-green-dark transition-colors">
                        View Order History
                    </button>
                    <button onClick={() => setActiveTab('network')} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                        My Network Structure
                    </button>
                </div>
            </div>
        </div>
    );
};


const AccountPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<AccountTab>('dashboard');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    
    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const userOrders = useMemo(() => {
        if (!user) return [];
        return MOCK_ORDERS.filter(order => order.customerEmail === user.email)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [user]);

    if (!user) {
        return <div className="text-center py-10">Please log in to see your profile.</div>;
    }

    const handleViewOrder = (orderId: string) => {
        const order = userOrders.find(o => o.id === orderId);
        if(order) setSelectedOrder(order);
    }
    
    const renderContent = () => {
        if (selectedOrder) {
            return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />
        }

        switch (activeTab) {
            case 'dashboard':
                return <DashboardView setActiveTab={setActiveTab} />;
            case 'details':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Details</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" value={userData.name} onChange={e => setUserData(d => ({...d, name: e.target.value}))} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" value={userData.email} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Joined On</label>
                                <p className="mt-1 text-gray-800">{new Date(user.joinDate).toLocaleDateString()}</p>
                            </div>
                            <div className="pt-4 text-right">
                                <button className="bg-brand-green text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-green-dark transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'orders':
                return <OrderHistoryTable orders={userOrders} onViewOrder={handleViewOrder} />;
            case 'network':
                return <NetworkStructurePage />;
            default:
                return null;
        }
    }

    const isTabActive = (tab: AccountTab) => {
        if (tab === 'orders') {
            return activeTab === 'orders' || selectedOrder;
        }
        return activeTab === tab && !selectedOrder;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                 <Breadcrumb items={[{ label: 'Home' }, { label: 'My Account' }]} />
                <h1 className="text-4xl font-extrabold text-gray-800 my-8">My Account</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="md:col-span-1">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <nav className="space-y-1">
                                <button onClick={() => {setActiveTab('dashboard'); setSelectedOrder(null);}} className={`w-full text-left px-4 py-2 rounded-md font-medium ${isTabActive('dashboard') ? 'bg-brand-green-light text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    Dashboard
                                </button>
                                <button onClick={() => {setActiveTab('details'); setSelectedOrder(null);}} className={`w-full text-left px-4 py-2 rounded-md font-medium ${isTabActive('details') ? 'bg-brand-green-light text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    Account Details
                                </button>
                                <button onClick={() => {setActiveTab('orders'); setSelectedOrder(null);}} className={`w-full text-left px-4 py-2 rounded-md font-medium ${isTabActive('orders') ? 'bg-brand-green-light text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    Order History
                                </button>
                                <button onClick={() => {setActiveTab('network'); setSelectedOrder(null);}} className={`w-full text-left px-4 py-2 rounded-md font-medium ${isTabActive('network') ? 'bg-brand-green-light text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    My Network
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="md:col-span-3">
                        <div className="bg-white p-8 rounded-lg shadow">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
