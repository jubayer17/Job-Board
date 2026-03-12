import React from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
    MapPinIcon,
    BriefcaseIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    ArrowRightIcon,
    HeartIcon,
    ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
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
    isSaved: boolean;
    handleSave: () => void;
}

export const JobOverviewCard = ({ job, status, isLoading, handleApply, isSaved, handleSave }: JobOverviewCardProps) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: job.title,
                    text: `Check out this job: ${job.title} at ${job.company}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const formattedSalary = job.salary || (
        job.salaryMin && job.salaryMax
            ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
            : job.salaryMin
                ? `From $${job.salaryMin.toLocaleString()}`
                : "Negotiable"
    );

    return (
        <div className="bg-white border border-gray-200 p-6 shadow-lg shadow-indigo-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 blur-xl" />

            <h3 className="text-lg font-bold text-gray-900 mb-6">Job Overview</h3>

            <div className="mb-8">
                <DetailRow icon={CurrencyDollarIcon} label="Salary" value={formattedSalary} />
                <DetailRow icon={BriefcaseIcon} label="Job Type" value={job.type} />
                <DetailRow icon={BriefcaseIcon} label="Vacancies" value={job.vacancies?.toString() || null} />
                <DetailRow icon={BriefcaseIcon} label="Experience" value={job.experience} />
                <DetailRow icon={BriefcaseIcon} label="Workplace" value={job.workplace} />
                <DetailRow icon={BriefcaseIcon} label="Gender" value={job.gender} />
                <DetailRow icon={BriefcaseIcon} label="Level" value={job.level} />
                {job.deadline && (
                    <DetailRow icon={CalendarIcon} label="Deadline" value={format(new Date(job.deadline), "MMM d, yyyy")} />
                )}

                <DetailRow icon={MapPinIcon} label="Location" value={job.location} />
                <DetailRow icon={CalendarIcon} label="Posted" value={format(new Date(job.postedAt), "MMM d, yyyy")} />
            </div>

            <div className="space-y-4">
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

                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest border border-gray-200 transition-all duration-300 hover:bg-gray-50 ${isSaved ? "text-red-500 border-red-200 bg-red-50" : "text-gray-600"}`}
                    >
                        {isSaved ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                        {isSaved ? "Saved" : "Save"}
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-300"
                    >
                        <ShareIcon className="w-5 h-5" />
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};
