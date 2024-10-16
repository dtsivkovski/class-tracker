"use client"

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileDown } from "lucide-react"

const ImportData = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    function importAllDataFromJSON() {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    let dataUpdated = false;
                    const json = JSON.parse(e.target?.result as string);
                    console.log(json); // Handle the JSON data as needed
                    if (json.semesters) {
                        localStorage.setItem('semesters', JSON.stringify(json.semesters));
                        dataUpdated = true;
                    }
                    if (json.checklists) {
                        localStorage.setItem('checklists', JSON.stringify(json.checklists));
                        dataUpdated = true;
                    }
                    // give document fadeout effect and then refresh
                    if (dataUpdated) {
                        const mainBodyDiv = document.getElementById('mainBodyDivForFade');
                        // close dialog
                        setIsDialogOpen(false);

                        mainBodyDiv?.classList.remove('fade-in');
                        mainBodyDiv?.classList.add('fade-out');
                        setTimeout(() => {
                            window.location.reload();
                        }, 990);
                    }

                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            };
            reader.readAsText(file);
        }
    }

    return (
        <>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="px-2" onClick={() => setIsDialogOpen(true)}><FileDown size={22} /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Import your data</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Import your data</DialogTitle>
                            <DialogDescription className="pt-4">
                                <input 
                                    type="file"
                                    className="block w-full text-sm text-muted-foreground
                                    file:mr-4 file:py-3 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold file:bg-accent
                                    hover:file:bg-accent/90"
                                    onChange={handleFileChange}
                                    />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="default" onClick={importAllDataFromJSON}>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
        </>
    )
}

export default ImportData;