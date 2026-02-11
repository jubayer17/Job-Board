import React from 'react';

export default function EditJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <p className="text-gray-500">Job editing form will be displayed here.</p>
    </div>
  );
}
