import React from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import JobDetailsClient from "./job-details-client";
import { getJobById, getApplicationStatus, getSavedStatus } from "@/lib/services/job";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: jobId } = await params;

    if (!jobId) {
        notFound();
    }

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id || null;

    // Use the Service Layer to fetch data
    const job = await getJobById(jobId);

    if (!job) {
        notFound();
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
