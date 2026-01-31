import React from 'react'

const stats = [
    { id: 1, name: 'Active Job Listings', value: '5k+' },
    { id: 2, name: 'Companies Hiring', value: '1.2k' },
    { id: 3, name: 'Daily New Openings', value: '350+' },
    { id: 4, name: 'Happy Hires', value: '10k+' },
]

export default function StatsSection() {
    return (
        <div className="relative bg-indigo-600 border-b border-indigo-700 overflow-hidden">
            {/* Subtle White Noise/Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-16 gap-x-8 py-20 lg:grid-cols-4 text-center lg:text-left">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col gap-y-2 border-l border-indigo-500 pl-6">
                            <dt className="text-xs leading-6 text-indigo-200 uppercase tracking-widest font-medium">
                                {stat.name}
                            </dt>
                            <dd className="order-first text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
