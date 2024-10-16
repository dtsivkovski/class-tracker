"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileUp } from "lucide-react"

const ExportData = () => {

    function exportDataToTXT() {
      // export both localstorage instances to txt
      const semesters = localStorage.getItem('semesters');
      const checklists = localStorage.getItem('checklists');

      const element = document.createElement("a");
      let file = null;



      if (semesters && checklists) {
        const jsonData = {
          semesters: JSON.parse(semesters),
          checklists: JSON.parse(checklists)
        }
        file = new Blob([JSON.stringify(jsonData)], {type: 'text/json'});
      } else if (semesters) {
        const jsonData = {
          semesters: JSON.parse(semesters)
        }
        file = new Blob([JSON.stringify(jsonData)], {type: 'text/json'});
      }

      if (file) {
        element.href = URL.createObjectURL(file);
        element.download = "class-tracker-data.json";
        document.body.appendChild(element);
        element.click();
      }
    }

    return (
        <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button variant="outline" className="px-2" onClick={exportDataToTXT}><FileUp size={22} /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export your data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </>
    )
}

export default ExportData;