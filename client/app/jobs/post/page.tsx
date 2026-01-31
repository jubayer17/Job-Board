"use client";

import { FormEvent, useState } from "react";

export default function page() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            company: formData.get("company"),
            location: formData.get("location"),
            type: formData.get("type"),
            description: formData.get("description"),
            salary: formData.get("salary"),
        };

        try {
            await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            window.location.href = "/jobs";
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 px-8 py-6">
                    <h1 className="text-3xl font-bold text-white">Post a New Job</h1>
                    <p className="mt-2 text-indigo-100">
                        Reach thousands of developers and tech professionals.
                    </p>
                </div>

                <div className="px-8 py-8">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        placeholder="e.g. Senior Frontend Developer"
                                        className="block w-full rounded-lg  text-black border-gray-300 border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="company"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        required
                                        placeholder="e.g. Acme Corp"
                                        className="block w-full rounded-lg border-gray-300 border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors text-black "
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        required
                                        placeholder="e.g. Remote, San Francisco"
                                        className="block w-full rounded-lg border-gray-300 border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors text-black "
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Job Type <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <select
                                        name="type"
                                        id="type"
                                        required
                                        className="block w-full rounded-lg border-gray-300 border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors text-black  bg-white"
                                    >
                                        <option value="">Select a type...</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="salary"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Salary Range
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="salary"
                                        id="salary"
                                        placeholder="e.g. $80,000 - $120,000"
                                        className="block w-full rounded-lg border-gray-300 text-black  border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Optional, but recommended for better visibility.
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Job Description <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={8}
                                        required
                                        placeholder="Describe the role, responsibilities, and requirements..."
                                        className="block text-black  w-full rounded-lg border-gray-300 border px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.01]"
                            >
                                Post Job Listing
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
