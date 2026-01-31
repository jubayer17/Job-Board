import React from 'react'
import { UserPlusIcon, CloudArrowUpIcon, MagnifyingGlassIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

const steps = [
    {
        id: '01',
        title: 'Create Account',
        description: 'Sign up for a free account to get started. Complete your profile to stand out.',
        icon: UserPlusIcon,
    },
    {
        id: '02',
        title: 'Upload Resume',
        description: 'Upload your latest CV. Our system parses it to match you with opportunities.',
        icon: CloudArrowUpIcon,
    },
    {
        id: '03',
        title: 'Find & Apply',
        description: 'Browse through thousands of job listings and apply with a single click.',
        icon: MagnifyingGlassIcon,
    },
    {
        id: '04',
        title: 'Get Hired',
        description: 'Connect with employers, schedule interviews, and land your dream job.',
        icon: CheckBadgeIcon,
    },
]

export default function HowItWorks() {
    return (
        <section className="relative py-24 bg-gray-900 text-white border-b border-gray-800 overflow-hidden">
            {/* Dark Technical Mesh Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs">Process</span>
                    <h2 className="mt-3 text-3xl font-bold text-white uppercase tracking-tight sm:text-4xl">
                        How it Works
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-light">
                        A streamlined process designed for efficiency and results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="relative group">
                            <div className="absolute -top-4 -left-4 text-6xl font-black text-gray-800 opacity-50 z-0 select-none group-hover:text-gray-700 transition-colors">
                                {step.id}
                            </div>

                            <div className="relative z-10 p-6 border-l border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 hover:border-indigo-500 transition-all duration-300">
                                <div className="mb-6 inline-flex items-center justify-center p-3 bg-gray-800 text-indigo-500">
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
