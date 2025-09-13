import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Commission } from '../types';
import { MOCK_COMMISSIONS } from '../constants';

interface DataContextType {
    commissions: Commission[];
    addCommission: (newCommission: Commission) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [commissions, setCommissions] = useState<Commission[]>(MOCK_COMMISSIONS);

    const addCommission = (newCommission: Commission) => {
        setCommissions(prev => [newCommission, ...prev]);
    };

    const value = { commissions, addCommission };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
