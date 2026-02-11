"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema, type SignInValues } from "@/lib/schemas/auth-schema";

const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      name
      email
    }
  }
`;

function SignInContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<SignInValues>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof SignInValues, string>>>({});

    const [login] = useMutation(LOGIN_MUTATION);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof SignInValues]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Validate using Zod
        const result = signInSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors: Partial<Record<keyof SignInValues, string>> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof SignInValues;
                formattedErrors[path] = issue.message;
            });
            setErrors(formattedErrors);
            setIsLoading(false);
            return;
        }

        try {
            // Step 1: Verify credentials via GraphQL
            await login({
                variables: {
                    data: {
                        email: formData.email,
                        password: formData.password
                    }
                }
            });

            // Step 2: Establish NextAuth session
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
                setIsLoading(false);
            } else {
                toast.success("Logged in successfully!");
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (error) {
            console.error("Sign in error:", error);
            toast.error("Invalid email or password");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full pt-20">
            {/* Left Banner */}
            <div className="hidden lg:flex w-1/2 relative bg-indigo-950 overflow-hidden flex-col justify-between p-12 text-white">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'linear-gradient(30deg, #4f46e5 12%, transparent 12.5%, transparent 87%, #4f46e5 87.5%, #4f46e5), linear-gradient(150deg, #4f46e5 12%, transparent 12.5%, transparent 87%, #4f46e5 87.5%, #4f46e5), linear-gradient(30deg, #4f46e5 12%, transparent 12.5%, transparent 87%, #4f46e5 87.5%, #4f46e5), linear-gradient(150deg, #4f46e5 12%, transparent 12.5%, transparent 87%, #4f46e5 87.5%, #4f46e5), linear-gradient(60deg, #77aa7777 25%, transparent 25.5%, transparent 75%, #77aa7777 75%, #77aa7777), linear-gradient(60deg, #77aa7777 25%, transparent 25.5%, transparent 75%, #77aa7777 75%, #77aa7777)',
                            backgroundSize: "80px 140px",
                            backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
                        }}
                    ></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="p-2 bg-white/10 backdrop-blur-sm rounded-none">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 invert brightness-0 filter"
                            />
                        </div>
                        <span className="text-2xl font-black tracking-tight uppercase">
                            JobBoard
                        </span>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="text-5xl font-black tracking-tighter uppercase leading-tight">
                            Welcome <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                                Back
                            </span>
                        </h1>
                        <p className="text-lg text-indigo-200 font-medium leading-relaxed">
                            Sign in to manage your profile, track your applications, and discover new career opportunities.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 pt-12 border-t border-white/10">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-medium italic text-indigo-100">
                            "The platform is intuitive and the opportunities are endless. I highly recommend it to anyone looking for a career change."
                        </p>
                        <footer className="text-sm font-bold uppercase tracking-wide text-pink-400">
                            - Sarah Jenkins, Software Engineer
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
                            Sign In
                        </h2>
                        <p className="text-gray-500 font-medium">
                            Or{" "}
                            <Link
                                href="/auth/sign-up"
                                className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                create a new account
                            </Link>
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            onClick={() => signIn("google")}
                            className="h-12 rounded-none border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 font-bold"
                        >
                            <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.147-1.133 8.213-3.293 2.08-2.16 3.28-5.213 3.28-9.067 0-.76-.067-1.467-.173-2.147H12.48z" />
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signIn("github")}
                            className="h-12 rounded-none border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 font-bold"
                        >
                            <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            GitHub
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500 font-bold tracking-wider">
                                Or sign in with email
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="pl-10 h-12 rounded-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all block w-full"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-500 font-medium">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                        Password
                                    </Label>
                                    <div className="text-sm">
                                        <a href="#" className="font-bold text-indigo-600 hover:text-indigo-500 text-xs uppercase tracking-wide">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="pl-10 h-12 rounded-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all block w-full"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-red-500 font-medium">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">
                                Remember me
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-none border border-transparent bg-indigo-600 py-3 px-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 h-12"
                            disabled={isLoading}
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <ArrowRightIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
