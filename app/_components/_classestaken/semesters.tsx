import { useSemestersContext } from './SemestersContext';
import SemesterCard from './semestercard';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import TransferCreditCard from './transfercreditcard';
import { Semester, SemesterTableData } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Semesters = () => {
    const { semesters, setSemesters } = useSemestersContext();

    const addNewSemester = () => {
        let semesterName = "FA 24";
        let tableData: SemesterTableData[] = [];
        const semesterId = uuidv4();
        if (semesters.length === 0) {
            semesterName = "Transfer Credits";
            tableData = [{col1: "Total Credit", col2: 0 }];
        } else {
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
        setSemesters([...semesters, { id: semesterId, name: semesterName, tableData: tableData }]);
    };

    const updateSemester = (index: number, updatedSemester: Semester) => {
        const newSemesters = [...semesters];
        newSemesters[index] = updatedSemester;
        setSemesters(newSemesters);
    };

    const deleteSemester = (id: string) => {
        setSemesters(semesters.filter(semester => semester.id !== id));
    }

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl pl-2 font-bold">Four Year Plan</h1>
                <Button 
                    variant="default" 
                    onClick={addNewSemester}
                    className="px-2">
                    <Plus className={semesters.length === 0 ? 'animate-[ping_1s_ease-in-out_infinite]' : ''}/>
                </Button>
            </div>
            <div className="flex flex-wrap w-full gap-2">
                {semesters.length > 0 && (
                <TransferCreditCard
                    key={semesters[0].id}
                    semester={semesters[0]}
                    onUpdate={(updatedSemester) => updateSemester(0, updatedSemester)}
                />
                )}
                {semesters.map((semester, index) => (
                    <>
                    {index != 0 && (
                    <SemesterCard
                        key={semester.id}
                        id={semester.id}
                        semester={semester}
                        onUpdate={(updatedSemester) => updateSemester(index, updatedSemester)}
                        onDelete={() => deleteSemester(semester.id)}
                    />
                    )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default Semesters;