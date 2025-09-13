import React, { useState, useMemo } from 'react';
import { CART_ITEMS, PRODUCTS, MOCK_AFFILIATES } from '../constants';
import { CartItem, Commission } from '../types';
import Breadcrumb from '../components/Breadcrumb';
import QuantitySelector from '../components/QuantitySelector';
import ProductCard from '../components/ProductCard';
import { useData } from '../contexts/DataContext';

const CartItemRow: React.FC<{ item: CartItem; onQuantityChange: (id: string, newQuantity: number) => void; onRemove: (id: string) => void; }> = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="flex items-center py-4 border-b">
            <div className="w-24 h-24 mr-4 flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.shopName}</p>
                <p className="text-sm text-brand-green font-medium mt-1">{item.price.toLocaleString()} ฿</p>
            </div>
            <div className="w-32 mx-4">
                <QuantitySelector value={item.quantity} onChange={(newQuantity) => onQuantityChange(item.id, newQuantity)} />
            </div>
            <div className="w-24 text-right mx-4">
                <p className="font-semibold text-lg">{(item.price * item.quantity).toLocaleString()} ฿</p>
            </div>
            <div className="w-12 text-right">
                <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    );
}

interface ShoppingCartPageProps {
    onNavigate: (page: 'home' | 'products') => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({ onNavigate }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS);
    const { addCommission } = useData();

    const handleQuantityChange = (id: string, newQuantity: number) => {
        setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };
    
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const affiliateId = sessionStorage.getItem('affiliateRef');
        const orderId = `BH-${Date.now()}`; // Generate a single order ID for the transaction

        if (affiliateId) {
            const affiliate = MOCK_AFFILIATES.find(a => a.id === affiliateId);
            if (affiliate) {
                // Create commissions for each item in the cart
                cartItems.forEach(item => {
                    const commissionEarned = item.price * item.quantity * affiliate.commissionRate;
                    const newCommission: Commission = {
                        id: `comm${Date.now()}${Math.random().toString(36).substring(7)}`,
                        orderId: orderId, // Use the consistent order ID
                        affiliateId: affiliate.id,
                        date: new Date().toISOString().split('T')[0],
                        productName: item.name,
                        saleAmount: item.price * item.quantity,
                        commissionRate: affiliate.commissionRate,
                        commissionEarned: commissionEarned,
                        status: 'Pending'
                    };
                    addCommission(newCommission);
                });
                const totalCommission = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * affiliate.commissionRate), 0);
                alert(`Purchase successful (Order ${orderId})! Commission of ${totalCommission.toFixed(2)}฿ recorded for affiliate ${affiliate.name}.`);
            } else {
                 alert(`Purchase successful (Order ${orderId})! Referred by an invalid affiliate ID.`);
            }
        } else {
            alert(`Purchase successful (Order ${orderId})!`);
        }
        
        // Clear cart and affiliate ref after checkout
        setCartItems([]);
        sessionStorage.removeItem('affiliateRef');
        // Optionally navigate away
        onNavigate('home');
    };

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);
    
    const shippingFee = 50; // Example shipping fee
    const grandTotal = subtotal + shippingFee;

    const upsellingProducts = PRODUCTS.slice(5, 9);
    
    // onProductSelect is not available here, so we pass a dummy function
    const handleProductSelect = () => {};

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb items={[{ label: 'Home', onClick: () => onNavigate('home') }, { label: 'Shopping Cart' }]} />

                <h1 className="text-4xl font-bold text-gray-800 my-6">Your Cart</h1>
                
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                            <div className="hidden md:flex text-xs uppercase text-gray-500 font-semibold border-b pb-3">
                                <div className="flex-grow">Product</div>
                                <div className="w-32 mx-4 text-center">Quantity</div>
                                <div className="w-24 text-right mx-4">Total</div>
                                <div className="w-12 text-right"></div>
                            </div>
                            <div>
                                {cartItems.map(item => (
                                    <CartItemRow 
                                        key={item.id} 
                                        item={item}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemoveItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <aside className="lg:col-span-1 lg:sticky lg:top-24">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-2xl font-semibold border-b pb-4">Order Summary</h2>
                                <div className="space-y-4 py-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">{subtotal.toLocaleString()} ฿</span>
                                    </div>
                                     <div className="flex justify-between text-gray-600">
                                        <span>Shipping Fee</span>
                                        <span className="font-semibold">{shippingFee.toLocaleString()} ฿</span>
                                    </div>
                                </div>
                                <div className="py-4 border-t">
                                    <div className="flex justify-between font-bold text-xl">
                                        <span>Grand Total</span>
                                        <span>{grandTotal.toLocaleString()} ฿</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold mb-2">Discount Code</h3>
                                    <div className="flex">
                                        <input type="text" placeholder="Enter code" className="w-full rounded-l-md border-gray-300 shadow-sm"/>
                                        <button className="bg-gray-200 text-gray-800 px-4 rounded-r-md hover:bg-gray-300 font-semibold">Apply</button>
                                    </div>
                                </div>
                                <button onClick={handleCheckout} className="mt-6 w-full bg-brand-green text-white py-3 rounded-lg font-bold text-lg hover:bg-brand-green-dark transition-colors">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow">
                        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
                        <button onClick={() => onNavigate('products')} className="mt-6 inline-block bg-brand-green text-white py-3 px-8 rounded-lg font-semibold hover:bg-brand-green-dark transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                )}


                {/* Upselling Section */}
                <section className="py-16 mt-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10">Customers also bought</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {upsellingProducts.map(p => (
                                <ProductCard key={p.id} product={p} onProductSelect={handleProductSelect} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShoppingCartPage;