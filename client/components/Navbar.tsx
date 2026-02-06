"use client"

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import Loading from "@/components/ui/Loading"
import { Bars3Icon, XMarkIcon, BellIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"
import UserMenu from "./UserMenu"

const NAV_ITEMS = [
    { name: 'Find Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' }
];

export default function Navbar() {
    const { data: session, status } = useSession()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isTransparent = pathname === "/" && !isScrolled;

    // Styles
    const navLinkClass = `text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${isTransparent ? 'text-gray-600 hover:text-gray-900' : 'text-gray-500 hover:text-indigo-600'
        }`;
    const iconBtnClass = `p-2 transition-all duration-300 relative group ${isTransparent ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-indigo-50 hover:text-indigo-600'
        }`;
    const mobileLinkClass = "block pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-bold uppercase tracking-wide text-gray-600 hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors";

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent border-b border-transparent py-4' : 'bg-white border-b border-gray-200 py-2'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo & Desktop Nav */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className={`p-1.5 ${isTransparent ? 'bg-gray-900' : 'bg-indigo-600'}`}>
                                <Image src="/logo.png" alt="Logo" width={24} height={24} className="w-6 h-6 invert brightness-0 filter" />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase text-gray-900">JobBoard</span>
                        </Link>

                        <div className="hidden md:flex md:space-x-8">
                            {NAV_ITEMS.map((item) => (
                                <Link key={item.name} href={item.href} className={navLinkClass}>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Auth (Desktop) */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {status === "loading" ? <Loading variant="navbar" /> : session?.user ? (
                            <>
                                <div className={`flex items-center space-x-1 mr-2 border-r pr-4 ${isTransparent ? 'border-gray-200' : 'border-gray-100'}`}>
                                    <Link href="/dm" className={iconBtnClass} title="Messages">
                                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500" />
                                    </Link>
                                    <button className={iconBtnClass} title="Notifications">
                                        <BellIcon className="w-6 h-6" />
                                        <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-indigo-500" />
                                    </button>
                                </div>
                                <UserMenu />
                                <Link href={session.user.role === 'employer' ? "/employer/jobs/create" : "/employer/auth/sign-up"} className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold uppercase tracking-wide text-white bg-indigo-600 hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-indigo-500">
                                    Post a Job
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/sign-in" className="text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
                                <Link href="/employer/auth/sign-up" className="inline-flex items-center justify-center px-6 py-2 text-sm font-bold uppercase tracking-wide text-white bg-gray-900 hover:bg-black transition-all focus:ring-2 focus:ring-gray-900">
                                    Post a Job
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex items-center md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-50">
                    <div className="pt-2 pb-3 space-y-1">
                        {NAV_ITEMS.map(item => (
                            <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>
                                {item.name}
                            </Link>
                        ))}
                        {session?.user && (
                            <>
                                <Link href="/dm" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Messages</Link>
                                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass}>Dashboard</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
