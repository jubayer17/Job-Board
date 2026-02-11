"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { CREATE_JOB_MUTATION } from "@/lib/graphql/mutations";
import { GET_EMPLOYER_PROFILE } from "@/lib/graphql/queries";
import { createJobSchema, CreateJobValues } from "@/lib/schemas/job-schema";
import { useEffect, useState } from "react";
import RichTextEditor from "@/components/ui/RichTextEditor";

interface EmployerProfileData {
    employer: {
        id: string;
        companies: {
            id: string;
            companyName: string;
        }[];
    };
}

export default function CreateJobPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

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
        watch,
        control
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

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        // 1. Type
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Only JPG, PNG, GIF, SVG, and WEBP are allowed.");
            return;
        }

        // 2. Size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit.");
            return;
        }

        // 3. Dimensions (Ratio 1:1)
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        img.onload = async () => {
            const width = img.width;
            const height = img.height;
            URL.revokeObjectURL(objectUrl);

            // Allow small margin of error for floating point or 1px diff
            const ratio = width / height;
            if (ratio < 0.9 || ratio > 1.1) {
                toast.error("Logo must be square (1:1 ratio). Recommended size: 512x512.");
                return;
            }

            // Upload
            setIsUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Upload failed");
                }

                const data = await res.json();
                setValue("logo", data.url, { shouldValidate: true });
                setValue("logoPublicId", data.public_id);
                setValue("logoOriginalName", data.original_filename);
                setValue("logoUploadedAt", data.created_at);
                toast.success("Logo uploaded successfully!");
            } catch (error: any) {
                console.error(error);
                toast.error(error.message || "Failed to upload logo.");
            } finally {
                setIsUploading(false);
            }
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            toast.error("Invalid image file.");
        };
    };

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
                        logoPublicId: data.logoPublicId,
                        logoOriginalName: data.logoOriginalName,
                        logoUploadedAt: data.logoUploadedAt ? new Date(data.logoUploadedAt) : null,
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
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            disabled={isUploading}
                                            className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-none file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-indigo-50 file:text-indigo-700
                                                hover:file:bg-indigo-100
                                                cursor-pointer"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Square image (1:1), max 5MB. Formats: JPG, PNG, GIF, SVG.
                                        </p>
                                    </div>

                                    {isUploading && (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                                        </div>
                                    )}

                                    {logoUrl && !isUploading && (
                                        <div className="relative h-16 w-16 flex-shrink-0">
                                            <img
                                                src={logoUrl}
                                                alt="Logo preview"
                                                className="h-16 w-16 object-cover rounded-none border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setValue("logo", "", { shouldValidate: true })}
                                                className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-0.5 hover:bg-red-200"
                                                title="Remove logo"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
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
                                <Controller
                                    name="education"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder="e.g. Bachelor of Science (BSc) in Computer Science & Engineering"
                                        />
                                    )}
                                />
                            </div>

                            {/* Job Context */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Context (Optional)</label>
                                <Controller
                                    name="jobContext"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder="Briefly explain the context of this role..."
                                        />
                                    )}
                                />
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Job Responsibilities & Requirements</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Detailed description of responsibilities and requirements..."
                                            error={errors.description?.message}
                                        />
                                    )}
                                />
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