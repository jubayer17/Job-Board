"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";

type ApplicationWithJob = {
    id: string;
    status: string;
    appliedAt: Date;
    job: {
        id: string;
        title: string;
        company: string;
        location: string;
        type: string;
    };
};

interface DashboardClientProps {
    applications: ApplicationWithJob[];
}

export default function DashboardClient({ applications }: DashboardClientProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Application List Section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Applied Jobs</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">History of your job applications and their status.</p>
                    </div>
                    <Link href="/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Find more jobs &rarr;
                    </Link>
                </div>
                <div className="border-t border-gray-200 overflow-x-auto">
                    {applications.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title & Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{app.job.title}</div>
                                            <div className="text-sm text-gray-500">{app.job.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{app.job.company}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                {app.job.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                                app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 
                                                app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {format(new Date(app.appliedAt), "MMM d, yyyy")}
                                            <br/>
                                            <span className="text-xs text-gray-400">{format(new Date(app.appliedAt), "h:mm a")}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/jobs/${app.job.id}`} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
                            <p className="mt-1 text-sm text-gray-500">You haven't applied to any jobs yet.</p>
                            <div className="mt-6">
                                <Link
                                    href="/jobs"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Browse Jobs
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
