'use client'
import { getData } from '@/utils/requests/dataQuery';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the shape of your data
interface DbData {
    // Example fields
    admissions: any[]
}

// Context value type
interface DbDataContextType {
    data: DbData | null;
    loading: boolean;
    error: Error | null;
}

// Create context
const DbDataContext = createContext<DbDataContextType | undefined>(undefined);

// Provider component
export const DbDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<DbData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Replace with your actual fetch logic
        const fetchData = async () => {
            setLoading(true);
            try {
                const admissions = await getData({title: 'Get Admissions', url: '/api/students'})

                setData({
                    admissions
                });
                setError(null);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DbDataContext.Provider value={{ data, loading, error }}>
            {children}
        </DbDataContext.Provider>
    );
};

// Custom hook for consuming context
export const useDbData = () => {
    const context = useContext(DbDataContext);
    if (context === undefined) {
        throw new Error('useDbData must be used within a DbDataProvider');
    }
    return context;
};