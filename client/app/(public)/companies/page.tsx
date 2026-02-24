import React from "react";
import dynamic from "next/dynamic";
import { getCompanies } from "@/lib/services/company";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Companies | JobBoard",
    description:
        "Explore top companies hiring now. Discover employers by industry and location, then dive into open roles.",
    openGraph: {
        title: "Companies | JobBoard",
        description:
            "Explore top companies hiring now. Discover employers by industry and location.",
        url: "/companies",
        type: "website",
    },
};

const CompaniesClient = dynamic(() => import("./CompaniesClient"), { ssr: true });

export default async function CompaniesPage() {
    const companies = await getCompanies();

    return (
        <div className="min-h-screen">
            <header className="relative bg-white border-b border-gray-200">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 uppercase">
                        Explore Companies
                    </h1>
                    <p className="mt-4 max-w-2xl text-gray-600 font-medium">
                        Browse employers by industry and location. Click a company to view open roles.
                    </p>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-10">
                <CompaniesClient companies={companies} />
            </main>
        </div>
    );
}
