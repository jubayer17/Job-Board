import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getJobs, getUniqueLocations } from "@/lib/services/job";
import JobFilters from "./job-filters";

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Available Jobs
                    </h2>
                    <p className="mt-1 text-gray-500">
                        Browse the latest opportunities from top companies.
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <Link
                        href="/jobs/post"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                    >
                        Post a Job
                    </Link>
                </div>
            </div>

            {/* Client Component for Filtering */}
            <JobFilters locations={locations} />

            {/* Server Rendered Job List */}
            <div className="space-y-4">
                {jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
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
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No jobs found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Try adjusting your search or filters.
                        </p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                            {job.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{job.company}</p>
                                        </div>
                                    </div>
                                    {job.salary && (
                                        <div className="hidden md:block">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {job.salary}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex space-x-4">
                                        <div className="flex items-center">
                                            <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                            </svg>
                                            {job.type}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
