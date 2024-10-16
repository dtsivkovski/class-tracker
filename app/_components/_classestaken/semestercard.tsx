"use client"

import { useState, ChangeEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, Plus, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

type TableData = {
    col1: string;
    col2: string;
    col3: string;
};

type Column = keyof TableData;

type Semester = {
    name: string;
    tableData: TableData[];
};

type SemesterCardProps = {
    semester: Semester;
    onUpdate: (updatedSemester: Semester) => void;
    onDelete: () => void;
};

const SemesterCard = ({ semester, onUpdate, onDelete }: SemesterCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localSemester, setLocalSemester] = useState(semester);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (rowIndex: number, column: Column, value: string) => {
        const newTableData = [...localSemester.tableData];
        newTableData[rowIndex][column] = value;
        const updatedSemester = { ...localSemester, tableData: newTableData };
        setLocalSemester(updatedSemester);
        onUpdate(updatedSemester);
    };

    const handleSemesterNameChange = (value: string) => {
        const updatedSemester = { ...localSemester, name: value };
        setLocalSemester(updatedSemester);
        onUpdate(updatedSemester);
    };

    const addNewRow = () => {
        const newTableData = [...localSemester.tableData, { col1: '', col2: '', col3: '' }];
        const updatedSemester = { ...localSemester, tableData: newTableData };
        setLocalSemester(updatedSemester);
        onUpdate(updatedSemester);
    };

    const handleDeleteRow = (rowIndex: number) => {
        const newTableData = [...localSemester.tableData];
        newTableData.splice(rowIndex, 1);
        const updatedSemester = { ...localSemester, tableData: newTableData };
        setLocalSemester(updatedSemester);
        onUpdate(updatedSemester);
    };

    const handleFormKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.currentTarget.blur();
        }
    };

    return (
        <div className="flex flex-col text-start overflow-scroll w-52">
            <Card className="w-full p-4">
                <div className="flex flex-row justify-between items-center">
                    <Button variant="ghost" className="py-4 px-2" onClick={toggleDropdown}>
                        <ChevronRight className={`transition-all transform ${isOpen ? 'rotate-90' : ''}`} />
                    </Button>
                    <h2 className="text-lg font-bold">
                        <Input
                            variant="ghost"
                            type="text"
                            value={localSemester.name}
                            className="w-20 p-2 rounded text-center"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSemesterNameChange(e.target.value)}
                            onKeyDown={handleFormKeyDown}
                        />
                    </h2>
                    <Button variant="ghost" className="py-4 px-2 w-10" onClick={onDelete}>
                        <Trash size={22} />
                    </Button>
                </div>
                {isOpen && (
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="h-6 p-1 pr-4">Course Code</TableHead>
                                    <TableHead className="h-6 p-1 pr-4 w-6">Credits</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {localSemester.tableData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell className="h-8 p-1 pr-4">
                                            <Input
                                                variant="ghost"
                                                type="text"
                                                value={row.col1}
                                                onChange={(e) => handleInputChange(rowIndex, 'col1', e.target.value)}
                                                className="w-full p-2 h-4 rounded"
                                                placeholder="FFC 100"
                                                onKeyDown={handleFormKeyDown}
                                            />
                                        </TableCell>
                                        <TableCell className="h-8 p-1 w-8 grid grid-flow-col gap-x-2 align-center content-center justify-center">
                                            <Input
                                                variant="ghost"
                                                type="text"
                                                value={row.col2}
                                                onChange={(e) => handleInputChange(rowIndex, 'col2', e.target.value)}
                                                className="w-8 p-2 ml-6 h-4 rounded"
                                                placeholder="3"
                                                onKeyDown={handleFormKeyDown}
                                            />
                                            <Trash className="cursor-pointer" size={20} onClick={() => handleDeleteRow(rowIndex)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2} className="h-8 p-1 pr-4 w-full">
                                        <div className="flex justify-end w-full">
                                            <Plus className="cursor-pointer mr-[2px]" size={20} onClick={addNewRow} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default SemesterCard;