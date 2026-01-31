import React from "react"

type LoadingProps = {
    variant?: "navbar" | "button" | "page"
}

export default function Loading({ variant = "page" }: LoadingProps) {
    if (variant === "navbar") {
        return (
            <div className="flex items-center gap-4">
                <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
        )
    }

    if (variant === "button") {
        return (
            <div className="h-9 w-24 bg-gray-200 rounded-full animate-pulse" />
        )
    }

    // default = full page loader
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
        </div>
    )
}
