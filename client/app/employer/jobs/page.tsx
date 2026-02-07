"use client";

import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import JobCard from "../_components/JobCard";
import { GET_EMPLOYER_JOBS } from "@/lib/graphql/queries";
import { useState } from "react";

export default function JobsPage() {
    const { data: session } = useSession();
    const { data, loading, error } = useQuery(GET_EMPLOYER_JOBS, {
        variables: { userId: session?.user?.id || "" },
        skip: !session?.user?.id,
        fetchPolicy: "network-only",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-none w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-40 bg-gray-200 rounded-none"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto text-center py-12">
                <div className="bg-red-50 p-4 rounded-none inline-block border border-red-100">
                    <p className="text-red-700">Error loading jobs: {error.message}</p>
                </div>
            </div>
        );
    }

    const jobs = (data as any)?.myJobs || [];

    const filteredJobs = jobs.filter((job: any) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || job.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Jobs</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your job postings and view applicants
                    </p>
                </div>
                <Link
                    href="/employer/jobs/create"
                    className="inline-flex items-center justify-center rounded-none bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase tracking-wide"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Post New Job
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 shadow-sm rounded-none border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-none leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <select
                        className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Job List */}
            {filteredJobs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-none border border-gray-200 border-dashed">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No jobs found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm || filterStatus !== 'all' ? "Try adjusting your search or filters." : "Get started by creating a new job posting."}
                    </p>
                    {!searchTerm && filterStatus === 'all' && (
                        <div className="mt-6">
                            <Link
                                href="/employer/jobs/create"
                                className="inline-flex items-center rounded-none bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase tracking-wide"
                            >
                                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                Post New Job
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredJobs.map((job: any) => (
                        <JobCard
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            type={job.type}
                            location={job.location}
                            postedAt={new Date(job.postedAt).toLocaleDateString()}
                            applicantsCount={job.applicantsCount}
                            status={job.status as 'active' | 'closed' | 'draft'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
