import React from "react";
import { format } from "date-fns";
import {
    MapPinIcon,
    BriefcaseIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { JobWithPoster } from "@/lib/services/job";

const DetailRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
            <div className="p-2 bg-gray-50 rounded-lg">
                <Icon className="w-5 h-5 text-gray-500" />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

interface JobOverviewCardProps {
    job: JobWithPoster;
    status: string | null;
    isLoading: boolean;
    handleApply: () => void;
}

export const JobOverviewCard = ({ job, status, isLoading, handleApply }: JobOverviewCardProps) => {
    return (
        <div className="bg-white border border-gray-200 p-6 shadow-lg shadow-indigo-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 blur-xl" />

            <h3 className="text-lg font-bold text-gray-900 mb-6">Job Overview</h3>

            <div className="mb-8">
                <DetailRow icon={CurrencyDollarIcon} label="Salary" value={job.salary} />
                <DetailRow icon={BriefcaseIcon} label="Job Type" value={job.type} />
                <DetailRow icon={MapPinIcon} label="Location" value={job.location} />
                <DetailRow icon={CalendarIcon} label="Posted" value={format(new Date(job.postedAt), "MMM d, yyyy")} />
            </div>

            <button
                onClick={status ? undefined : handleApply}
                disabled={!!status || isLoading}
                className={`w-full py-4 px-6 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${status
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
                    }`}
            >
                {status ? (
                    <span>{status === "PENDING" ? "Application Sent" : status}</span>
                ) : (
                    <>
                        {isLoading ? "Processing..." : "Apply Now"}
                        {!isLoading && <ArrowRightIcon className="w-4 h-4" />}
                    </>
                )}
            </button>
        </div>
    );
};
