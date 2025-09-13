import React, { useState, useCallback, useEffect } from 'react';
import CustomerHeader from '../components/CustomerHeader';
import LandingPage from '../pages/LandingPage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import Footer from '../components/Footer';
import AccountPage from '../pages/customer/ProfilePage';

type CustomerPage = 'home' | 'products' | 'productDetail' | 'cart' | 'account';

const CustomerView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<CustomerPage>('home');
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const refId = params.get('ref');
        if (refId) {
            sessionStorage.setItem('affiliateRef', refId);
            // Optional: Clean the URL so the ref doesn't stay visible
            // window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const navigateTo = useCallback((page: CustomerPage) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }, []);

    const handleProductSelect = useCallback((productId: string) => {
        setSelectedProductId(productId);
        navigateTo('productDetail');
    }, [navigateTo]);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <LandingPage onNavigate={navigateTo} onProductSelect={handleProductSelect} />;
            case 'products':
                return <ProductListingPage onNavigate={navigateTo} onProductSelect={handleProductSelect} />;
            case 'productDetail':
                return <ProductDetailPage 
                            productId={selectedProductId} 
                            onNavigate={navigateTo} 
                            onProductSelect={handleProductSelect} 
                        />;
            case 'cart':
                return <ShoppingCartPage onNavigate={navigateTo} />;
            case 'account':
                return <AccountPage />;
            default:
                return <LandingPage onNavigate={navigateTo} onProductSelect={handleProductSelect} />;
        }
    };

    return (
        <>
            <CustomerHeader onNavigate={navigateTo} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </>
    );
};

export default CustomerView;