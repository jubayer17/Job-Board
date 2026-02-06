"use client";

import { useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { GET_EMPLOYER_PROFILE } from "@/lib/graphql/queries";
import CompanyHeader from "./_components/CompanyHeader";
import CompanyInfoList from "./_components/CompanyInfoList";
import CompanyAbout from "./_components/CompanyAbout";
import ContactPerson from "./_components/ContactPerson";
import Link from "next/link";

interface Company {
    id: string;
    companyName: string;
    description?: string;
    industryType?: string;
    websiteUrl?: string;
    address?: string;
    tradeLicense?: string;
    yearOfEstablishment?: string;
}

interface Employer {
    id: string;
    contactName: string;
    contactEmail: string;
    contactDesignation: string;
    contactMobile: string;
    companies: Company[];
}

interface GetEmployerProfileData {
    employer: Employer;
}

export default function CompanyPage() {
    const { data: session } = useSession();
    const { data, loading, error } = useQuery<GetEmployerProfileData>(GET_EMPLOYER_PROFILE, {
        variables: { id: session?.user?.id || "" },
        skip: !session?.user?.id,
        fetchPolicy: "network-only",
    });

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-48 bg-gray-200 rounded-lg"></div>
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="h-48 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-6 bg-red-50 rounded-lg border border-red-100 text-center">
                <p className="text-red-600">Failed to load company profile. Please try again later.</p>
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
            </div>
        );
    }

    const employer = data?.employer;
    const company = employer?.companies?.[0];

    if (!company) {
        return (
            <div className="max-w-7xl mx-auto text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No Company Profile</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by setting up your company profile.
                </p>
                <div className="mt-6">
                    <Link
                        href="/employer/company/edit"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Company Profile
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <CompanyHeader
                companyName={company.companyName}
                websiteUrl={company.websiteUrl}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CompanyInfoList
                        industryType={company.industryType}
                        yearOfEstablishment={company.yearOfEstablishment}
                        tradeLicense={company.tradeLicense}
                        address={company.address}
                    />
                    <CompanyAbout description={company.description} />
                </div>

                <div className="space-y-6">
                    <ContactPerson
                        name={employer.contactName}
                        designation={employer.contactDesignation}
                        email={employer.contactEmail}
                        mobile={employer.contactMobile}
                    />
                </div>
            </div>
        </div>
    );
}
