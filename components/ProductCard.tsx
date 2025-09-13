import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onProductSelect: (productId: string) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ))}
            {hasHalfStar && (
                 <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                 <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ))}
            <span className="text-xs text-gray-500 ml-2">{rating}</span>
        </div>
    );
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductSelect }) => {
    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col"
            onClick={() => onProductSelect(product.id)}
            onKeyPress={(e) => e.key === 'Enter' && onProductSelect(product.id)}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${product.name}`}
        >
            <div className="relative">
                <img className="h-56 w-full object-cover" src={product.imageUrl} alt={product.name} />
                 <div className="absolute top-0 right-0 p-2 bg-red-500 text-white text-xs font-bold rounded-bl-lg">SALE</div>
                 <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white text-xs font-bold rounded-br-lg">{product.pv} PV</div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 uppercase">{product.shopName}</p>
                <h3 className="text-lg font-semibold text-gray-800 truncate mt-1 flex-grow">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-brand-green">{product.price.toLocaleString()} ฿</p>
                    <StarRating rating={product.rating} />
                </div>
                <button 
                    className="mt-4 w-full bg-brand-green text-white py-2 rounded-lg font-semibold hover:bg-brand-green-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green-dark"
                    aria-hidden="true" // The parent div is the interactive element
                    tabIndex={-1} // Prevent tabbing to this button
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;