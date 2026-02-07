"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { CREATE_JOB_MUTATION } from "@/lib/graphql/mutations";
import { GET_EMPLOYER_PROFILE } from "@/lib/graphql/queries";
import { createJobSchema, CreateJobValues } from "@/lib/schemas/job-schema";
import { useEffect } from "react";

interface EmployerProfileData {
    employer: {
        id: string;
        companies: {
            id: string;
            companyName: string;
        }[];
    };
}

import { CldUploadWidget } from 'next-cloudinary';

export default function CreateJobPage() {
    const { data: session } = useSession();
    const router = useRouter();

    // Fetch employer profile to get companies
    const { data: employerData, loading: employerLoading } = useQuery<EmployerProfileData>(GET_EMPLOYER_PROFILE, {
        variables: { id: session?.user?.id || "" },
        skip: !session?.user?.id,
    });

    const [createJob, { loading: submitting }] = useMutation(CREATE_JOB_MUTATION);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<CreateJobValues>({
        resolver: zodResolver(createJobSchema),
        defaultValues: {
            vacancies: 1,
            gender: "Both",
            workplace: "Work at office",
            type: "Full-time",
            tags: "",
        }
    });

    // Watch logo field for preview
    const logoUrl = watch("logo");

    // Auto-select company if only one exists
    useEffect(() => {
        if (employerData?.employer?.companies?.length === 1) {
            setValue("companyId", employerData.employer.companies[0].id, { shouldValidate: true });
        }
    }, [employerData, setValue]);

    const onSubmit = async (data: CreateJobValues) => {
        if (!session?.user) {
            toast.error("You must be logged in to post a job.");
            return;
        }

        const selectedCompany = employerData?.employer?.companies?.find(
            (c: any) => c.id === data.companyId
        );

        if (!selectedCompany) {
            toast.error("Invalid company selected.");
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
                        company: selectedCompany.companyName,
                        companyId: data.companyId,
                        location: data.location,
                        type: data.type,
                        description: data.description,
                        salary: data.salary,
                        tags: tagsArray,
                        // New BD fields
                        vacancies: parseInt(data.vacancies?.toString() || "1", 10),
                        deadline: data.deadline ? new Date(data.deadline) : null,
                        experience: data.experience,
                        education: data.education,
                        workplace: data.workplace,
                        jobContext: data.jobContext,
                        gender: data.gender,

                        // New fields
                        applyLink: data.applyLink,
                        logo: data.logo,
                    },
                    employerId: session.user.id,
                    isEmployer: true,
                },
            });

            toast.success("Job posted successfully!");
            router.push("/employer/jobs");
        } catch (error) {
            console.error(error);
            toast.error("Failed to post job. Please try again.");
        }
    };

    if (employerLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const companies = employerData?.employer?.companies || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight uppercase">
                        Post a New Job
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Create a new opportunity for your company
                    </p>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 rounded-none p-6 sm:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Section 1: Basic Information */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                            {/* Job Title */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Title</label>
                                <input
                                    type="text"
                                    {...register("title")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                            </div>

                            {/* Company Selection */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Company</label>
                                <select
                                    {...register("companyId")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                >
                                    <option value="">Select a company</option>
                                    {companies.map((company: any) => (
                                        <option key={company.id} value={company.id}>
                                            {company.companyName}
                                        </option>
                                    ))}
                                </select>
                                {errors.companyId && <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>}
                            </div>

                            {/* Job Logo */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Logo</label>
                                <CldUploadWidget
                                    uploadPreset="job_portal_preset"
                                    onSuccess={(result: any) => {
                                        setValue("logo", result.info.secure_url, { shouldValidate: true });
                                    }}
                                >
                                    {({ open }) => {
                                        return (
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => open()}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-none text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Upload Logo
                                                </button>
                                                {logoUrl && (
                                                    <div className="relative h-10 w-10">
                                                        <img
                                                            src={logoUrl}
                                                            alt="Logo preview"
                                                            className="h-10 w-10 object-cover rounded-none border border-gray-200"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }}
                                </CldUploadWidget>
                                {errors.logo && <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>}
                            </div>

                            {/* Location */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Location</label>
                                <input
                                    type="text"
                                    {...register("location")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. Dhaka, Bangladesh"
                                />
                                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                            </div>

                            {/* Workplace */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Workplace</label>
                                <select
                                    {...register("workplace")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                >
                                    <option value="">Select workplace type</option>
                                    <option value="Work at office">Work at office</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Employment Details */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Employment Details</h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                            {/* Job Type */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Employment Status</label>
                                <select
                                    {...register("type")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                >
                                    <option value="">Select status</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contractual">Contractual</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
                            </div>

                            {/* Vacancies */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Vacancies</label>
                                <input
                                    type="number"
                                    {...register("vacancies")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. 1"
                                    min={1}
                                />
                                {errors.vacancies && <p className="mt-1 text-sm text-red-600">{errors.vacancies.message}</p>}
                            </div>

                            {/* Gender */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Gender</label>
                                <select
                                    {...register("gender")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                >
                                    <option value="Both">Both Male & Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Deadline */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Application Deadline</label>
                                <input
                                    type="date"
                                    {...register("deadline")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                />
                            </div>

                            {/* Salary */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Salary (Optional)</label>
                                <input
                                    type="text"
                                    {...register("salary")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. Negotiable or 50k-80k"
                                />
                            </div>

                            {/* Experience */}
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Experience (Optional)</label>
                                <input
                                    type="text"
                                    {...register("experience")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. 1 to 3 years"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Detailed Requirements */}
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4 border-b pb-2">Requirements & Context</h3>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                            {/* Education */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Education (Optional)</label>
                                <input
                                    type="text"
                                    {...register("education")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. Bachelor of Science (BSc) in Computer Science & Engineering"
                                />
                            </div>

                            {/* Job Context */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Context (Optional)</label>
                                <textarea
                                    {...register("jobContext")}
                                    rows={3}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3 resize-y"
                                    placeholder="Briefly explain the context of this role..."
                                />
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Responsibilities & Requirements</label>
                                <textarea
                                    {...register("description")}
                                    rows={8}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3 resize-y"
                                    placeholder="Detailed description of responsibilities and requirements..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                            </div>

                            {/* Apply Link */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Apply Link (Optional)</label>
                                <input
                                    type="text"
                                    {...register("applyLink")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="e.g. https://company.com/careers/apply/123"
                                />
                                {errors.applyLink && <p className="mt-1 text-sm text-red-600">{errors.applyLink.message}</p>}
                            </div>

                            {/* Tags */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Tags</label>
                                <input
                                    type="text"
                                    {...register("tags")}
                                    className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-none shadow-sm text-sm py-3"
                                    placeholder="React, Node.js (comma separated)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-none uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {submitting ? "Posting..." : "Post Job Opportunity"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}