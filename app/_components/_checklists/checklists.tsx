import { useEffect, useState, useRef } from 'react';
import ChecklistCard from './checklistcard';
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from 'lucide-react';
import GraduationCheck from './graduationcheck';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isInitialLoad = useRef(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputNameRef = useRef<HTMLInputElement>(null);

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

    const copyToClipboard = () => {
        const text = `I am going to give you a major/minor curriculum. I want you to give me a list of course codes, separated by a comma with a space, like this: ", ". if it gives you any sequences, I want you to clarify with me which of the sequences I plan to take. If it requires multiple classes, such as six of the same class, you add all of them, like all 6. If it says "electives", then instead of the course code you need to say "ELECTIVE", where the number of these electives you put is the credit count of the electives section title divided by 3. then, you're going to output it in a very plaintext format that I can copy and paste into somewhere else, like the following: \`CPSC 353, CPSC 298, MATH 250,\` and keep going until you've said all the classes`;
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const handleCustomChecklistFromPaste = () => {
        const inputText = inputRef.current?.value;
        const inputName = inputNameRef.current?.value;
        if (inputText) {
            const courses = inputText.split(',').map(course => course.trim());
            const newChecklist: Checklist = {
                name: inputName || "Custom",
                tableData: courses.map(course => ({ col1: course, col2: false }))
            };
            setChecklists([...checklists, newChecklist]);
            setIsDialogOpen(false);
        }
    };

    return (
        <div className="flex flex-row flex-wrap text-start w-full h-full overflow-scroll gap-x-2">
        <div className="w-full h-full">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1 className="text-2xl pl-2 font-bold">Academic Checklists</h1>
                <div className="flex flex-row items-center gap-x-2">
                <Button 
                    variant="default" 
                    onClick={addNewChecklist}
                    className="px-2">
                    <Plus className={checklists.length === 0 ? 'animate-[ping_1s_ease-in-out_infinite]' : ''}/>
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button 
                            variant="default" 
                            className="px-2"><Sparkles /></Button>
                    </DialogTrigger>
                    <DialogContent className="w-fit">
                        <DialogHeader>
                            <DialogTitle>Paste checklist using AI</DialogTitle>
                            <DialogDescription>
                                Use ChatGPT to generate a checklist using the following prompt along with your major or minor from the catalog. Click to copy the prompt to your clipboard.
                            </DialogDescription>
                            <div className="flex flex-col items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                    <TooltipTrigger className="text-left my-2 w-full">
                                        <pre 
                                        className="bg-secondary text-secondary-foreground p-2 text-xs w-full max-h-20 text-ellipsis rounded-sm cursor-pointer"
                                        onClick={copyToClipboard}>
                                            I am going to give you a major/minor curriculum. I want yo...
                                        </pre>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click to clipboard</p>
                                    </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Input 
                                    type="text" 
                                    placeholder="Paste checklist here"
                                    className="w-full mt-2"
                                    ref={inputRef}
                                />
                                <Input 
                                    type="text" 
                                    placeholder="Give it a name"
                                    className="w-full mt-2"
                                    ref={inputNameRef}
                                />
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="default" onClick={handleCustomChecklistFromPaste}>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                </div>

            </div>
            <div className="flex flex-wrap w-full gap-2">
                <GraduationCheck />
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
        </div>
    );
};

export default Checklists;