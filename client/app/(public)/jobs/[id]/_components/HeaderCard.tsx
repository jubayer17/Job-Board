import React from "react";
import { format } from "date-fns";
import {
    MapPinIcon,
    CalendarIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { JobWithPoster } from "@/lib/services/job";

interface HeaderCardProps {
    job: JobWithPoster;
}

export const HeaderCard = ({ job }: HeaderCardProps) => {
    return (
        <div className="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 transition-all group-hover:w-2" />

            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="h-20 w-20 bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2">
                    {job.logo ? (
                        <img src={job.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <BuildingOffice2Icon className="w-10 h-10 text-gray-300" />
                    )}
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                        <span className="text-indigo-600 font-bold uppercase tracking-wide">{job.company}</span>
                        <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" /> Posted {format(new Date(job.postedAt), "MMM d, yyyy")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
