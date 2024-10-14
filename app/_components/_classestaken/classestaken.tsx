"use client"

import SemesterCard from "./semestercard";

const ClassesTaken = () => {

    return (
        <div className="flex flex-col text-start w-full h-full text-start overflow-scroll">
            <h1 className="text-xl">Classes Taken</h1>
            <SemesterCard />
        </div>
    )
}

export default ClassesTaken;