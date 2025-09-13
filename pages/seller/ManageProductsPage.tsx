import React, { useMemo } from 'react';
import { PRODUCTS } from '../../constants';
import { Product } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface ManageProductsPageProps {
    onAddProduct: () => void;
}

const ProductRow: React.FC<{ product: Product }> = ({ product }) => {
    const statusColor = product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.price.toLocaleString()} ฿</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.stock}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                    {product.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => alert('Edit functionality not yet implemented.')} className="text-brand-green hover:text-brand-green-dark">Edit</button>
            </td>
        </tr>
    )
}

const ManageProductsPage: React.FC<ManageProductsPageProps> = ({ onAddProduct }) => {
    const { user } = useAuth();

    const sellerProducts = useMemo(() => {
        if (!user) return [];
        return PRODUCTS.filter(p => p.shopName === user.name);
    }, [user]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>
                <button 
                    onClick={onAddProduct}
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow transition-colors"
                >
                    + Add New Product
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sellerProducts.length > 0 ? (
                            sellerProducts.map(product => (
                                <ProductRow key={product.id} product={product} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    You have not added any products yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProductsPage;
