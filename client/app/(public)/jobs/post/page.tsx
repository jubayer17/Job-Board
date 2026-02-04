"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BriefcaseIcon, BuildingOfficeIcon, MapPinIcon, BanknotesIcon, GlobeAmericasIcon } from "@heroicons/react/24/outline";

const formSchema = z.object({
    title: z.string().min(2, "Job title must be at least 2 characters."),
    company: z.string().min(2, "Company name must be at least 2 characters."),
    location: z.string().min(2, "Location must be at least 2 characters."),
    type: z.string().min(1, "Please select a job type."),
    salary: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters."),
});

export default function PostJobPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            company: "",
            location: "",
            type: "",
            salary: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                router.push("/jobs");
                router.refresh();
            } else {
                console.error("Failed to post job");
            }
        } catch (error) {
            console.error("Error posting job:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4 uppercase">
                        Post a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">New Opportunity</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
                        Reach thousands of top-tier developers and tech professionals. Create a listing that stands out.
                    </p>
                </div>

                <Card className="border-gray-200 shadow-xl shadow-indigo-500/5 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    <CardHeader className="bg-white border-b border-gray-100 p-8">
                        <CardTitle className="text-2xl font-bold text-gray-900">Job Details</CardTitle>
                        <CardDescription className="text-gray-500">
                            Fill in the details below to create your job posting. Fields marked with * are required.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 bg-white">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Job Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-bold uppercase text-xs tracking-wide">Job Title <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <BriefcaseIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                        <Input placeholder="e.g. Senior Frontend Developer" className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Company Name */}
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-bold uppercase text-xs tracking-wide">Company Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <BuildingOfficeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                        <Input placeholder="e.g. Acme Corp" className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Location */}
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-bold uppercase text-xs tracking-wide">Location <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <MapPinIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                        <Input placeholder="e.g. Remote, San Francisco" className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Job Type */}
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-bold uppercase text-xs tracking-wide">Job Type <span className="text-red-500">*</span></FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-11 border-gray-200 focus:ring-indigo-500">
                                                            <div className="flex items-center gap-2">
                                                                <GlobeAmericasIcon className="h-5 w-5 text-gray-400" />
                                                                <SelectValue placeholder="Select a type..." />
                                                            </div>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                                        <SelectItem value="Contract">Contract</SelectItem>
                                                        <SelectItem value="Internship">Internship</SelectItem>
                                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Salary Range */}
                                <FormField
                                    control={form.control}
                                    name="salary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-bold uppercase text-xs tracking-wide">Salary Range</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <BanknotesIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                    <Input placeholder="e.g. $80,000 - $120,000" className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription className="text-xs text-gray-400">
                                                Optional, but recommended for better visibility.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Separator className="bg-gray-100" />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-bold uppercase text-xs tracking-wide">Job Description <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the role, responsibilities, and requirements..."
                                                    className="min-h-[200px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
                                    >
                                        {isLoading ? "Posting Job..." : "Post Job Listing"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
