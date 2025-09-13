import React from 'react';

interface SettingsCardProps {
    title: string;
    children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, children }) => {
    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default SettingsCard;