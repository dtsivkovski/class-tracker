"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TableData = {
    col1: string;
    col2: number; // Assuming col2 is a number representing credits
};

type Semester = {
    name: string;
    tableData: TableData[];
};

type SemestersContextType = {
    semesters: Semester[];
    setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>;
};

const SemestersContext = createContext<SemestersContextType | undefined>(undefined);

export const useSemestersContext = () => {
    const context = useContext(SemestersContext);
    if (!context) {
        throw new Error('useSemestersContext must be used within a SemestersProvider');
    }
    return context;
};

export const SemestersProvider = ({ children }: { children: ReactNode }) => {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedSemesters = localStorage.getItem('semesters');
        console.log('Loading semesters from localStorage:', savedSemesters);
        if (savedSemesters) {
            setSemesters(JSON.parse(savedSemesters));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('semesters', JSON.stringify(semesters));
        }
    }, [semesters, isLoaded]);

    return (
        <div className='fade-in'>
        <SemestersContext.Provider value={{ semesters, setSemesters }}>
            {children}
        </SemestersContext.Provider>
        </div>
    );
};