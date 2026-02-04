"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
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
import { Separator } from "@/components/ui/separator";
import {
    ArrowRightIcon,
    EnvelopeIcon,
    UserIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { signUpSchema, type SignUpValues } from "@/lib/schemas/auth-schema";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($data: CreateUserInput!) {
    signUp(data: $data) {
      id
      name
      email
    }
  }
`;

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [signUp] = useMutation(SIGN_UP_MUTATION);

    // RHF + Zod
    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignUpValues) => {
        setIsLoading(true);
        try {
            await signUp({
                variables: { data },
            });
            toast.success("Account created successfully!");
            router.push("/auth/sign-in");
        } catch (error) {
            console.error("Sign up error:", error);
            toast.error("Failed to create account. Please try again.");
        } finally {
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
                            Start Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
                                Career Journey
                            </span>
                            <br />
                            Here
                        </h1>
                        <p className="text-lg text-indigo-200 font-medium leading-relaxed">
                            Create your profile and stand out to top employers. Your next big
                            opportunity is just a few clicks away.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 pt-12 border-t border-white/10">
                    <blockquote className="space-y-2">
                        <p className="text-lg font-medium italic text-indigo-100">
                            "I found my dream job within a week of signing up. The platform
                            is intuitive and the opportunities are endless."
                        </p>
                        <footer className="text-sm font-bold uppercase tracking-wide text-pink-400">
                            - Michael Chen, Product Designer
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
                            Create Account
                        </h2>
                        <p className="text-gray-500 font-medium">
                            Join us to unlock full access to job postings
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            onClick={() => signIn("google")}
                            className="h-12 rounded-none border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 font-bold"
                        >
                            {/* Google SVG here */}
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signIn("github")}
                            className="h-12 rounded-none border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 font-bold"
                        >
                            {/* GitHub SVG here */}
                            GitHub
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500 font-bold tracking-wider">
                                Or register with email
                            </span>
                        </div>
                    </div>

                    {/* RHF + Shadcn Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <Input
                                                        placeholder="John Doe"
                                                        className="pl-10 h-12 rounded-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <Input
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        className="pl-10 h-12 rounded-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="pl-10 h-12 rounded-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex items-center space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    required
                                    className="rounded-none border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all"
                                />
                                <span className="text-gray-500 font-medium">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms"
                                        className="text-indigo-600 font-bold hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="text-indigo-600 font-bold hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </span>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                                {!isLoading && (
                                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center text-sm font-medium text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href="/auth/sign-in"
                            className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline underline-offset-4 transition-all"
                        >
                            Sign in here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
