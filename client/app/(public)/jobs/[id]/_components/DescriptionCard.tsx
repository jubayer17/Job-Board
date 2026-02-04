import React from "react";

interface DescriptionCardProps {
    description: string;
}

export const DescriptionCard = ({ description }: DescriptionCardProps) => {
    return (
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Job Description
            </h2>
            <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {description}
            </div>
        </div>
    );
};
