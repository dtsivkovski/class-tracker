import { useEffect, useState, ChangeEvent } from 'react';
import SemesterCard from './semestercard';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

type TableData = {
    col1: string;
    col2: string;
    col3: string;
};

type Semester = {
    name: string;
    tableData: TableData[];
};

const Semesters = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);

    useEffect(() => {
        // Load initial state from localStorage
        const savedSemesters = localStorage.getItem('semesters');
        if (savedSemesters) {
            setSemesters(JSON.parse(savedSemesters));
        } else {
            // Initialize with default data if nothing is in localStorage
            setSemesters([
                {
                    name: "FA 24",
                    tableData: Array.from({ length: 5 }).map((_, rowIndex) => ({
                        col1: `Row ${rowIndex + 1} Col 1`,
                        col2: `Row ${rowIndex + 1} Col 2`,
                        col3: `Row ${rowIndex + 1} Col 3`,
                    }))
                }
            ]);
        }
    }, []);

    useEffect(() => {
        // Save semesters to localStorage whenever it changes
        localStorage.setItem('semesters', JSON.stringify(semesters));
    }, [semesters]);

    const addNewSemester = () => {
        let semesterName = "FA 24";
        // if last semester name is fall, then next name is interterm -> spring -> summer -> fall
        // update year as well if the last semester name is fall
        if (semesters.length > 0) {
            const lastSemesterName = semesters[semesters.length - 1].name;
            if (lastSemesterName.includes("FA")) {
                const year = parseInt(lastSemesterName.split(" ")[1]);
                semesterName = `INT ${year + 1}`;
            } else if (lastSemesterName.includes("INT")) {
                semesterName = `SP ${lastSemesterName.split(" ")[1]}`;
            } else if (lastSemesterName.includes("SP")) {
                semesterName = `SUM ${lastSemesterName.split(" ")[1]}`;
            } else if (lastSemesterName.includes("SUM")) {
                semesterName = `FA ${lastSemesterName.split(" ")[1]}`;
            }
        }
        setSemesters([...semesters, { name: semesterName, tableData: [] }]);
    };

    const updateSemester = (index: number, updatedSemester: Semester) => {
        const newSemesters = [...semesters];
        newSemesters[index] = updatedSemester;
        setSemesters(newSemesters);
    };

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Semesters</h1>
                <Button variant="default" onClick={addNewSemester}>
                    <Plus />
                </Button>
            </div>
            <div className="flex flex-wrap w-full gap-2">
                {semesters.map((semester, index) => (
                    <SemesterCard
                        key={index}
                        semester={semester}
                        onUpdate={(updatedSemester) => updateSemester(index, updatedSemester)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Semesters;