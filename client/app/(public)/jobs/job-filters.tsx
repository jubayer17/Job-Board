"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const JOB_TYPES = ["All Types", "Full-time", "Part-time", "Contract", "Internship", "Remote"];

interface JobFiltersProps {
    locations: string[];
}

function JobFiltersComponent({ locations }: JobFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initial state from URL
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [type, setType] = useState(searchParams.get("type") || "All Types");
    const [location, setLocation] = useState(searchParams.get("location") || "All Locations");
    const [sort, setSort] = useState(searchParams.get("sort") || "desc");

    // Debounce search input to avoid too many URL updates
    const [debouncedSearch] = useDebounce(search, 300);

    // Optimize handlers with useCallback
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    }, []);

    const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(e.target.value);
    }, []);

    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    }, []);

    // Sync state from URL (Handles Back/Forward navigation)
    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        const urlType = searchParams.get("type") || "All Types";
        const urlLocation = searchParams.get("location") || "All Locations";
        const urlSort = searchParams.get("sort") || "desc";

        if (urlSearch !== search) setSearch(urlSearch);
        if (urlType !== type) setType(urlType);
        if (urlLocation !== location) setLocation(urlLocation);
        if (urlSort !== sort) setSort(urlSort);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]); // Only run when URL changes

    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        let hasChanges = false;

        // Helper to update params and track changes
        const updateParam = (key: string, value: string, defaultValue: string = "") => {
            const current = params.get(key) || defaultValue;
            if (value && value !== defaultValue) {
                if (current !== value) {
                    params.set(key, value);
                    hasChanges = true;
                }
            } else {
                if (params.has(key)) {
                    params.delete(key);
                    hasChanges = true;
                }
            }
        };

        // Check if the current state differs from the URL params
        // We compare against the *current* params to avoid redundant pushes
        const currentSearch = params.get("search") || "";
        if (debouncedSearch !== currentSearch) {
            if (debouncedSearch) params.set("search", debouncedSearch);
            else params.delete("search");
            hasChanges = true;
        }

        const currentType = params.get("type") || "All Types";
        if (type !== currentType) {
            if (type !== "All Types") params.set("type", type);
            else params.delete("type");
            hasChanges = true;
        }

        const currentLocation = params.get("location") || "All Locations";
        if (location !== currentLocation) {
            if (location !== "All Locations") params.set("location", location);
            else params.delete("location");
            hasChanges = true;
        }

        const currentSort = params.get("sort") || "desc";
        if (sort !== currentSort) {
            if (sort !== "desc") params.set("sort", sort);
            else params.delete("sort");
            hasChanges = true;
        }

        if (hasChanges) {
            router.push(`/jobs?${params.toString()}`);
        }
    }, [debouncedSearch, type, location, sort, router, searchParams]);

    // Memoize options to prevent unnecessary re-renders of child elements
    const jobTypeOptions = useMemo(() => JOB_TYPES.map((t) => (
        <option key={t} value={t}>{t}</option>
    )), []);

    const locationOptions = useMemo(() => (
        <>
            <option value="All Locations">All Locations</option>
            {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
            ))}
        </>
    ), [locations]);

    return (
        <div className="bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Title */}
                <div className="relative md:col-span-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-none bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all shadow-sm text-gray-900"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Job Type Dropdown */}
                <div className="relative md:col-span-1">
                    <select
                        className="block w-full pl-3 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none text-gray-900 bg-white shadow-sm transition-all"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        {jobTypeOptions}
                    </select>
                </div>

                {/* Location Dropdown */}
                <div className="relative md:col-span-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <select
                        className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none text-gray-900 bg-white shadow-sm transition-all"
                        value={location}
                        onChange={handleLocationChange}
                    >
                        {locationOptions}
                    </select>
                </div>

                {/* Sort Dropdown */}
                <div className="relative md:col-span-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                        </svg>
                    </div>
                    <select
                        className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-none text-gray-900 bg-white shadow-sm transition-all"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

// Memoize the component to prevent re-renders when parent re-renders but props haven't changed
export default React.memo(JobFiltersComponent, (prevProps, nextProps) => {
    // Custom comparison for locations array to prevent re-renders on reference change
    if (prevProps.locations.length !== nextProps.locations.length) return false;
    return prevProps.locations.every((loc, i) => loc === nextProps.locations[i]);
});
