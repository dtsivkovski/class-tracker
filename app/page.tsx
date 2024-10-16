"use client"

import { ModeToggle } from "@/components/modetoggle";
import { CalendarRange, ExternalLink, FileUp, PanelRight } from "lucide-react";
import ClassesTaken from "./_components/_classestaken/classestaken";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";


export default function Home() {

  // embed toggled state
  const [embedToggled, setEmbedToggled] = useState(false);

  const handleEmbedToggle = () => {
    setEmbedToggled(!embedToggled);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-background pb-2">
      <div className="flex flex-row items-center justify-between w-full p-2">
        <div className="text-2xl font-bold text-foreground px-2 gap-x-2 flex flex-row cursor-default">
          <CalendarRange className="translate-y-1" />Class Tracker</div>
        <div className="flex flex-row gap-x-2">
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="outline" className="text-secondary hover:bg-background hover:text-card px-2"><FileUp size={22} /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export feature coming soon...</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <ModeToggle />
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="outline" className="text-foreground px-2" onClick={handleEmbedToggle}><PanelRight size={22} /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle third panel</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={60}>
        <div className="flex bg-secondary text-secondary-foreground h-full p-4 mx-2 flex-col rounded-lg items-center justify-center basis-1/2">
          <ClassesTaken />
        </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40}>
          <div className="flex bg-slate-600 h-full flex-col rounded-lg p-4 mx-2 items-center justify-center basis-1/4">
            Hello
          </div>
        </ResizablePanel>
        { embedToggled && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize={20}>
            <div className="flex bg-slate-700 h-full flex-col rounded-lg p-4 mx-2 items-center justify-center basis-1/4">
              <Link href="https://www.coursicle.com/chapman/" target="_blank">
              <Button variant="default" className="flex flex-row gap-x-2">
                <p className="text-lg">Coursicle</p> <ExternalLink className="" />
              </Button>
              </Link>
            </div>
          </ResizablePanel>
        </>
        )}
      </ResizablePanelGroup>
      </div>
    </>
  );
}
