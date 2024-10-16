import { useEffect, useState, useRef } from 'react';
import ChecklistCard from './checklistcard';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

type TableData = {
    col1: string;
    col2: boolean;
};

type Checklist = {
    name: string;
    tableData: TableData[];
};

const Checklists = () => {
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (isInitialLoad.current) {
            // Load initial state from localStorage
            const savedChecklists = localStorage.getItem('checklists');
            if (savedChecklists) {
                console.log('Loading checklists from localStorage:', savedChecklists);
                setChecklists(JSON.parse(savedChecklists));
            } else {
                console.log('No checklists found in localStorage');
            }
            isInitialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        // Save checklists to localStorage whenever it changes
        localStorage.setItem('checklists', JSON.stringify(checklists));
    }, [checklists]);

    const addNewChecklist = () => {
        let checklistName = "Major";
        setChecklists([...checklists, { name: checklistName, tableData: [] }]);
    };

    const updateChecklist = (index: number, updatedChecklist: Checklist) => {
        const newChecklists = [...checklists];
        newChecklists[index] = updatedChecklist;
        setChecklists(newChecklists);
    };

    const deleteChecklist = (index: number) => {
        const newChecklists = checklists.filter((_, i) => i !== index);
        setChecklists(newChecklists);
    };

    return (
        <>
        <div className="w-full h-full">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl pl-2 font-bold">Academic Checklists</h1>
                <Button 
                    variant="default" 
                    onClick={addNewChecklist}
                    className="px-2">
                    <Plus className={checklists.length === 0 ? 'animate-[ping_1s_ease-in-out_infinite]' : ''}/>
                </Button>
            </div>
            <div className="flex flex-wrap w-full gap-2">
                {checklists.map((checklist, index) => (
                    <ChecklistCard
                        key={index}
                        checklist={checklist}
                        onUpdate={(updatedChecklist) => updateChecklist(index, updatedChecklist)}
                        onDelete={() => deleteChecklist(index)}
                    />
                ))}
            </div>
        </div>
        </>
    );
};

export default Checklists;