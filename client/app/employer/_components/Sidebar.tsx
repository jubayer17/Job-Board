"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    BriefcaseIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/employer/dashboard", icon: HomeIcon },
    { name: "Jobs", href: "/employer/jobs", icon: BriefcaseIcon },
    { name: "Applications", href: "/employer/applications", icon: UserGroupIcon },
    { name: "Company Profile", href: "/employer/company", icon: BuildingOfficeIcon },
    { name: "Settings", href: "/employer/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5 lg:pb-4">
            <div className="flex items-center flex-shrink-0 px-6">
                <span className="text-xl font-bold tracking-tight text-indigo-600 uppercase">
                    JobPortal
                </span>
            </div>
            <div className="mt-8 flex-1 flex flex-col overflow-y-auto">
                <nav className="px-3 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-none transition-colors ${isActive
                                        ? "bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                                        }`}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex-shrink-0 w-full group block"
                >
                    <div className="flex items-center">
                        <div className="inline-block h-9 w-9 rounded-none overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div className="ml-3 text-left">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Sign Out</p>
                        </div>
                        <ArrowLeftOnRectangleIcon className="ml-auto h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    </div>
                </button>
            </div>
        </div>
    );
}
