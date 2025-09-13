import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_ALL_USERS } from '../constants';


// Mock users
const MOCK_USERS: Omit<User, 'joinDate' | 'status'>[] = [
    { id: 'cust1', name: 'Somsri', email: 'customer@blivehealthy.co.th', role: 'customer' },
    { id: 'seller1', name: 'Healthy Hut', email: 'seller@healthyhut.co.th', role: 'seller' },
    { id: 'admin1', name: 'Admin User', email: 'admin@blivehealthy.co.th', role: 'admin' },
    { id: 'aff1', name: 'Top Influencer', email: 'influencer@blivehealthy.co.th', role: 'affiliate' },
];

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user in localStorage on initial load
        try {
            const savedUser = localStorage.getItem('blive-user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('blive-user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, pass: string): Promise<void> => {
        // Mock API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const foundUser = MOCK_ALL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
                // In a real app, you'd also check the password hash
                if (foundUser) {
                    setUser(foundUser);
                    localStorage.setItem('blive-user', JSON.stringify(foundUser));
                    resolve();
                } else {
                     const isDemo = MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
                     if(isDemo){
                         const demoUser = MOCK_ALL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
                         if(demoUser){
                            setUser(demoUser);
                            localStorage.setItem('blive-user', JSON.stringify(demoUser));
                            resolve();
                            return;
                         }
                     }
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('blive-user');
    };

    const value = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};