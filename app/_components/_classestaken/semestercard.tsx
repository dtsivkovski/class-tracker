"use client"

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

type TableData = {
    col1: string;
    col2: string;
    col3: string;
};

type Column = keyof TableData;

const SemesterCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState(
        Array.from({ length: 5 }).map((_, rowIndex) => ({
            col1: `GCI 200`,
            col2: `3`,
        }))
    );

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (rowIndex: number, column: Column, value: string) => {
        const newData = [...tableData];
        newData[rowIndex][column] = value;
        setTableData(newData);
    };

    return (
        <div className="flex flex-col text-start w-[49%] overflow-scroll">
            <Card className="w-full p-4">
                <div className="flex flex-row justify-between items-center">
                    <Button variant="default" className="py-4 px-2" onClick={toggleDropdown}>
                        <ChevronRight className={`transition-all transform ${isOpen ? 'rotate-90' : ''}`} />
                    </Button>
                    <h2 className="text-lg font-bold">Fall</h2>
                    <Button variant="default" className="py-4 px-2"><Plus /></Button>
                </div>
                {isOpen && (
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead className="w-6">Credits</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell>
                                            <Input
                                                variant="ghost"
                                                type="text"
                                                value={row.col1}
                                                onChange={(e) => handleInputChange(rowIndex, 'col1', e.target.value)}
                                                className="w-full p-2 rounded"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                variant="ghost"
                                                type="text"
                                                value={row.col2}
                                                onChange={(e) => handleInputChange(rowIndex, 'col2', e.target.value)}
                                                className="w-full p-2 rounded"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default SemesterCard;