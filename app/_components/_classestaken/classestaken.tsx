"use client"

import SemesterCard from "./semestercard";

const ClassesTaken = () => {

    return (
        <>
        <h1 className="text-xl">Classes Taken</h1>
        <div className="flex flex-row flex-wrap text-start w-full h-full overflow-scroll gap-x-2">
            <SemesterCard />
            <SemesterCard />
        </div>
        </>
    )
}

export default ClassesTaken;