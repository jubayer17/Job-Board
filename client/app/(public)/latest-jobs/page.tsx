"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import JobCard from "@/components/JobCard";
import SearchFilters from "@/components/SearchFilters";
import { formatDistanceToNow } from "date-fns";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary?: string | null;
    logo?: string | null;
    tags: string[];
    postedAt: string | Date;
    salaryMax?: number | null;
}

function LatestJobsContent() {
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams(searchParams.toString());
                if (!params.has("sort")) {
                    params.set("sort", "desc");
                }

                const res = await fetch(`/api/jobs?${params.toString()}`, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed to fetch jobs");
                }
                const data = await res.json();
                setJobs(data as Job[]);
            } catch (err: any) {
                setError(err?.message || "Something went wrong");
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [searchParams]);

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-24">
            {/* Unique Heading Section */}
            <section className="relative bg-white border-b border-gray-200 py-16 mb-12">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-100 blur-3xl opacity-50"></div>
                    <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-indigo-100 blur-3xl opacity-50"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Opportunities</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Discover the most recent openings from top companies.
                            We update our listings hourly to ensure you never miss a career-changing opportunity.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Filters */}
                <SearchFilters />

                {loading ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        <h3 className="text-xl font-bold">Error loading jobs</h3>
                        <p>{error}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={{
                                    id: job.id,
                                    title: job.title,
                                    company: job.company,
                                    location: job.location,
                                    type: job.type,
                                    salary: job.salary || "Competitive",
                                    logo: job.logo || "🏢",
                                    tags: job.tags,
                                    posted: formatDistanceToNow(new Date(job.postedAt), { addSuffix: true }),
                                    salaryMax: job.salaryMax ?? undefined,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function LatestJobsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-24 pb-24" />}>
            <LatestJobsContent />
        </Suspense>
    );
}
