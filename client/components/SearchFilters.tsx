"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { BD_DIVISIONS, type Division, type District, type Upazila } from '@/lib/data/bd-locations';

export default function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for filter inputs
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [type, setType] = useState(searchParams.get('type') || '');

    // Location State
    const [selectedDivision, setSelectedDivision] = useState<string>(searchParams.get('division') || '');
    const [selectedDistrict, setSelectedDistrict] = useState<string>(searchParams.get('district') || '');
    const [selectedUpazila, setSelectedUpazila] = useState<string>(searchParams.get('upazila') || '');

    // Sorting State
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    // Derived Data for Cascading Dropdowns
    const districts = useMemo(() => {
        const div = BD_DIVISIONS.find(d => d.name === selectedDivision);
        return div ? div.districts : [];
    }, [selectedDivision]);

    const upazilas = useMemo(() => {
        const dist = districts.find(d => d.name === selectedDistrict);
        return dist ? dist.upazilas : [];
    }, [districts, selectedDistrict]);

    // Handle Click Outside for Sort Dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update URL with Debounce for Text Input
    const debouncedUpdate = useDebouncedCallback((params: URLSearchParams) => {
        router.push(`?${params.toString()}`);
    }, 500);

    // Immediate Update for Selects
    const updateFilters = useCallback(() => {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (type && type !== 'All Types') params.set('type', type);
        if (sort) params.set('sort', sort);

        // Location Logic: Construct a single location string for the backend search
        // Also keep individual params for state persistence if needed, 
        // but typically search engines want a single 'location' query or specific fields.
        // Assuming backend searches 'location' field:
        const parts = [];
        if (selectedUpazila) parts.push(selectedUpazila);
        if (selectedDistrict) parts.push(selectedDistrict);
        if (selectedDivision) parts.push(selectedDivision);

        if (parts.length > 0) {
            params.set('location', parts.join(', '));
            // We also save individual fields to persist state on reload
            if (selectedDivision) params.set('division', selectedDivision);
            if (selectedDistrict) params.set('district', selectedDistrict);
            if (selectedUpazila) params.set('upazila', selectedUpazila);
        }

        // Prevent pushing if nothing changed (handled by router usually but good to check)
        // For debounce we use a different function, for selects we push immediately
        router.push(`?${params.toString()}`);
    }, [search, type, sort, selectedDivision, selectedDistrict, selectedUpazila, router]);

    // Effect to trigger updates when selects change (excluding search text which is debounced)
    // We separate search text to avoid double triggering
    useEffect(() => {
        // This effect runs on select changes
        const params = new URLSearchParams(searchParams.toString());

        // Update params based on current state
        if (type && type !== 'All Types') params.set('type', type); else params.delete('type');
        if (sort) params.set('sort', sort); else params.delete('sort');

        // Location
        const parts = [];
        if (selectedUpazila) parts.push(selectedUpazila);
        if (selectedDistrict) parts.push(selectedDistrict);
        if (selectedDivision) parts.push(selectedDivision);

        if (parts.length > 0) {
            params.set('location', parts.join(', '));
            if (selectedDivision) params.set('division', selectedDivision); else params.delete('division');
            if (selectedDistrict) params.set('district', selectedDistrict); else params.delete('district');
            if (selectedUpazila) params.set('upazila', selectedUpazila); else params.delete('upazila');
        } else {
            params.delete('location');
            params.delete('division');
            params.delete('district');
            params.delete('upazila');
        }

        // Search is handled separately via debounce, but we need to preserve it
        if (search) params.set('search', search); else params.delete('search');

        // Compare with current URL to avoid redundant pushes
        if (params.toString() !== searchParams.toString()) {
            router.push(`?${params.toString()}`);
        }
    }, [type, sort, selectedDivision, selectedDistrict, selectedUpazila]); // Removed search from dependency to avoid loop with debounce

    // Handle Search Input Change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearch(val);

        // Create params for debounce
        const params = new URLSearchParams(searchParams.toString());
        if (val) params.set('search', val); else params.delete('search');
        debouncedUpdate(params);
    };

    // Cascading Handlers
    const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDivision(e.target.value);
        setSelectedDistrict('');
        setSelectedUpazila('');
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila('');
    };

    const clearAll = () => {
        setSearch('');
        setType('');
        setSelectedDivision('');
        setSelectedDistrict('');
        setSelectedUpazila('');
        setSort('newest');
        router.push('?');
    };

    return (
        <div className="w-full mb-8 space-y-4">
            {/* Row 1: Search Input & Sort Button */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input (70% on desktop) */}
                <div className="relative flex-grow md:w-[70%] group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search for jobs, skills, or companies..."
                        className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-none text-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                    />
                </div>

                {/* Filter/Sort Button */}
                <div className="relative md:w-[30%]" ref={sortRef}>
                    <button
                        type="button"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full h-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-none hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-sm font-medium text-gray-700"
                    >
                        <div className="flex items-center gap-2">
                            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
                            <span>Sort: {sort === 'newest' ? 'Newly Added' : sort === 'salary_high' ? 'Salary: High to Low' : sort === 'salary_low' ? 'Salary: Low to High' : 'Relevance'}</span>
                        </div>
                        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Sort Dropdown */}
                    {isSortOpen && (
                        <div className="absolute right-0 top-full mt-2 w-full z-20 bg-white border border-gray-200 rounded-none shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100">
                            {[
                                { label: 'Newly Added', value: 'newest' },
                                { label: 'Salary: High to Low', value: 'salary_high' },
                                { label: 'Salary: Low to High', value: 'salary_low' },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSort(option.value);
                                        setIsSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sort === option.value ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Row 2: Cascading Filters (4 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Column 1: Job Type */}
                <div className="relative">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="block w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-none text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="">All Job Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Column 2: Division */}
                <div className="relative">
                    <select
                        value={selectedDivision}
                        onChange={handleDivisionChange}
                        className="block w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="">All Divisions</option>
                        {BD_DIVISIONS.map((div) => (
                            <option key={div.name} value={div.name}>{div.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Column 3: District */}
                <div className="relative">
                    <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedDivision}
                        className={`block w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm appearance-none ${!selectedDivision ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <option value="">All Districts</option>
                        {districts.map((dist) => (
                            <option key={dist.name} value={dist.name}>{dist.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Column 4: Area/Upazila */}
                <div className="relative">
                    <select
                        value={selectedUpazila}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                        disabled={!selectedDistrict}
                        className={`block w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm appearance-none ${!selectedDistrict ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <option value="">All Areas</option>
                        {upazilas.map((up) => (
                            <option key={up.name} value={up.name}>{up.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {(search || type || selectedDivision || sort !== 'newest') && (
                <div className="flex flex-wrap items-center gap-2 pt-2 animate-in fade-in slide-in-from-top-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">Active Filters:</span>

                    {selectedDivision && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-none text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {selectedUpazila ? `${selectedUpazila}, ` : ''}{selectedDistrict ? `${selectedDistrict}, ` : ''}{selectedDivision}
                            <button onClick={() => { setSelectedDivision(''); setSelectedDistrict(''); setSelectedUpazila(''); }} className="ml-1.5 text-indigo-400 hover:text-indigo-600">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    {type && type !== 'All Types' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-none text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {type}
                            <button onClick={() => setType('')} className="ml-1.5 text-blue-400 hover:text-blue-600">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    {sort !== 'newest' && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-none text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                            Sort: {sort === 'salary_high' ? 'High Salary' : 'Low Salary'}
                            <button onClick={() => setSort('newest')} className="ml-1.5 text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    <button
                        onClick={clearAll}
                        className="text-xs text-gray-500 hover:text-red-600 font-medium ml-auto transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            )}
        </div>
    );
}
