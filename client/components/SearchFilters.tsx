"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    MagnifyingGlassIcon, MapPinIcon, BriefcaseIcon,
    CurrencyDollarIcon, FunnelIcon, XMarkIcon
} from '@heroicons/react/24/outline';

// Filter state interface
interface Filters {
    search: string;
    location: string;
    type: string;
    minSalary: string;
    maxSalary: string;
}

export default function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);

    // Initialize state from URL
    const [filters, setFilters] = useState<Filters>({
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        minSalary: searchParams.get('minSalary') || '',
        maxSalary: searchParams.get('maxSalary') || ''
    });

    // Update URL with new filters
    const updateUrl = useCallback((newFilters: Filters) => {
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value && value !== 'All Types') params.set(key, value);
        });

        const sort = searchParams.get('sort');
        if (sort) params.set('sort', sort);

        // Prevent redundant pushes to avoid loops
        params.sort();
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.sort();

        if (params.toString() !== currentParams.toString()) {
            router.push(`?${params.toString()}`);
        }
    }, [router, searchParams]);

    // Debounce text inputs (500ms)
    useEffect(() => {
        const timer = setTimeout(() => updateUrl(filters), 500);
        return () => clearTimeout(timer);
    }, [filters.search, filters.location, filters.minSalary, filters.maxSalary, updateUrl]);

    // Handlers
    const handleTypeChange = (val: string) => {
        const newFilters = { ...filters, type: val };
        setFilters(newFilters);
        updateUrl(newFilters); // Immediate update for dropdown
    };

    const handleChange = (key: keyof Filters, val: string) =>
        setFilters(prev => ({ ...prev, [key]: val }));

    const clearFilters = () => {
        const reset = { search: '', location: '', type: '', minSalary: '', maxSalary: '' };
        setFilters(reset);
        router.push('?');
    };

    const hasFilters = Object.values(filters).some(Boolean);

    return (
        <div className="w-full mb-10">
            <form onSubmit={(e) => { e.preventDefault(); updateUrl(filters); }}
                className="bg-white border border-gray-200 shadow-sm transition-all">

                {/* Main Inputs */}
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                    <Input icon={MagnifyingGlassIcon} value={filters.search}
                        onChange={(v) => handleChange('search', v)} placeholder="Job title, keywords..." />

                    <div className="lg:w-1/4">
                        <Input icon={MapPinIcon} value={filters.location}
                            onChange={(v) => handleChange('location', v)} placeholder="Location" />
                    </div>

                    <div className="flex items-center p-2 bg-gray-50 lg:bg-transparent">
                        <button type="button" onClick={() => setIsExpanded(!isExpanded)}
                            className={`p-3 mr-2 text-gray-500 hover:text-indigo-600 transition-colors ${isExpanded ? 'bg-gray-100 text-indigo-600' : ''}`}>
                            <FunnelIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Expanded Options */}
                {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2">
                        <div>
                            <Label icon={BriefcaseIcon} text="Job Type" />
                            <select value={filters.type} onChange={(e) => handleTypeChange(e.target.value)}
                                className="block w-full border-gray-200 py-2.5 px-3 focus:ring-indigo-500 text-sm">
                                <option value="">All Types</option>
                                {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote', 'Internship'].map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <Label icon={CurrencyDollarIcon} text="Monthly Salary (BDT)" />
                            <div className="flex gap-4">
                                <SalaryInput value={filters.minSalary} onChange={(v) => handleChange('minSalary', v)} placeholder="Min" />
                                <span className="text-gray-400 self-center">-</span>
                                <SalaryInput value={filters.maxSalary} onChange={(v) => handleChange('maxSalary', v)} placeholder="Max" />
                            </div>
                        </div>
                    </div>
                )}
            </form>

            {/* Active Filters */}
            {hasFilters && (
                <div className="flex flex-wrap gap-2 mt-4 items-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mr-2">Active:</span>
                    {Object.entries(filters).map(([key, val]) => val && (
                        <Tag key={key} text={val} onRemove={() => key === 'type' ? handleTypeChange('') : handleChange(key as keyof Filters, '')} />
                    ))}
                    <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-red-600 ml-auto">Clear All</button>
                </div>
            )}
        </div>
    );
}

// Reusable Components
interface InputProps { icon: React.ElementType; value: string; onChange: (v: string) => void; placeholder: string; }
const Input = ({ icon: Icon, value, onChange, placeholder }: InputProps) => (
    <div className="flex-1 p-2 relative group">
        <Icon className="absolute left-5 top-5 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-3 py-3 border-none focus:ring-0 text-sm font-medium bg-transparent" placeholder={placeholder} />
    </div>
);

const Label = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4" /> {text}
    </label>
);

const SalaryInput = ({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder: string }) => (
    <div className="relative flex-1">
        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">৳</span>
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder} className="w-full pl-7 border-gray-200 py-2.5 px-3 focus:ring-indigo-500 text-sm" />
    </div>
);

const Tag = ({ text, onRemove }: { text: string, onRemove: () => void }) => (
    <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 text-xs font-medium text-indigo-600">
        {text} <button onClick={onRemove} className="ml-2 hover:text-red-500"><XMarkIcon className="h-3 w-3" /></button>
    </span>
);
