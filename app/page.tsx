"use client"

import { ModeToggle } from "@/components/modetoggle";
import { CalendarRange } from "lucide-react";
import ClassesTaken from "./_components/_classestaken/classestaken";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Checklists from "./_components/_checklists/checklists";
import ExportData from "./_components/_data/exportdata";
import ImportData from "./_components/_data/importdata";


export default function Home() {

  // embed toggled state
  // const [embedToggled, setEmbedToggled] = useState(false);

  // const handleEmbedToggle = () => {
  //   setEmbedToggled(!embedToggled);
  // }

  return (
    <>
      <div className="flex flex-col items-center justify-center md:h-screen h-full bg-background pb-2">
      <div className="flex flex-row items-center justify-between w-full p-2">
        <div className="text-2xl font-bold text-foreground px-2 gap-x-2 flex flex-row cursor-default">
          <CalendarRange className="translate-y-1" />Class Tracker</div>
        <div className="flex flex-row gap-x-2">
          <ExportData />
          <ImportData />
          <ModeToggle />
          {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="outline" className="text-foreground px-2" onClick={handleEmbedToggle}><PanelRight size={22} /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle third panel</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>
      <div className="hidden md:flex h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={60}>
        <div className="flex bg-secondary text-secondary-foreground h-full p-4 mx-2 flex-col rounded-lg items-center justify-center basis-1/2">
          <ClassesTaken />
        </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex bg-secondary text-secondary-foreground h-full flex-col rounded-lg p-4 mx-2 items-center justify-center basis-1/4">
            <Checklists />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>
      <div className="flex flex-col w-full md:hidden">
        <div className="flex bg-secondary text-secondary-foreground h-full p-4 mx-2 mb-2 flex-col rounded-lg items-center justify-center basis-1/2">
          <ClassesTaken />
        </div>
        <div className="flex bg-secondary text-secondary-foreground h-full flex-col rounded-lg p-4 mx-2 items-center justify-center basis-1/4">
            <Checklists />
        </div>
      </div>
      </div>
    </>
  );
}
