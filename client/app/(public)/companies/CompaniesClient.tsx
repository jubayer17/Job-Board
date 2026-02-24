"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CompanySummary } from "@/lib/services/company";
import { ArrowLeftIcon, BuildingOffice2Icon, MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import JobCard, { Job as JobCardType } from "@/components/JobCard";
import { formatDistanceToNow } from "date-fns";

type Props = { companies: CompanySummary[] };

type CompanyJobsResponse = Array<{
    id: string;
    title: string;
    type: string;
    location: string;
    salaryMin: number | null;
    salaryMax: number | null;
    postedAt: string;
    description: string;
    company: string;
    logo: string | null;
    tags: string[];
}>;

export default function CompaniesClient({ companies }: Props) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [jobsCache, setJobsCache] = useState<Record<string, CompanyJobsResponse>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedCompany = useMemo(
        () => companies.find((c) => c.id === selectedId) || null,
        [companies, selectedId]
    );

    const handleSelect = useCallback(async (id: string) => {
        setSelectedId(id);
    }, []);

    useEffect(() => {
        const loadJobs = async () => {
            if (!selectedId || jobsCache[selectedId]) return;
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/companies/${selectedId}/jobs?limit=9`, {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                });
                if (!res.ok) throw new Error("Failed to load jobs");
                const data: CompanyJobsResponse = await res.json();
                setJobsCache((prev) => ({ ...prev, [selectedId]: data }));
            } catch (e: any) {
                setError(e.message || "Failed to load jobs");
            } finally {
                setLoading(false);
            }
        };
        loadJobs();
    }, [selectedId, jobsCache]);

    if (!selectedCompany) {
        return (
            <section aria-labelledby="companies-heading">
                <h2 id="companies-heading" className="sr-only">Companies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleSelect(c.id)}
                            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(c.id)}
                            aria-label={`View jobs at ${c.name}`}
                            className="group text-left bg-white border border-gray-200 p-6 hover:border-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-none"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                                    {c.latestLogo ? (
                                        <Image
                                            src={c.latestLogo}
                                            alt={`${c.name} logo`}
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                            className="object-contain"
                                        />
                                    ) : (
                                        <BuildingOffice2Icon className="w-6 h-6 text-gray-300" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {c.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2 mt-1">
                                        {c.industry ? (
                                            <>
                                                <BriefcaseIcon className="h-4 w-4" /> {c.industry}
                                            </>
                                        ) : "—"}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                                <MapPinIcon className="h-4 w-4" />
                                {c.location || "Remote / Various"}
                            </div>
                            {c.description && (
                                <p className="mt-4 text-sm text-gray-600 line-clamp-3">{c.description}</p>
                            )}
                            <div className="mt-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                {c.jobsCount} Open {c.jobsCount === 1 ? "Role" : "Roles"} &rarr;
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        );
    }

    const jobs = jobsCache[selectedCompany.id] || [];
    const mappedJobs: JobCardType[] = jobs.map((j) => ({
        id: j.id,
        title: j.title,
        company: selectedCompany.name,
        location: j.location,
        type: j.type,
        salary: j.salaryMax ? `$${j.salaryMin ?? 0} - $${j.salaryMax}` : "Competitive",
        logo: j.logo || selectedCompany.latestLogo || "🏢",
        tags: j.tags || [],
        posted: formatDistanceToNow(new Date(j.postedAt), { addSuffix: true }),
        salaryMax: j.salaryMax ?? undefined,
    }));

    return (
        <section aria-labelledby="company-jobs-heading">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 id="company-jobs-heading" className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                        {selectedCompany.name} • Open Roles
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedCompany.industry || "Various Industries"}</p>
                </div>
                <button
                    onClick={() => setSelectedId(null)}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider hover:border-gray-900 hover:text-gray-900 transition-colors rounded-none"
                    aria-label="Back to companies"
                >
                    <ArrowLeftIcon className="h-4 w-4" /> Back
                </button>
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="h-60 bg-gray-100 animate-pulse border border-gray-200" />
                    ))}
                </div>
            )}

            {error && !loading && (
                <div className="p-6 bg-red-50 border border-red-100 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {!loading && !error && (
                jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mappedJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 border border-gray-200 bg-white text-center">
                        <p className="font-bold text-gray-900">No open roles currently.</p>
                        <p className="text-sm text-gray-500 mt-2">Check back soon for new positions.</p>
                    </div>
                )
            )}
        </section>
    );
}

