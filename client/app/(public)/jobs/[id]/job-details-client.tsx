"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { JobWithPoster } from "@/lib/services/job";
import { HeaderCard } from "./_components/HeaderCard";
import { InfoCard } from "./_components/InfoCard";
import { JobOverviewCard } from "./_components/JobOverviewCard";
import { HiringManagerCard } from "./_components/HiringManagerCard";

interface JobDetailsClientProps {
    job: JobWithPoster;
    initialApplicationStatus: string | null;
    initialSavedStatus: boolean;
    currentUserId: string | null;
}

export default function JobDetailsClient({ job, initialApplicationStatus, initialSavedStatus, currentUserId }: JobDetailsClientProps) {
    const [status, setStatus] = useState<string | null>(initialApplicationStatus);
    const [isSaved, setIsSaved] = useState(initialSavedStatus);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleApply = async () => {
        if (job.applyLink) {
            window.open(job.applyLink, "_blank");
            return;
        }

        if (!currentUserId) return window.location.href = "/auth/sign-in";
        if (status) return toast.error("You have already applied to this job");

        setIsLoading(true);
        try {
            const res = await fetch(`/api/jobs/${job.id}/apply`, { method: "POST" });
            const data = await res.json();

            if (res.ok) {
                setStatus(data.status || "PENDING");
                toast.success("Application submitted successfully!");
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Failed to submit application");
            }
        } catch (error) {
            console.error("Error applying to job:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!currentUserId) return window.location.href = "/auth/sign-in";
        try {
            const res = await fetch(`/api/jobs/${job.id}/save`, { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setIsSaved(data.saved);
                toast.success(data.saved ? "Job saved!" : "Job removed from saved list.");
            } else {
                toast.error(data.error || "Failed to save job");
            }
        } catch (error) {
            console.error("Error saving job:", error);
            toast.error("An error occurred.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden h-[500px]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <HeaderCard job={job} />
                        <InfoCard title="Job Context" content={job.jobContext} />
                        <InfoCard title="Job Description" content={job.description} />
                        <InfoCard title="Key Responsibilities" content={job.responsibilities} />
                        <InfoCard title="Skills Required" content={job.skills && job.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : null} />
                        <InfoCard title="Education Requirements" content={job.education} />
                        <InfoCard title="Compensation & Benefits" content={
                            job.benefits && job.benefits.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            ) : null
                        } />
                        <InfoCard title="About the Company" content={
                            job.companyRelation ? (
                                <div className="space-y-4">
                                    <p className="text-gray-600 leading-relaxed">{job.companyRelation.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                                        <div>
                                            <span className="text-gray-500 block text-xs uppercase tracking-wide mb-1">Industry</span>
                                            <span className="font-semibold text-gray-900">{job.companyRelation.industryType || "N/A"}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block text-xs uppercase tracking-wide mb-1">Website</span>
                                            {job.companyRelation.websiteUrl ? (
                                                <a
                                                    href={job.companyRelation.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline break-all"
                                                >
                                                    {job.companyRelation.websiteUrl}
                                                </a>
                                            ) : <span className="text-gray-400">Not available</span>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <span className="text-gray-500 block text-xs uppercase tracking-wide mb-1">Address</span>
                                            <span className="font-semibold text-gray-900">{job.companyRelation.address || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        } />
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <JobOverviewCard
                                job={job}
                                status={status}
                                isLoading={isLoading}
                                handleApply={handleApply}
                                isSaved={isSaved}
                                handleSave={handleSave}
                            />
                            <HiringManagerCard employer={job.employer} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
