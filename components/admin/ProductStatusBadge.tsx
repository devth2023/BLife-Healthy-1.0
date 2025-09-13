import React from 'react';

interface ProductStatusBadgeProps {
  status: 'Active' | 'Inactive';
}

const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  );
};

export default ProductStatusBadge;