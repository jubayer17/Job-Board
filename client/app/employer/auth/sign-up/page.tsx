"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import toast from "react-hot-toast";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { employerSignUpSchema, type EmployerSignUpValues } from "@/lib/schemas/auth-schema";
import { CREATE_EMPLOYER_MUTATION } from "@/lib/graphql/mutations";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EmployerSignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [createEmployer] = useMutation(CREATE_EMPLOYER_MUTATION);

    const form = useForm<EmployerSignUpValues>({
        resolver: zodResolver(employerSignUpSchema),
        defaultValues: {
            contactName: "",
            contactDesignation: "",
            contactEmail: "",
            contactMobile: "",
            password: "",
            companyName: "",
            tradeLicense: "",
            yearOfEstablishment: "",
            industryType: "",
            description: "",
            address: "",
            websiteUrl: "",
        },
    });

    const onSubmit = async (data: EmployerSignUpValues) => {
        setIsLoading(true);
        try {
            await createEmployer({
                variables: { createEmployerInput: data },
            });
            toast.success("Employer account created successfully!");
            router.push("/employer/auth/login");
        } catch (error) {
            console.error("Sign up error:", error);
            toast.error("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-white">
            {/* Left Banner removed */}

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative bg-white">
                <div className="w-full space-y-10">
                    <div className="text-center">
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">
                            Already have an account?{" "}
                            <Link href="/employer/auth/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                            {/* Section 1: Employer Credentials */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-100 pb-4">
                                    Employer Credentials
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="contactName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Contact Person
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. John Doe"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contactDesignation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Designation
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. HR Manager"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contactMobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Mobile Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="+1 (555) 000-0000"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Work Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="name@company.com"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="md:col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            {...field}
                                                            className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Company Information */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-xl font-black uppercase tracking-widest text-indigo-600 border-b-2 border-indigo-100 pb-4">
                                    Company Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Company Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. Acme Corp"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="industryType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Industry Type
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. IT / Software"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="yearOfEstablishment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Est. Year
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. 2010"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tradeLicense"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                    Trade License No.
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. TRD-12345678"
                                                        {...field}
                                                        className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="md:col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="websiteUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                        Website URL
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="https://company.com"
                                                            {...field}
                                                            className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                        Company Address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Full corporate address"
                                                            {...field}
                                                            className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="uppercase text-sm font-bold tracking-wider text-gray-500">
                                                        Company Description
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Brief overview of your company..."
                                                            {...field}
                                                            className="h-14 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-none bg-indigo-600 hover:bg-gray-900 text-white font-bold uppercase tracking-widest transition-all duration-200 mt-8"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Creating...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Create Account <ArrowRightIcon className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-8 text-center text-xs font-medium text-gray-400">
                        By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div >
            </div >
        </div >
    );
}
