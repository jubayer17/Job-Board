"use client"

import React from "react"

const companies = [
    { name: 'Pathao', color: 'text-red-600' },
    { name: 'bKash', color: 'text-pink-600' },
    { name: 'ShopUp', color: 'text-orange-600' },
    { name: 'Chaldal', color: 'text-yellow-600' },
    { name: '10 Minute School', color: 'text-red-500' },
    { name: 'Grameenphone', color: 'text-blue-500' },
    { name: 'Robi', color: 'text-red-600' },
    { name: 'Banglalink', color: 'text-orange-500' },
    { name: 'Berger', color: 'text-red-700' },
    { name: 'BRAC', color: 'text-pink-700' },
]

export default function TrustedCompanies() {
    return (
        <section className="relative py-12 overflow-hidden">
            {/* Background - Matching Hero Section */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-transparent">


                {/* Grid Overlay for Texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Trusted by industry leaders
                </p>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto overflow-hidden pause-on-hover marquee-mask">
                <div className="flex w-max animate-marquee">
                    {/* First Set */}
                    <div className="flex items-center gap-16 px-8">
                        {companies.map((company, index) => (
                            <div key={`1-${index}`} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                                <span className={`text-2xl md:text-3xl font-bold ${company.color} opacity-80 hover:opacity-100`}>
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    {/* Duplicate Set for Seamless Loop */}
                    <div className="flex items-center gap-16 px-8">
                        {companies.map((company, index) => (
                            <div key={`2-${index}`} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                                <span className={`text-2xl md:text-3xl font-bold ${company.color} opacity-80 hover:opacity-100`}>
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
