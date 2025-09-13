import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const LinkGeneratorPage: React.FC = () => {
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState<string>(PRODUCTS[0].id);
    const [copyText, setCopyText] = useState('Copy');
    
    const generatedLink = useMemo(() => {
        if (!user || !selectedProduct) return '';
        const baseUrl = 'https://blivehealthy.co.th/product/';
        return `${baseUrl}${selectedProduct}?ref=${user.id}`;
    }, [user, selectedProduct]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink).then(() => {
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy'), 2000);
        });
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Link Generator</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="space-y-6 max-w-xl mx-auto">
                    <div>
                        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                            Select a Product to Promote
                        </label>
                        <select 
                            id="product" 
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light sm:text-sm rounded-md"
                        >
                            {PRODUCTS.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="generated-link" className="block text-sm font-medium text-gray-700 mb-2">
                            Your Unique Affiliate Link
                        </label>
                        <div className="flex">
                            <input 
                                id="generated-link"
                                type="text"
                                value={generatedLink}
                                readOnly
                                className="flex-1 block w-full border-gray-300 rounded-l-md shadow-sm bg-gray-100 focus:ring-brand-green-light focus:border-brand-green-light"
                            />
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none"
                            >
                                {copyText}
                            </button>
                        </div>
                    </div>
                     <div className="text-center pt-4">
                        <p className="text-sm text-gray-500">Share this link to earn commission on sales!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkGeneratorPage;