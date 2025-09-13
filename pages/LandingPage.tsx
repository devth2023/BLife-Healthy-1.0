import React from 'react';
import { CATEGORIES, PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface LandingPageProps {
    onNavigate: (page: 'products') => void;
    onProductSelect: (productId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onProductSelect }) => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-brand-green-light relative text-white py-20 md:py-32">
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/healthy-lifestyle/1600/600')", opacity: 0.3 }}></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Live Healthy, Be Happy</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                        Discover a curated selection of the best health & wellness products in Thailand.
                    </p>
                    <button onClick={() => onNavigate('products')} className="bg-white text-brand-green font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300">
                        Shop Now
                    </button>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Featured Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                        {CATEGORIES.map(category => (
                            <button onClick={() => onNavigate('products')} key={category.id} className="group focus:outline-none">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300 group-focus:ring-2 group-focus:ring-brand-green-light">
                                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="mt-4 font-semibold text-gray-700 group-hover:text-brand-green">{category.name}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {PRODUCTS.slice(0, 4).map(product => (
                           <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Promotional Banner */}
            <section className="py-16 bg-brand-green text-white">
                <div className="container mx-auto px-4 text-center">
                     <h2 className="text-3xl font-bold mb-4">Weekly Special Deals!</h2>
                     <p className="mb-6">Get up to 30% off on selected items. Don't miss out!</p>
                     <button onClick={() => onNavigate('products')} className="bg-white text-brand-green font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">
                        View Deals
                    </button>
                </div>
            </section>

             {/* Best Sellers */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Our Best Sellers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                         {PRODUCTS.slice(4, 8).map(product => (
                           <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;