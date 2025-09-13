import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';

const PRODUCTS_PER_PAGE = 8;

interface ProductListingPageProps {
    onNavigate: (page: 'home') => void;
    onProductSelect: (productId: string) => void;
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({ onNavigate, onProductSelect }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE);

    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return PRODUCTS.slice(startIndex, endIndex);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb items={[{ label: 'Home', onClick: () => onNavigate('home') }, { label: 'All Products' }]} />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Title and Sorting */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
                                <p className="text-gray-500 mt-1">Showing {currentProducts.length} of {PRODUCTS.length} results</p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <label htmlFor="sort" className="sr-only">Sort by</label>
                                <select 
                                    id="sort" 
                                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light rounded-md"
                                >
                                    <option>Sort by: Relevance</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest</option>
                                    <option>Ratings</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {currentProducts.map(product => (
                                <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;