import React, { useState } from 'react';
import AffiliateSidebar from '../components/affiliate/AffiliateSidebar';
import AffiliateHeader from '../components/affiliate/AffiliateHeader';
import AffiliateDashboardPage from '../pages/affiliate/AffiliateDashboardPage';
import LinkGeneratorPage from '../pages/affiliate/LinkGeneratorPage';
import CommissionsPage from '../pages/affiliate/CommissionsPage';

export type AffiliatePage = 'dashboard' | 'links' | 'commissions';

const AffiliateView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<AffiliatePage>('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <AffiliateDashboardPage onNavigate={() => setCurrentPage('links')} />;
            case 'links':
                return <LinkGeneratorPage />;
            case 'commissions':
                return <CommissionsPage />;
            default:
                return <AffiliateDashboardPage onNavigate={() => setCurrentPage('links')} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-light">
            <AffiliateSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AffiliateHeader />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-light">
                    <div className="container mx-auto px-6 py-8">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AffiliateView;