"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JobCard from '@/components/JobCard';
import SearchFilters from '@/components/SearchFilters';
import { formatDistanceToNow } from 'date-fns';

// Define the Job interface matching the API response and LatestJobs.tsx
interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    logo: string;
    tags: string[];
    postedAt: string | Date;
    salaryMax?: number; // API returns this
}

function FeaturedJobsContent() {
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                // Construct query string from searchParams
                const params = new URLSearchParams(searchParams.toString());

                // Ensure we ask for sorted data if not specified
                if (!params.has("sort")) {
                    params.set("sort", "desc");
                }

                console.log("Fetching jobs with params:", params.toString());
                const res = await fetch(`/api/jobs?${params.toString()}`, { cache: "no-store" });

                if (!res.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                const data = await res.json();

                // Sort by salaryMax descending to ensure "Featured" feel (high paying first)
                const sortedJobs = (data as Job[]).sort((a, b) => {
                    const salaryA = a.salaryMax || 0;
                    const salaryB = b.salaryMax || 0;
                    return salaryB - salaryA;
                });

                setJobs(sortedJobs);
            } catch (err: any) {
                console.error("Error fetching jobs:", err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [searchParams]);

    return (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-200 pb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900">Featured Jobs</h2>
                    <p className="text-gray-500 mt-2">Top roles curated for you</p>
                </div>
                <div className="text-sm text-gray-500">
                    Showing {jobs.length} jobs
                </div>
            </div>

            {/* Reusable Sharp Search Filters */}
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
                <div className="text-center py-20 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 uppercase">No Jobs Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters to see more results.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            variant="featured"
                            job={{
                                id: job.id,
                                title: job.title,
                                company: job.company,
                                location: job.location,
                                type: job.type,
                                salary: job.salary || "Competitive",
                                logo: job.logo || "🏢", // Fallback logo
                                tags: job.tags || [],
                                posted: formatDistanceToNow(new Date(job.postedAt), { addSuffix: true }),
                                salaryMax: job.salaryMax,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FeaturedJobsPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-24">
            <Suspense fallback={<div className="text-center py-20">Loading filters...</div>}>
                <FeaturedJobsContent />
            </Suspense>
        </main>
    );
}
