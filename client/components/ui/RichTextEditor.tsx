"use client";

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
    value: string | null | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, error, className }: RichTextEditorProps) {
    const modules = {
        toolbar: [
            [{ 'header': [3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    return (
        <div className={`rich-text-editor ${className || ''}`}>
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                className="bg-white"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    font-family: inherit;
                    font-size: 0.875rem; /* text-sm */
                }
                .rich-text-editor .ql-editor {
                    min-height: 150px;
                }
                .rich-text-editor .ql-toolbar.ql-snow {
                    border-color: #d1d5db; /* border-gray-300 */
                    border-radius: 0;
                }
                .rich-text-editor .ql-container.ql-snow {
                    border-color: #d1d5db; /* border-gray-300 */
                    border-radius: 0;
                }
                .rich-text-editor .ql-container.ql-snow.ql-disabled {
                    background-color: #f9fafb; /* bg-gray-50 */
                }
             `}</style>
        </div>
    );
}
