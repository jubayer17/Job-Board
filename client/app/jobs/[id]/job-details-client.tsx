"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { JobWithPoster } from "@/lib/services/job";
import { HeaderCard } from "@/components/job-details/HeaderCard";
import { DescriptionCard } from "@/components/job-details/DescriptionCard";
import { ResponsibilitiesCard } from "@/components/job-details/ResponsibilitiesCard";
import { JobOverviewCard } from "@/components/job-details/JobOverviewCard";
import { HiringManagerCard } from "@/components/job-details/HiringManagerCard";

interface JobDetailsClientProps {
    job: JobWithPoster;
    initialApplicationStatus: string | null;
    currentUserId: string | null;
}

export default function JobDetailsClient({ job, initialApplicationStatus, currentUserId }: JobDetailsClientProps) {
    const [status, setStatus] = useState<string | null>(initialApplicationStatus);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleApply = async () => {
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
                        <DescriptionCard description={job.description} />
                        <ResponsibilitiesCard />
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <JobOverviewCard
                                job={job}
                                status={status}
                                isLoading={isLoading}
                                handleApply={handleApply}
                            />
                            <HiringManagerCard postedBy={job.postedBy} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
