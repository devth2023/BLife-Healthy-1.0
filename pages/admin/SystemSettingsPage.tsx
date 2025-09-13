import React, { useState } from 'react';
import SettingsCard from '../../components/admin/SettingsCard';

const SystemSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState({
        siteTitle: 'Blive Healthy',
        logoUrl: '/logo.png',
        metaDescription: 'Your trusted partner for health and wellness products in Thailand.',
        commissionRate: '10',
        taxRate: '7',
        currency: 'THB',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setSaveSuccess(false);
        console.log("Saving settings:", settings);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000); // Hide success message after 2s
        }, 1500);
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">System Settings</h2>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                        saveSuccess 
                            ? 'bg-green-600' 
                            : 'bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light'
                    } disabled:opacity-50 transition-colors`}
                >
                    {isSaving && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {isSaving ? 'Saving...' : (saveSuccess ? 'Saved!' : 'Save Changes')}
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <SettingsCard title="Site Information">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700">Site Title</label>
                                <input type="text" name="siteTitle" id="siteTitle" value={settings.siteTitle} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                             <div>
                                <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL</label>
                                <input type="text" name="logoUrl" id="logoUrl" value={settings.logoUrl} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">Default Meta Description</label>
                                <textarea name="metaDescription" id="metaDescription" value={settings.metaDescription} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                            </div>
                        </div>
                    </SettingsCard>

                     <SettingsCard title="Email Templates">
                        <p className="text-sm text-gray-500 mb-4">Manage templates for transactional emails.</p>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center"><span>Order Confirmation</span><button className="text-brand-green text-sm font-semibold">Manage</button></li>
                            <li className="flex justify-between items-center"><span>Password Reset</span><button className="text-brand-green text-sm font-semibold">Manage</button></li>
                            <li className="flex justify-between items-center"><span>Shipping Update</span><button className="text-brand-green text-sm font-semibold">Manage</button></li>
                        </ul>
                    </SettingsCard>
                </div>

                 <div className="space-y-8">
                    <SettingsCard title="Commerce Settings">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700">Default Affiliate Commission Rate (%)</label>
                                <input type="number" name="commissionRate" id="commissionRate" value={settings.commissionRate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">Default Tax Rate (%)</label>
                                <input type="number" name="taxRate" id="taxRate" value={settings.taxRate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                                <select id="currency" name="currency" value={settings.currency} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none rounded-md">
                                    <option>THB</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                </select>
                            </div>
                        </div>
                    </SettingsCard>
                 </div>
            </div>
        </div>
    );
};

export default SystemSettingsPage;