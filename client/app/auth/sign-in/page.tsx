"use client"

import React from "react"
import { signIn, useSession } from "next-auth/react"

export default function Page() {
    const { data: session, status } = useSession();
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-gray-200 p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Welcome to Job Board 👋
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to post jobs or apply for opportunities
                    </p>
                </div>

                {/* GitHub Button */}
                <div className="mb-6">
                    <button
                        onClick={() => signIn("github")}
                        className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-300"
                    >
                        {/* GitHub SVG */}
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                   3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                   0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
                   -.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 
                   1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998 
                   .108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 
                   0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 
                   0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 
                   1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23 
                   .655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 
                   0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 
                   0 1.606-.014 2.896-.014 3.286 0 .321.216.694.825.576 
                   C20.565 22.092 24 17.592 24 12.297 
                   c0-6.627-5.373-12-12-12z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                {/* Footer Text */}
                <div className="text-center text-xs text-gray-500 leading-relaxed">
                    By signing in, you agree to our{" "}
                    <a
                        href="#"
                        className="font-medium text-gray-700 hover:text-black underline underline-offset-2 transition"
                    >
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="font-medium text-gray-700 hover:text-black underline underline-offset-2 transition"
                    >
                        Privacy Policy
                    </a>
                    .
                </div>
            </div>
        </div>
    )
}
