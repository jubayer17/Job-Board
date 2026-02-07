import React from "react";

interface InfoCardProps {
    title: string;
    content: string | null | undefined;
}

export const InfoCard = ({ title, content }: InfoCardProps) => {
    if (!content) return null;

    return (
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                {title}
            </h2>
            <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {content}
            </div>
        </div>
    );
};
