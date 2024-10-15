"use client"

import Semesters from "./semesters";

const ClassesTaken = () => {

    return (
        <>
        <div className="flex flex-row flex-wrap text-start w-full h-full overflow-scroll gap-x-2">
            <Semesters />
        </div>
        </>
    )
}

export default ClassesTaken;