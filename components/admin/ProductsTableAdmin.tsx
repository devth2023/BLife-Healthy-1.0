import React from 'react';
import { Product } from '../../types';
import ProductStatusBadge from './ProductStatusBadge';

interface ProductsTableAdminProps {
  products: Product[];
  onStatusChange: (productId: string, newStatus: 'Active' | 'Inactive') => void;
}

const ProductsTableAdmin: React.FC<ProductsTableAdminProps> = ({ products, onStatusChange }) => {

  const handleToggleStatus = (product: Product) => {
    const newStatus = product.status === 'Active' ? 'Inactive' : 'Active';
    onStatusChange(product.id, newStatus);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50">
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
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.shopName}</td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{product.price.toLocaleString()} ฿</td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ProductStatusBadge status={product.status ?? 'Inactive'} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => handleToggleStatus(product)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    product.status === 'Active' 
                    ? 'text-red-700 bg-red-100 hover:bg-red-200' 
                    : 'text-green-700 bg-green-100 hover:bg-green-200'
                  }`}
                >
                  {product.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTableAdmin;