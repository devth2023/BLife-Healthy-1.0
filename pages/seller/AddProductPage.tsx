import React from 'react';
import ProductForm from '../../components/seller/ProductForm';

interface AddProductPageProps {
    onCancel: () => void;
}

const AddProductPage: React.FC<AddProductPageProps> = ({ onCancel }) => {
    
    const handleSave = (formData: any) => {
        // In a real app, you would send this data to your backend API
        console.log("Saving new product:", formData);
        alert("Product saved! (See console for data)");
        onCancel(); // Go back to the product list after saving
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h2>
            <ProductForm onSave={handleSave} onCancel={onCancel} />
        </div>
    );
};

export default AddProductPage;
