import { ModeToggle } from "@/components/modetoggle";
import { CalendarRange, ExternalLink } from "lucide-react";
import ClassesTaken from "./_components/_classestaken/classestaken";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="flex flex-row items-center justify-between w-full p-2 pb-0">
        <div className="text-2xl font-bold text-foreground px-2 gap-x-2 flex flex-row cursor-default">
          <CalendarRange className="translate-y-1" />Class Tracker</div>
        <ModeToggle />
      </div>
      <div className="flex flex-row items-center justify-center h-full w-full p-2 gap-x-2">
        <div className="flex bg-secondary text-secondary-foreground h-full p-4 flex-col rounded-lg items-center justify-center basis-1/3">
          <ClassesTaken />
        </div>
        <div className="flex bg-slate-600 h-full flex-col rounded-lg items-center justify-center basis-1/3">
          Hello
        </div>
        <div className="flex bg-slate-700 h-full flex-col rounded-lg items-center justify-center basis-1/3">
          <Link href="https://www.coursicle.com/chapman/">
          <Button variant="default" className="flex flex-row gap-x-2">
            <p className="text-lg">Coursicle</p> <ExternalLink className="" />
          </Button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
