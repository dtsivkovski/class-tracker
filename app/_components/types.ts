// Define the SemesterTableData type
export interface SemesterTableData {
    col1: string;
    col2: number;
}

// Define the ChecklistTableData type
export interface ChecklistTableData {
    col1: string;
    col2: boolean;
}

// Define the Semester type
export interface Semester {
    name: string;
    tableData: SemesterTableData[];
}

// Define the Checklist type
export interface Checklist {
    name: string;
    tableData: ChecklistTableData[];
}