import React, { useState } from 'react';
import AdminSidebar, { AdminPage } from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import IntegrationsPage from '../pages/IntegrationsPage';
import ManageOrdersPage from '../pages/admin/ManageOrdersPage';
import ManageUsersPage from '../pages/admin/ManageUsersPage';
import ManageProductsAdminPage from '../pages/admin/ManageProductsAdminPage';
import ManageAffiliatesPage from '../pages/admin/ManageAffiliatesPage';
import SystemSettingsPage from '../pages/admin/SystemSettingsPage';

// Placeholder for other admin pages
const AdminDashboardPage = () => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">System Overview</h3>
            <p className="text-gray-500 mt-2">Key metrics and system health status will be shown here.</p>
        </div>
    </div>
);


const AdminView: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'integrations':
                return <IntegrationsPage />;
            case 'dashboard':
                 return <AdminDashboardPage />;
            case 'orders':
                return <ManageOrdersPage />;
            case 'users':
                return <ManageUsersPage />;
            case 'products':
                return <ManageProductsAdminPage />;
            case 'affiliates':
                return <ManageAffiliatesPage />;
            case 'settings':
                return <SystemSettingsPage />;
            // Add cases for other pages here
            default:
                return <AdminDashboardPage />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-light">
            <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-light">
                    <div className="container mx-auto px-6 py-8">
                        {renderPage()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminView;