import React from 'react';

export default function JobApplicantsPage({ params }: { params: Promise<{ jobId: string }> }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>
      <p className="text-gray-500">Applicants for this job will be displayed here.</p>
    </div>
  );
}
