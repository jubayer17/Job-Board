import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const ResponsibilitiesCard = () => {
    return (
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Key Responsibilities
            </h2>
            <ul className="space-y-3">
                {[
                    "Design and implement scalable software solutions",
                    "Collaborate with cross-functional teams",
                    "Write clean, maintainable, and efficient code",
                    "Participate in code reviews and architectural discussions"
                ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                        <CheckCircleIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
