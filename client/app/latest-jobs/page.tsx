import React, { Suspense } from "react";
import { getJobs } from "@/lib/services/job";
import JobCard from "@/components/JobCard";
import SearchFilters from "@/components/SearchFilters";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LatestJobsPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;

    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
    const type = typeof searchParams.type === "string" ? searchParams.type : undefined;
    const location = typeof searchParams.location === "string" ? searchParams.location : undefined;
    const minSalary = typeof searchParams.minSalary === "string" ? parseInt(searchParams.minSalary) : undefined;
    const maxSalary = typeof searchParams.maxSalary === "string" ? parseInt(searchParams.maxSalary) : undefined;
    const sort = typeof searchParams.sort === "string" && (searchParams.sort === "asc" || searchParams.sort === "desc") ? searchParams.sort : "desc";

    const jobs = await getJobs({
        search,
        type,
        location,
        sort,
        minSalary,
        maxSalary
    });

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-24">
            {/* Unique Heading Section */}
            <section className="relative bg-white border-b border-gray-200 py-16 mb-12">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-100 blur-3xl opacity-50"></div>
                    <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-indigo-100 blur-3xl opacity-50"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
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

            <div className="container mx-auto px-4">
                {/* Search Filters */}
                <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse rounded-lg mb-10"></div>}>
                    <SearchFilters />
                </Suspense>

                {/* Grid Section */}
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

                {jobs.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
