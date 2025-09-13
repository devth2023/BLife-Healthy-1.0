import React from 'react';
import { MOCK_NETWORK_DATA } from '../../constants';
import TreeNode from '../../components/customer/TreeNode';

const NetworkStructurePage: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Network Structure</h2>
            {MOCK_NETWORK_DATA.length > 0 ? (
                <div className="space-y-2">
                    {MOCK_NETWORK_DATA.map(member => (
                        <TreeNode key={member.id} member={member} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">You have no members in your downline yet.</p>
                </div>
            )}
        </div>
    );
};

export default NetworkStructurePage;
