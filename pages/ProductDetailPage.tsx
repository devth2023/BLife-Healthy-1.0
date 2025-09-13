import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import { Product } from '../types';

// A simple component for star rating - could be moved to its own file
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ))}
            {/* Add half/empty stars logic if needed */}
            <span className="text-sm text-gray-500 ml-2">{rating.toFixed(1)} {reviewCount && `(${reviewCount} reviews)`}</span>
        </div>
    );
};


const ImageGallery = ({ images, productName }: { images: string[], productName: string }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div>
            <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden shadow">
                <img src={mainImage} alt={productName} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer border-2 rounded-lg overflow-hidden ${mainImage === image ? 'border-brand-green' : 'border-transparent'}`}
                        onClick={() => setMainImage(image)}
                    >
                        <img src={image} alt={`${productName} thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const ProductTabs = ({ product }: { product: Product }) => {
    const [activeTab, setActiveTab] = useState('description');

    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return <p className="text-gray-600 leading-relaxed">{product.description}</p>;
            case 'specifications':
                return (
                    <div className="prose max-w-none">
                        <ul>
                            <li><strong>Brand:</strong> {product.brand}</li>
                            <li><strong>Category:</strong> {product.category}</li>
                            <li><strong>Shop:</strong> {product.shopName}</li>
                        </ul>
                    </div>
                );
            case 'reviews':
                return (
                    <div>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div className="space-y-6">
                                {product.reviews.map(review => (
                                    <div key={review.id} className="border-b pb-4">
                                        <div className="flex items-center mb-2">
                                            <StarRating rating={review.rating} />
                                            <p className="ml-4 font-bold">{review.author}</p>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-2">{review.date}</p>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Description</button>
                    <button onClick={() => setActiveTab('specifications')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specifications' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Specifications</button>
                    <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Reviews</button>
                </nav>
            </div>
            <div className="py-6">
                {renderContent()}
            </div>
        </div>
    );
}

interface ProductDetailPageProps {
    productId: string | null;
    onNavigate: (page: 'home' | 'products') => void;
    onProductSelect: (productId: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate, onProductSelect }) => {
    const product = PRODUCTS.find(p => p.id === productId);
    const relatedProducts = product ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) : [];
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">Product not found!</h2>
                <button onClick={() => onNavigate('products')} className="mt-4 bg-brand-green text-white py-2 px-4 rounded">
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb items={[
                    { label: 'Home', onClick: () => onNavigate('home') },
                    { label: 'Products', onClick: () => onNavigate('products') },
                    { label: product.name }
                ]} />
                
                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
                    {/* Left Column: Image Gallery */}
                    <div>
                        <ImageGallery images={product.images} productName={product.name} />
                    </div>
                    
                    {/* Right Column: Product Info */}
                    <div>
                        <p className="text-sm font-medium text-brand-green">{product.shopName}</p>
                        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>
                        
                        <div className="mt-4 flex items-center">
                            <StarRating rating={product.rating} reviewCount={product.reviews?.length || 0} />
                        </div>

                        <p className="text-3xl font-bold text-gray-900 mt-6">{product.price.toLocaleString()} ฿</p>
                        
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            {product.description.substring(0, 150)}...
                        </p>

                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <QuantitySelector value={quantity} onChange={setQuantity} />
                                <span className="text-sm font-semibold text-green-600">In Stock</span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                             <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-green-dark transition-colors text-lg">
                                Add to Cart
                            </button>
                             <button className="w-full bg-brand-green-light text-white py-3 rounded-lg font-semibold hover:bg-brand-green transition-colors text-lg">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16">
                    <ProductTabs product={product} />
                </div>

                {/* Related Products Section */}
                <section className="py-16 mt-8 border-t">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-10">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} onProductSelect={onProductSelect} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetailPage;