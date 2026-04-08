import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import JobDetailsClient from "./job-details-client";
import { getJobById, getApplicationStatus, getSavedStatus } from "@/lib/services/job";
import { isUuidV4, normalizeJobId } from "@/lib/routing/jobId";

export default async function JobPage({ params }: { params: { id?: string } | Promise<{ id?: string }> }) {
    const resolvedParams = await params;
    const jobId = normalizeJobId(resolvedParams?.id);

    if (!jobId) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white border border-gray-200 p-6">
                    <h1 className="text-lg font-bold text-gray-900">Invalid job link</h1>
                    <p className="text-sm text-gray-600 mt-2">No job ID was provided in the URL.</p>
                </div>
            </div>
        );
    }

    if (!isUuidV4(jobId)) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white border border-gray-200 p-6">
                    <h1 className="text-lg font-bold text-gray-900">Invalid job ID format</h1>
                    <p className="text-sm text-gray-600 mt-2">The provided job ID is not a valid UUID.</p>
                </div>
            </div>
        );
    }

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id || null;

    // Use the Service Layer to fetch data
    const job = await getJobById(jobId);

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white border border-gray-200 p-6">
                    <h1 className="text-lg font-bold text-gray-900">Job not found</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        This job may have been removed or the link is incorrect.
                    </p>
                </div>
            </div>
        );
    }

    let initialApplicationStatus = null;
    let initialSavedStatus = false;

    if (currentUserId) {
        initialApplicationStatus = await getApplicationStatus(jobId, currentUserId);
        initialSavedStatus = await getSavedStatus(jobId, currentUserId);
    }

    return (
        <JobDetailsClient
            job={job}
            initialApplicationStatus={initialApplicationStatus}
            initialSavedStatus={initialSavedStatus}
            currentUserId={currentUserId}
        />
    );
}
