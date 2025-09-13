import React, { useState, useCallback } from 'react';
import IntegrationCard from '../components/IntegrationCard';
import { IntegrationService, IntegrationStatus } from '../types';
import { INITIAL_SERVICES } from '../constants';

const IntegrationsPage: React.FC = () => {
  const [services, setServices] = useState<IntegrationService[]>(INITIAL_SERVICES);

  const handleStatusChange = useCallback((id: string, status: IntegrationStatus) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === id ? { ...service, status } : service
      )
    );
  }, []);

  const handleCredentialsChange = useCallback((serviceId: string, fieldId: string, value: string) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, values: { ...service.values, [fieldId]: value } }
          : service
      )
    );
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <p className="text-gray-600">
          Manage your third-party service integrations here. Enter API keys and test connections to ensure everything is working correctly.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2">
        {services.map(service => (
          <IntegrationCard
            key={service.id}
            service={service}
            onStatusChange={handleStatusChange}
            onCredentialsChange={handleCredentialsChange}
          />
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;