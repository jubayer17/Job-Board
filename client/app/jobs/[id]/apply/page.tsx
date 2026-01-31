import React from "react";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getJobById } from "@/lib/services/job";
import dynamic from "next/dynamic";

const ApplicationForm = dynamic(() => import("@/components/application-form"), {
    ssr: false,
    loading: () => <p>Loading application form…</p>,
});

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: jobId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect(`/auth/sign-in?callbackUrl=/jobs/${jobId}/apply`);
    }

    const job = await getJobById(jobId);

    if (!job) {
        notFound();
    }

    return <ApplicationForm job={job} user={session.user} />;
}
