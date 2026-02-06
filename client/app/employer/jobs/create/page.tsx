"use client";

import { useMutation } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { CREATE_JOB_MUTATION } from "@/lib/graphql/mutations";
import { createJobSchema, CreateJobValues } from "@/lib/schemas/job-schema";

export default function CreateJobPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [createJob, { loading }] = useMutation(CREATE_JOB_MUTATION);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema),
    });

    const onSubmit = async (data: CreateJobValues) => {
        if (!session?.user) {
            toast.error("You must be logged in to post a job.");
            return;
        }

        try {
            // Split tags by comma and trim
            const tagsArray = data.tags
                ? data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
                : [];

            await createJob({
                variables: {
                    data: {
                        title: data.title,
                        company: data.company,
                        location: data.location,
                        type: data.type,
                        description: data.description,
                        salary: data.salary,
                        tags: tagsArray,
                    },
                    employerId: session.user.id,
                    isEmployer: true, // Explicitly set as employer
                },
            });

            toast.success("Job posted successfully!");
            router.push("/employer/jobs");
        } catch (error) {
            console.error(error);
            toast.error("Failed to post job. Please try again.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Post a New Job</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            {...register("title")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                            placeholder="e.g. Senior Frontend Developer"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            {...register("company")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                            placeholder="e.g. Acme Corp"
                        />
                        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            {...register("location")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                            placeholder="e.g. Remote, New York, NY"
                        />
                        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Type</label>
                        <select
                            {...register("type")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                        >
                            <option value="">Select a type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salary (Optional)</label>
                        <input
                            type="text"
                            {...register("salary")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                            placeholder="e.g. $100k - $120k"
                        />
                        {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tags (Comma separated)</label>
                        <input
                            type="text"
                            {...register("tags")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                            placeholder="e.g. React, Node.js, TypeScript"
                        />
                        {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register("description")}
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                            placeholder="Describe the role responsibilities and requirements..."
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? "Posting..." : "Post Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
