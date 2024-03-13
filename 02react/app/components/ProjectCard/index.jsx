"use client"

import React from "react";
import Link from 'next/link'

const ProjectCard = ({
    projectName,
    projectPath,
    projectDesc
}) => (
    // <Link href={`/detail?projectName=${projectPath}`}>
    <Link href={`/detail/${projectPath}`}>
        <div className="cursor-pointer p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-x-4">
            <div className="text-xl font-medium text-black">{projectName}</div>
            <p className="text-slate-500">{projectDesc}</p>
        </div>
    </Link>
);

export default ProjectCard;
