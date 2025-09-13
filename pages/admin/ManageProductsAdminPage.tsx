import React, { useState } from 'react';
import { PRODUCTS } from '../../constants';
import { Product } from '../../types';
import ProductsTableAdmin from '../../components/admin/ProductsTableAdmin';

const ManageProductsAdminPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);

    const handleStatusChange = (productId: string, newStatus: 'Active' | 'Inactive') => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, status: newStatus } : product
            )
        );
         // In a real app, you'd also make an API call here.
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manage All Products</h2>
            </div>
            
            <ProductsTableAdmin 
                products={products}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default ManageProductsAdminPage;