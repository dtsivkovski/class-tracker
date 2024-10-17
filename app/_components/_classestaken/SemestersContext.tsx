"use client";

import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type TableData = {
    col1: string;
    col2: number; // Assuming col2 is a number representing credits
};

type Semester = {
    id: string;
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
            const parsedSemesters = JSON.parse(savedSemesters);
            // check if they have ids, if not assign them
            const semestersWithIds = parsedSemesters.map((semester: Semester) => {
                if (!semester.id) {
                    return { ...semester, id: uuidv4() };
                }
                return semester;
            });
        
            setSemesters(semestersWithIds);
        } else {
            const defaultSemester: Semester = {
                id: uuidv4(),
                name: "Transfer Credits",
                tableData: [{ col1: "Total Credit", col2: 0 }]
            };
            setSemesters([defaultSemester]);
            localStorage.setItem('semesters', JSON.stringify([defaultSemester]));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('semesters', JSON.stringify(semesters));
        }
    }, [semesters, isLoaded]);

    return (
        <div id="mainBodyDivForFade" className='fade-in'>
            <SemestersContext.Provider value={{ semesters, setSemesters }}>
                {children}
            </SemestersContext.Provider>
        </div>
    );
};