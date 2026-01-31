import React from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
    return (
        <div className="relative bg-gray-900 py-16 sm:py-24 border-t border-gray-800">
             {/* Architectural Grid Background */}
             <div className="absolute inset-0 z-0 opacity-10">
                <div 
                  className="absolute inset-0" 
                  style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border border-gray-700 bg-gray-900 p-8 lg:p-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white uppercase mb-4">
                            Stay Ahead in Your Career
                        </h2>
                        <div className="h-1 w-20 bg-indigo-500 mb-6"></div>
                        <p className="text-lg text-gray-400 font-light">
                            Join elite professionals receiving curated job opportunities and market insights.
                        </p>
                        
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-gray-300 uppercase tracking-wide">
                            <div className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 bg-indigo-500"></span>
                                Weekly Executive Brief
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 bg-indigo-500"></span>
                                Priority Job Alerts
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-md">
                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <div className="flex">
                                    <div className="relative flex-grow focus-within:z-10">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="block w-full border-0 bg-gray-800 py-4 pl-12 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 uppercase tracking-wider"
                                            placeholder="ENTER YOUR EMAIL"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="relative -ml-px inline-flex items-center gap-x-1.5 bg-indigo-600 px-8 py-4 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase tracking-widest"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                Professional grade insights. No spam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
