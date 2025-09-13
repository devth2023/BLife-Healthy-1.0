import React from 'react';
import { MOCK_AFFILIATE_STATS } from '../../constants';
import { AffiliateStat } from '../../types';

interface AffiliateDashboardPageProps {
    onNavigate: () => void;
}

const StatCard: React.FC<{ stat: AffiliateStat }> = ({ stat }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className="text-brand-green-light bg-green-50 p-3 rounded-full">
                {stat.icon}
            </div>
        </div>
    );
};

const AffiliateDashboardPage: React.FC<AffiliateDashboardPageProps> = ({ onNavigate }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Affiliate Dashboard</h2>
                 <button 
                    onClick={onNavigate}
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow transition-colors"
                >
                    + Generate New Link
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_AFFILIATE_STATS.map(stat => <StatCard key={stat.label} stat={stat} />)}
            </div>
             <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Welcome to the Affiliate Program!</h3>
                <p className="text-gray-600 mt-2">
                    Here you can generate unique tracking links, view your performance, and see your commission earnings. 
                    Use the "Generate New Link" button to get started.
                </p>
            </div>
        </div>
    );
};

export default AffiliateDashboardPage;