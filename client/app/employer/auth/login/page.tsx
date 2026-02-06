"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
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
import { signInSchema, type SignInValues } from "@/lib/schemas/auth-schema";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function EmployerLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/employer/dashboard";
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInValues) => {
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                isEmployer: true,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Logged in successfully!");
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-white">
            {/* Left Banner - Artistic/Premium */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-950 flex-col justify-between p-16 overflow-hidden">
                {/* Abstract Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center text-white font-bold text-xl rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                            J
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase">
                            JobPortal <span className="text-indigo-500">Employer</span>
                        </span>
                    </div>

                    <div className="max-w-xl">
                        <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-8 leading-[0.9]">
                            Welcome <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                Back
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-md border-l-2 border-indigo-500 pl-6">
                            Sign in to manage your job postings, track candidates, and streamline your hiring process.
                        </p>
                    </div>

                    <div className="flex gap-4 items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span>Trusted by industry leaders</span>
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">
                            Employer Login
                        </h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">
                            Don't have an account?{" "}
                            <Link href="/employer/auth/sign-up" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Create one
                            </Link>
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-500">
                                                Work Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name@company.com"
                                                    {...field}
                                                    className="h-12 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel className="uppercase text-xs font-bold tracking-wider text-gray-500">
                                                    Password
                                                </FormLabel>
                                                <Link href="/employer/auth/forgot-password" className="text-xs font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-wider">
                                                    Forgot?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-12 rounded-none border-x-0 border-t-0 border-b-2 border-gray-200 px-0 bg-transparent focus:border-indigo-600 focus:ring-0 transition-all font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-300"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-none bg-indigo-600 hover:bg-gray-900 text-white font-bold uppercase tracking-widest transition-all duration-200 mt-8"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Signing In...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Login <ArrowRightIcon className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-8 text-center text-xs font-medium text-gray-400">
                        Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
