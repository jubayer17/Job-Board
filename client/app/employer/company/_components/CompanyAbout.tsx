interface CompanyAboutProps {
    description?: string;
}

export default function CompanyAbout({ description }: CompanyAboutProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About Company</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
                {description ? (
                    <p className="whitespace-pre-line leading-relaxed">{description}</p>
                ) : (
                    <p className="text-gray-400 italic">No description provided.</p>
                )}
            </div>
        </div>
    );
}
