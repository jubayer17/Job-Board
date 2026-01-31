"use client";

import React from 'react'
import Link from 'next/link'
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, BriefcaseIcon, BookmarkIcon, ArrowRightIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";

import { formatDistanceToNow } from 'date-fns'

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
    salaryMax?: number;
}

export default function FeaturedJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await fetch("/api/jobs?sort=desc", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch jobs");
                const data = await res.json();
                const sorted = (data as Job[])
                    .sort((a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0))
                    .slice(0, 6);
                if (active) setJobs(sorted as Job[]);
            } catch (e: any) {
                if (active) setError(e.message || "Error loading jobs");
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; }
    }, []);

    if (loading) return <div className="py-24 text-center">Loading featured jobs...</div>;
    if (error) return <div className="py-24 text-center text-red-500">Error loading jobs</div>;

    const sortedJobs = jobs || [];

    return (
        <section className="relative py-24 bg-gray-50 border-b border-gray-200 overflow-hidden">
            {/* Background Texture - Dot Matrix */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Unique Heading Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-gray-200 pb-8">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-indigo-100 -z-10"></div>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Jobs</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="h-1 w-12 bg-purple-600"></div>
                            <div className="h-1 w-2 bg-gray-300"></div>
                            <div className="h-1 w-2 bg-gray-300"></div>
                        </div>
                        <p className="mt-4 text-lg text-gray-500 font-light max-w-xl">
                            High-paying opportunities from top-tier companies. Sorted by salary.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                            <FunnelIcon className="h-4 w-4" />
                            Sorted by Highest Salary
                        </div>
                        <Link
                            href="/featured-jobs"
                            className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-purple-600 transition-all duration-300"
                        >
                            View Featured
                            <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* 3x3 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedJobs.map((job: Job) => (
                        <div key={job.id} className="group relative bg-white border border-gray-200 p-8 hover:bg-purple-50 transition-all duration-300 hover:shadow-xl hover:border-purple-600">
                            {/* Hover Top Border */}
                            <div className="absolute top-0 left-0 w-0 h-1 bg-purple-600 transition-all duration-300 group-hover:w-full"></div>

                            {/* Featured Badge */}
                            <div className="absolute top-0 right-0">
                                <div className="bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    Featured
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-6 mt-4">
                                <div className="h-14 w-14 bg-white border border-gray-200 flex items-center justify-center font-bold text-xl text-gray-900 shadow-sm group-hover:border-purple-600 transition-colors">
                                    {job.logo}
                                </div>
                                <span className="inline-flex items-center px-2.5 py-1 border border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide bg-gray-50">
                                    {job.type}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                                    {job.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    <BriefcaseIcon className="h-4 w-4" />
                                    <span>{job.company}</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-gray-900">
                                    <CurrencyDollarIcon className="h-4 w-4 text-purple-600" />
                                    <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <ClockIcon className="h-4 w-4 text-gray-400" />
                                    <span>{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {job.tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="inline-flex items-center px-2 py-1 bg-white text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-gray-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <Link href={`/jobs/${job.id}`} className="flex-1 py-3 bg-white border border-gray-900 text-gray-900 text-center text-xs font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300">
                                    Apply Now
                                </Link>
                                <button className="p-3 text-gray-400 hover:text-purple-600 border border-gray-200 hover:border-purple-600 transition-all duration-300">
                                    <BookmarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
