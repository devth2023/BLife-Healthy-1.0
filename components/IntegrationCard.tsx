import React, { useState, useCallback } from 'react';
import { IntegrationService, IntegrationStatus } from '../types';

interface IntegrationCardProps {
  service: IntegrationService;
  onStatusChange: (id: string, status: IntegrationStatus) => void;
  onCredentialsChange: (serviceId: string, fieldId: string, value: string) => void;
}

const StatusIndicator = ({ status }: { status: IntegrationStatus }) => {
  const baseClasses = "w-3 h-3 rounded-full";
  let colorClasses = "bg-gray-400";
  if (status === IntegrationStatus.CONNECTED) {
    colorClasses = "bg-green-500 animate-pulse";
  } else if (status === IntegrationStatus.DISCONNECTED) {
    colorClasses = "bg-red-500";
  } else if (status === IntegrationStatus.TESTING) {
    colorClasses = "bg-yellow-500 animate-spin";
  }

  return <div className={`${baseClasses} ${colorClasses}`}></div>;
};


const IntegrationCard: React.FC<IntegrationCardProps> = ({ service, onStatusChange, onCredentialsChange }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleTestConnection = useCallback(() => {
    setIsTesting(true);
    onStatusChange(service.id, IntegrationStatus.TESTING);

    setTimeout(() => {
      // In a real app, you'd use service.values to make an API call
      console.log(`Testing connection for ${service.name} with credentials:`, service.values);
      const isSuccess = Math.random() > 0.3; // 70% chance of success
      const newStatus = isSuccess ? IntegrationStatus.CONNECTED : IntegrationStatus.DISCONNECTED;
      onStatusChange(service.id, newStatus);
      setIsTesting(false);
    }, 2000);
  }, [onStatusChange, service.id, service.name, service.values]);

  const handleSave = () => {
    setIsSaving(true);
    console.log("Saving credentials for", service.name, service.values);
    // Simulate an API call to save data
    setTimeout(() => {
      setIsSaving(false);
      // Here you might show a success toast message
    }, 1000);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    onCredentialsChange(service.id, fieldId, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {service.logo}
              <div>
                  <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                <StatusIndicator status={service.status} />
                <span className="text-sm font-medium text-gray-600">{service.status}</span>
            </div>
        </div>
      </div>
      <div className="p-6">
        <form className="space-y-6">
          {service.fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={`${service.id}-${field.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={`${service.id}-${field.id}`}
                value={service.values[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                disabled={isTesting}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-green-light focus:border-brand-green-light sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={field.placeholder}
              />
              <p className="mt-2 text-xs text-gray-500">{field.helpText}</p>
            </div>
          ))}
        </form>
      </div>
      <div className="px-6 py-4 bg-gray-50 flex justify-end items-center space-x-3">
        <button
          type="button"
          disabled={isTesting}
          onClick={handleTestConnection}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTesting && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isTesting ? 'Testing...' : 'Test Connection'}
        </button>
        <button
          type="button"
          disabled={isTesting || isSaving}
          onClick={handleSave}
          className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-green hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
           {isSaving && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSaving ? 'Saving...' : 'Save Credentials'}
        </button>
      </div>
    </div>
  );
};

export default IntegrationCard;