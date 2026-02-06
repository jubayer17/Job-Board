import Link from "next/link";
import { BuildingOfficeIcon, GlobeAltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

interface CompanyHeaderProps {
    companyName: string;
    websiteUrl?: string;
}

export default function CompanyHeader({ companyName, websiteUrl }: CompanyHeaderProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                    <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
                    {websiteUrl && (
                        <a 
                            href={websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mt-1"
                        >
                            <GlobeAltIcon className="h-4 w-4 mr-1" />
                            {websiteUrl.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                </div>
            </div>
            <Link
                href="/employer/company/edit"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <PencilSquareIcon className="h-4 w-4 mr-2" />
                Edit Company
            </Link>
        </div>
    );
}
