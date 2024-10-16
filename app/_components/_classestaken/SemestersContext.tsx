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

    useEffect(() => {
        const savedSemesters = localStorage.getItem('semesters');
        if (savedSemesters) {
            setSemesters(JSON.parse(savedSemesters));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('semesters', JSON.stringify(semesters));
    }, [semesters]);

    return (
        <SemestersContext.Provider value={{ semesters, setSemesters }}>
            {children}
        </SemestersContext.Provider>
    );
};