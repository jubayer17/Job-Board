import React from 'react'
import { FunnelIcon } from '@heroicons/react/24/outline'

export default function Filters() {
    return (
        <div className="bg-white border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                <FunnelIcon className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                    Filters
                </h3>
            </div>

            {/* Job Type */}
            <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Job Type
                </h4>
                <div className="space-y-3">
                    {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="peer h-4 w-4 appearance-none border border-gray-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:ring-0 focus:ring-offset-0 transition-all duration-200"
                                />
                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Salary Range */}
            <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Salary Range (BDT)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-full bg-gray-50 border border-gray-200 p-2 text-sm font-medium text-gray-900 focus:border-indigo-600 focus:ring-0 placeholder:text-gray-400"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-full bg-gray-50 border border-gray-200 p-2 text-sm font-medium text-gray-900 focus:border-indigo-600 focus:ring-0 placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Location */}
            <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                    Location
                </h4>
                <div className="space-y-3">
                    {['Dhaka', 'Chittagong', 'Sylhet', 'Remote'].map((loc) => (
                        <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    className="peer h-4 w-4 appearance-none border border-gray-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:ring-0 focus:ring-offset-0 transition-all duration-200"
                                />
                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                                {loc}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button className="w-full py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors duration-300">
                Apply Filters
            </button>
        </div>
    )
}
