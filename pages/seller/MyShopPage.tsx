import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PRODUCTS } from '../../constants';
import ProductCard from '../../components/ProductCard';

const MyShopPage: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(user?.shopDescription || 'No description provided.');

    const sellerProducts = useMemo(() => {
        if (!user) return [];
        return PRODUCTS.filter(p => p.shopName === user.name);
    }, [user]);

    const handleSave = () => {
        // In a real app, this would make an API call to update the user profile
        console.log("Saving new description:", description);
        setIsEditing(false);
        // We'd also update the user object in the AuthContext
    };
    
    // A dummy function as this is just a preview
    const handleProductSelect = (productId: string) => {
        console.log(`Previewing product ${productId}`);
    };

    if (!user) {
        return <div>Loading seller information...</div>;
    }

    return (
        <div>
            {/* Shop Header */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mr-6 bg-gray-200 flex items-center justify-center">
                        <img className="object-cover w-full h-full" src={`https://picsum.photos/seed/${user.id}/100`} alt={`${user.name} logo`} />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-4xl font-extrabold text-gray-800">{user.name}</h1>
                        {isEditing ? (
                             <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-2 w-full border-gray-300 rounded-md shadow-sm text-base"
                                rows={3}
                             />
                        ) : (
                            <p className="text-gray-600 mt-2 text-base">{description}</p>
                        )}
                    </div>
                     <div className="mt-4 md:mt-0">
                        {isEditing ? (
                            <div className="flex space-x-2">
                                <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                                <button onClick={handleSave} className="bg-brand-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-green-dark">Save</button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50">
                                Edit Description
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Listing */}
            <div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Products</h2>
                 {sellerProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sellerProducts.map(product => (
                            <ProductCard key={product.id} product={product} onProductSelect={handleProductSelect} />
                        ))}
                    </div>
                 ) : (
                    <div className="text-center bg-white p-10 rounded-lg shadow-md">
                        <p className="text-gray-500">You haven't listed any products yet.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default MyShopPage;