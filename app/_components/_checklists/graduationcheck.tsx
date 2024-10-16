import { useSemestersContext } from "../_classestaken/SemestersContext";
import { Card } from "@/components/ui/card";

const GraduationCheck = () => {
    const { semesters } = useSemestersContext();

    const totalCredits = semesters.reduce((total, semester) => {
        return total + semester.tableData.reduce((sum, course) => sum + course.col2, 0);
    }, 0);

    return (
        <div className="flex flex-col text-start overflow-scroll w-full">
            <Card className="w-full p-4">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-lg font-bold">Graduation Credits</h2>
                    <span className="text-lg font-bold">{totalCredits}/120</span>
                </div>
            </Card>
        </div>
    );
};

export default GraduationCheck;