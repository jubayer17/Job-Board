import React from "react";
import Link from "next/link";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

export default function page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BuildingOfficeIcon className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Browse Companies
                </h1>
                <p className="text-gray-500 mb-8">
                    We are building a directory of top companies hiring right now. Check back soon!
                </p>
                <Link
                    href="/jobs"
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                >
                    Browse Jobs Instead
                </Link>
            </div>
        </div>
    );
}
