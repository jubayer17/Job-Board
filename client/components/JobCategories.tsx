import React from 'react'
import Link from 'next/link'
import { 
    ComputerDesktopIcon, 
    BanknotesIcon, 
    MegaphoneIcon, 
    UserGroupIcon, 
    BuildingOffice2Icon,
    WrenchScrewdriverIcon,
    AcademicCapIcon,
    HeartIcon
} from '@heroicons/react/24/outline'

const categories = [
    { name: 'IT & Software', icon: ComputerDesktopIcon, count: '1.2k', href: '/jobs?category=it' },
    { name: 'Bank & Finance', icon: BanknotesIcon, count: '850', href: '/jobs?category=finance' },
    { name: 'Marketing & Sales', icon: MegaphoneIcon, count: '2.1k', href: '/jobs?category=marketing' },
    { name: 'Garments & Textile', icon: WrenchScrewdriverIcon, count: '3.4k', href: '/jobs?category=garments' },
    { name: 'HR & Admin', icon: UserGroupIcon, count: '500+', href: '/jobs?category=hr' },
    { name: 'NGO & Development', icon: HeartIcon, count: '900+', href: '/jobs?category=ngo' },
    { name: 'Government Jobs', icon: BuildingOffice2Icon, count: '150+', href: '/jobs?category=govt' },
    { name: 'Education', icon: AcademicCapIcon, count: '1.5k', href: '/jobs?category=education' },
]

export default function JobCategories() {
    return (
        <section className="relative py-24 bg-gray-50 border-b border-gray-200 overflow-hidden">
             {/* Dot Matrix Pattern */}
             <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <div 
                    className="absolute inset-0" 
                    style={{
                        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">Browse by Category</h2>
                        <div className="h-1 w-20 bg-indigo-600 mt-4"></div>
                    </div>
                    <Link 
                        href="/categories" 
                        className="hidden md:inline-flex items-center text-sm font-bold text-gray-900 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                    >
                        View All Categories <span aria-hidden="true" className="ml-2">&rarr;</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 bg-white">
                    {categories.map((category) => (
                        <Link 
                            key={category.name} 
                            href={category.href}
                            className="group relative p-8 border-r border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <category.icon className="h-8 w-8 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 transition-colors">{category.count}</span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                                {category.name}
                            </h3>
                            
                            <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Explore <span className="ml-2">&rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link 
                        href="/categories" 
                        className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-sm font-bold uppercase tracking-widest text-gray-700 bg-white hover:bg-gray-50 transition-all"
                    >
                        View All Categories
                    </Link>
                </div>
            </div>
        </section>
    )
}
