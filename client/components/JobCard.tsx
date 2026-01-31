import React from 'react';
import Link from 'next/link';
import { MapPinIcon, ClockIcon, CurrencyDollarIcon, BriefcaseIcon, BookmarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export interface Job {
    id: number | string; title: string; company: string; location: string; type: string;
    salary: string; logo: string; tags: string[]; posted: string; salaryMax?: number;
}

export default function JobCard({ job, variant = 'default' }: { job: Job; variant?: 'default' | 'featured' }) {
    const isFeatured = variant === 'featured';

    // Theme classes configuration
    const theme = {
        border: isFeatured ? 'hover:border-purple-600' : 'hover:border-indigo-600',
        text: isFeatured ? 'group-hover:text-purple-600' : 'group-hover:text-indigo-600',
        bg: isFeatured ? 'bg-purple-600' : 'bg-indigo-600',
        btnBorder: isFeatured ? 'hover:border-purple-600' : 'hover:border-indigo-600',
        logoBorder: isFeatured ? 'group-hover:border-purple-600' : 'group-hover:border-indigo-600'
    };

    return (
        <div className={`group relative bg-white border border-gray-200 p-8 hover:bg-gray-50 transition-all duration-300 hover:shadow-lg ${theme.border}`}>
            {/* Top Border & Badge */}
            <div className={`absolute top-0 left-0 w-0 h-1 ${theme.bg} transition-all duration-300 group-hover:w-full`} />
            {isFeatured && (
                <div className={`absolute top-0 right-0 ${theme.bg} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1`}>
                    Featured
                </div>
            )}

            {/* Header */}
            <div className={`flex justify-between items-start mb-6 ${isFeatured ? 'mt-4' : ''}`}>
                <div className={`h-14 w-14 bg-white border border-gray-200 flex items-center justify-center font-bold text-xl text-gray-900 shadow-sm ${theme.logoBorder} transition-colors overflow-hidden`}>
                    {job.logo?.startsWith('http') || job.logo?.startsWith('/') ?
                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover" /> : job.logo || '🏢'}
                </div>
                <span className="px-2.5 py-1 border border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide bg-gray-50">{job.type}</span>
            </div>

            {/* Content */}
            <div className="mb-6">
                <Link href={`/jobs/${job.id}`} className={`text-xl font-bold text-gray-900 mb-2 ${theme.text} transition-colors line-clamp-1 block`}>
                    {job.title}
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <BriefcaseIcon className="h-4 w-4" /> <span>{job.company}</span>
                </div>
            </div>

            {/* Meta */}
            <div className="space-y-3 mb-8 text-sm text-gray-500">
                <MetaItem icon={MapPinIcon} text={job.location} />
                <MetaItem icon={CurrencyDollarIcon} text={job.salary} className={theme.text} />
                <MetaItem icon={ClockIcon} text={job.posted} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-gray-200 group-hover:border-gray-300">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
                <Link
                    href={`/jobs/${job.id}`}
                    className="py-2.5 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition-all flex items-center justify-center"
                >
                    View Details
                </Link>
                <Link
                    href={`/jobs/${job.id}/apply`}
                    className="py-2.5 bg-gray-900 border border-gray-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                >
                    Apply Now <ArrowRightIcon className="h-3 w-3 hidden group-hover:block" />
                </Link>
            </div>
        </div>
    );
}

const MetaItem = ({ icon: Icon, text, className = '' }: any) => (
    <div className="flex items-center gap-3">
        <Icon className={`h-4 w-4 text-gray-400 ${className}`} /> <span>{text}</span>
    </div>
);
