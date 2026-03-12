import React from 'react';

interface SearchInputProps {
    icon: React.ElementType;
    placeholder: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ icon: Icon, placeholder, className = "", value, onChange }: SearchInputProps) => (
    <div className={`flex-1 flex items-center px-6 h-16 bg-white/50 ${className}`}>
        <Icon className="h-5 w-5 text-gray-400 mr-4" />
        <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none ring-0 text-gray-900 placeholder-gray-400 text-sm font-medium uppercase tracking-wide"
            value={value}
            onChange={onChange}
        />
    </div>
);
