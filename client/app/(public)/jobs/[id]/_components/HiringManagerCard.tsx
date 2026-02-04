import React from "react";
import { JobWithPoster } from "@/lib/services/job";

interface HiringManagerCardProps {
    employer: JobWithPoster['employer'];
}

export const HiringManagerCard = ({ employer }: HiringManagerCardProps) => {
    return (
        <div className="bg-gray-900 text-white p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Hiring Manager</h4>
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg">
                    {employer?.contactName?.[0] || "U"}
                </div>
                <div>
                    <p className="font-bold text-white">{employer?.contactName || "Confidential"}</p>
                    <p className="text-xs text-gray-400 mt-1">Recruitment Team</p>
                </div>
            </div>
            {employer?.contactEmail && (
                <a
                    href={`mailto:${employer.contactEmail}`}
                    className="mt-6 block w-full py-2 text-center border border-gray-700 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-colors"
                >
                    Contact
                </a>
            )}
        </div>
    );
};
