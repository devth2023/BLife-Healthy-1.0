import React, { useState } from 'react';
import { MOCK_AFFILIATES } from '../../constants';
import { Affiliate } from '../../types';
import AffiliatesTable from '../../components/admin/AffiliatesTable';

const ManageAffiliatesPage: React.FC = () => {
    const [affiliates, setAffiliates] = useState<Affiliate[]>(MOCK_AFFILIATES);

    const handleCommissionChange = (affiliateId: string, newRate: number) => {
        // Clamp the rate between 0 and 100
        const rateAsDecimal = Math.max(0, Math.min(100, newRate)) / 100;
        setAffiliates(prevAffiliates =>
            prevAffiliates.map(affiliate =>
                affiliate.id === affiliateId ? { ...affiliate, commissionRate: rateAsDecimal } : affiliate
            )
        );
        // In a real app, you would also make an API call here to save the change.
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Manage Affiliates</h2>
                 <button className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow transition-colors">
                    + Add New Affiliate
                </button>
            </div>
            
            <AffiliatesTable 
                affiliates={affiliates}
                onCommissionChange={handleCommissionChange}
            />
        </div>
    );
};

export default ManageAffiliatesPage;
