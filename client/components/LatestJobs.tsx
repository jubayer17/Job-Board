"use client";

import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import JobCard from './JobCard'
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
}

export default function LatestJobs() {
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
                const latest = (data as Job[]).slice(0, 9);
                if (active) setJobs(latest as Job[]);
            } catch (e: any) {
                if (active) setError(e.message || "Error loading jobs");
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; }
    }, []);

    if (loading) return <div className="py-24 text-center">Loading latest jobs...</div>;
    if (error) return <div className="py-24 text-center text-red-500">Error loading jobs</div>;

    const latestJobs = jobs || [];

    return (
        <section className="relative py-24 bg-white border-b border-gray-200 overflow-hidden">
            {/* Fine Diagonal Stripe Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
                        backgroundSize: '10px 10px'
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Unique Heading Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-gray-200 pb-8">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-gray-100 -z-10"></div>
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Opportunities</span>
                        </h2>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="h-1 w-12 bg-indigo-600"></div>
                            <div className="h-1 w-2 bg-gray-300"></div>
                            <div className="h-1 w-2 bg-gray-300"></div>
                        </div>
                        <p className="mt-4 text-lg text-gray-500 font-light max-w-xl">
                            Explore the most recent openings from top companies in Bangladesh.
                        </p>
                    </div>
                    <Link
                        href="/latest-jobs"
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300"
                    >
                        View All Jobs
                        <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 3x3 Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestJobs.map((job: Job) => (
                        <JobCard
                            key={job.id}
                            job={{
                                ...job,
                                posted: formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
