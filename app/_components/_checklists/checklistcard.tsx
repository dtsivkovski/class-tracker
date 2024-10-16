"use client"

import { useState, ChangeEvent, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, Plus, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';

type TableData = {
    col1: string;
    col2: boolean;
};

type Checklist = {
    name: string;
    tableData: TableData[];
};

type ChecklistCardProps = {
    checklist: Checklist;
    onUpdate: (updatedChecklist: Checklist) => void;
    onDelete: () => void;
};

const ChecklistCard = ({ checklist, onUpdate, onDelete }: ChecklistCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localChecklist, setLocalChecklist] = useState(checklist);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCourseInputChange = (rowIndex: number, value: string) => {
        const newTableData = [...localChecklist.tableData];
        // assign the value to correct column
        newTableData[rowIndex].col1 = value;
        // update checklist
        const updatedChecklist = { ...localChecklist, tableData: newTableData };
        setLocalChecklist(updatedChecklist);
        onUpdate(updatedChecklist);
    };

    const handleCheckInputChange = (rowIndex: number, value: boolean | string) => {
        const newTableData = [...localChecklist.tableData];
        // assign the value to correct column depending on type
        if (typeof value === 'boolean') newTableData[rowIndex].col2 = value;
        else newTableData[rowIndex].col2 = value === 'true';
        // update checklist
        const updatedChecklist = { ...localChecklist, tableData: newTableData };
        setLocalChecklist(updatedChecklist);
        onUpdate(updatedChecklist);
    }

    const handleChecklistNameChange = (value: string) => {
        const updatedChecklist = { ...localChecklist, name: value };
        setLocalChecklist(updatedChecklist);
        onUpdate(updatedChecklist);
    };

    const addNewRow = () => {
        const newTableData = [...localChecklist.tableData, { col1: '', col2: false }];
        const updatedChecklist = { ...localChecklist, tableData: newTableData };
        setLocalChecklist(updatedChecklist);
        onUpdate(updatedChecklist);
    };

    const handleDeleteRow = (rowIndex: number) => {
        const newTableData = [...localChecklist.tableData];
        newTableData.splice(rowIndex, 1);
        const updatedChecklist = { ...localChecklist, tableData: newTableData };
        setLocalChecklist(updatedChecklist);
        onUpdate(updatedChecklist);
    };

    const handleFormKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addNewRow();
        }
    };

    return (
        <div className="flex flex-col text-start overflow-scroll w-full">
            <Card className="w-full p-4">
                <div className="flex flex-row justify-between items-center">
                    <Button variant="ghost" className="py-4 px-2" onClick={toggleDropdown}>
                        <ChevronRight className={`transition-all transform ${isOpen ? 'rotate-90' : ''}`} />
                    </Button>
                    <h2 className="text-lg font-bold">
                        <Input
                            variant="ghost"
                            type="text"
                            value={localChecklist.name}
                            className="w-48 p-2 rounded text-center"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChecklistNameChange(e.target.value)}
                            onKeyDown={handleFormKeyDown}
                        />
                    </h2>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="py-4 px-2 w-10">
                                <Trash size={22} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will not be able to undo this action. Any courses stored in this checklist will be lost.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                {isOpen && (
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="h-6 p-1 pr-4">Course Code</TableHead>
                                    <TableHead className="h-6 p-1 pr-4 w-6">Completed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {localChecklist.tableData.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell className="h-8 p-1 pr-4">
                                            <Input
                                                variant="ghost"
                                                type="text"
                                                value={row.col1}
                                                onChange={(e) => handleCourseInputChange(rowIndex, e.target.value)}
                                                className={`w-full p-2 h-4 rounded ${row.col2 ? 'line-through text-muted-foreground' : ''}`}
                                                placeholder="FFC 100"
                                                onKeyDown={handleFormKeyDown}
                                            />
                                        </TableCell>
                                        <TableCell className="h-8 p-1 w-full grid grid-flow-col gap-x-2 align-center content-center justify-end">
                                            <Checkbox
                                                    checked={row.col2}
                                                    onCheckedChange={(checked) => handleCheckInputChange(rowIndex, checked)}
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

export default ChecklistCard;