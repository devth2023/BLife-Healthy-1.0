import React, { useState } from 'react';
import SellerSidebar from '../components/seller/SellerSidebar';
import SellerHeader from '../components/seller/SellerHeader';
import SellerDashboardPage from '../pages/seller/SellerDashboardPage';
import ManageProductsPage from '../pages/seller/ManageProductsPage';
import AddProductPage from '../pages/seller/AddProductPage';
import ManageOrdersSellerPage from '../pages/seller/ManageOrdersSellerPage';
import MyShopPage from '../pages/seller/MyShopPage';

export type SellerPage = 'dashboard' | 'products' | 'addProduct' | 'orders' | 'analytics' | 'shop';

const SellerView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<SellerPage>('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <SellerDashboardPage />;
            case 'products':
                return <ManageProductsPage onAddProduct={() => setCurrentPage('addProduct')} />;
            case 'addProduct':
                return <AddProductPage onCancel={() => setCurrentPage('products')} />;
            case 'orders':
                return <ManageOrdersSellerPage />;
            case 'shop':
                return <MyShopPage />;
            // Add cases for other pages here
            default:
                return <SellerDashboardPage />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-light">
            <SellerSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <SellerHeader />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-light">
                    <div className="container mx-auto px-6 py-8">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SellerView;