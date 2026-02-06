"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function EmailInput({ label = "Email Address", className, ...props }: EmailInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-gray-500">
                {label}
            </Label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className={`pl-10 h-12 rounded-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition-all ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
}
