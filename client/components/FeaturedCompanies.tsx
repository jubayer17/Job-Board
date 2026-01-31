import React from 'react'
import Link from 'next/link'

const companies = [
    { name: 'Grameenphone', logo: 'GP', jobs: 12, industry: 'Telecommunication' },
    { name: 'bKash', logo: 'bK', jobs: 8, industry: 'FinTech' },
    { name: 'BRAC', logo: 'BR', jobs: 25, industry: 'Development' },
    { name: 'Pathao', logo: 'Pa', jobs: 5, industry: 'Logistics' },
    { name: 'Walton', logo: 'Wa', jobs: 18, industry: 'Electronics' },
    { name: 'Pran-RFL', logo: 'PR', jobs: 30, industry: 'Manufacturing' },
]

export default function FeaturedCompanies() {
    return (
        <section className="relative py-24 bg-white border-t border-b border-gray-200 overflow-hidden">
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
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">
                            Top Employers
                        </h2>
                        <div className="h-1 w-20 bg-black mt-4"></div>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl font-light">
                            Partnering with industry leaders to shape the future workforce of Bangladesh.
                        </p>
                    </div>
                    <Link
                        href="/companies"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors uppercase text-sm tracking-wider font-medium"
                    >
                        View Directory
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200">
                    {companies.map((company, index) => (
                        <div key={index} className="group relative bg-white p-8 border-r border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex justify-between items-start mb-6">
                                <div className="h-12 w-12 bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                                    {company.logo}
                                </div>
                                <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wide">
                                    Hiring
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {company.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 uppercase tracking-wide">{company.industry}</p>

                            <div className="mt-8 flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-light text-gray-900">{company.jobs}</span>
                                    <span className="ml-2 text-xs text-gray-500 font-medium uppercase">Open Roles</span>
                                </div>
                                <Link
                                    href={`/companies/${company.name.toLowerCase()}`}
                                    className="text-gray-400 hover:text-black transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
