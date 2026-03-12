import React from 'react';

export const Blob = ({ className }: { className: string }) => (
    <div className={`absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${className}`} />
);
