import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { getJobs, getUniqueLocations } from "@/lib/services/job";
import JobFilters from "./job-filters";
import SearchedJobCard from "@/components/SearchedJobCard";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function JobsPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;

    // Extract filters from searchParams
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
    const location = typeof searchParams.location === 'string' ? searchParams.location : undefined;
    const sort = searchParams.sort === 'asc' ? 'asc' : 'desc';

    // Fetch data in parallel
    const [jobs, locations] = await Promise.all([
        getJobs({ search, type, location, sort }),
        getUniqueLocations()
    ]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-gray-200 pb-8 relative">
                    <div className="relative">
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
                            Searched <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Jobs</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="h-1 w-12 bg-indigo-600"></div>
                            <div className="h-1 w-2 bg-gray-300"></div>
                            <div className="h-1 w-2 bg-gray-300"></div>
                        </div>
                        <p className="mt-4 text-lg text-gray-600 font-medium max-w-xl">
                            Discover your next career move with our curated selection.
                        </p>
                    </div>
                    <Link
                        href="/jobs/post"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-sm rounded-lg"
                    >
                        Post a Job
                        <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Client Component for Filtering */}
                <div className="mb-12">
                    <JobFilters locations={locations} />
                </div>

                {/* Server Rendered Job Grid */}
                <div className="mt-8">
                    {jobs.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl shadow-sm">
                            <div className="bg-gray-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
                                <svg
                                    className="h-10 w-10 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No jobs found</h3>
                            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                                We couldn't find any matches for your search. Try adjusting your filters or keywords.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map((job) => (
                                <SearchedJobCard
                                    key={job.id}
                                    job={{
                                        id: job.id,
                                        title: job.title,
                                        company: job.company,
                                        location: job.location,
                                        type: job.type,
                                        salary: job.salary || "Negotiable",
                                        logo: job.logo || "",
                                        tags: job.tags,
                                        posted: formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
