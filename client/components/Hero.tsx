"use client"

import React from "react"
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import TrustedCompanies from "./TrustedCompanies"

// Subcomponents
const Blob = ({ className }: { className: string }) => (
    <div className={`absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${className}`} />
);

const SearchInput = ({ icon: Icon, placeholder, className = "" }: { icon: any, placeholder: string, className?: string }) => (
    <div className={`flex-1 flex items-center px-6 h-16 bg-white/50 ${className}`}>
        <Icon className="h-5 w-5 text-gray-400 mr-4" />
        <input 
            type="text" 
            placeholder={placeholder} 
            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-sm font-medium uppercase tracking-wide" 
        />
    </div>
);

export default function Hero() {
    return (
        <div className="relative bg-white pt-32 pb-24 lg:pt-52 lg:pb-40 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Blob className="top-0 left-1/4 bg-indigo-200" />
                <Blob className="top-0 right-1/4 bg-purple-200 animation-delay-2000" />
                <Blob className="-bottom-32 left-1/3 bg-slate-300 animation-delay-4000" />
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                    <span className="w-2 h-2 bg-indigo-600 animate-pulse" />
                    #1 Job Portal in Bangladesh
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter mb-8 leading-tight uppercase">
                    Find your next <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">career move</span>
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed font-light">
                    Access 10,000+ active job listings from top companies. <br className="hidden md:block" />
                    Professional opportunities for the modern workforce.
                </p>

                {/* Search Interface */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-md p-3 border border-gray-200 shadow-xl shadow-indigo-100/50">
                        <div className="flex flex-col md:flex-row gap-0">
                            <SearchInput 
                                icon={MagnifyingGlassIcon} 
                                placeholder="JOB TITLE, KEYWORDS..." 
                                className="border-b md:border-b-0 md:border-r border-gray-200" 
                            />
                            <SearchInput 
                                icon={MapPinIcon} 
                                placeholder="LOCATION" 
                            />
                            <Link 
                                href="/jobs" 
                                className="h-16 px-12 flex items-center justify-center bg-gray-900 hover:bg-black text-white text-sm font-bold uppercase tracking-widest transition-all hover:shadow-lg"
                            >
                                Search
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Popular Tags */}
                <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                    <span>Popular:</span>
                    {['Frontend Developer', 'Product Manager', 'Data Analyst', 'Remote'].map((tag) => (
                        <Link 
                            key={tag} 
                            href={`/jobs?q=${tag}`} 
                            className="hover:text-gray-900 transition-colors border-b border-gray-300 hover:border-gray-900 pb-0.5"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-16 -mb-20">
                <TrustedCompanies />
            </div>
        </div>
    )
}
