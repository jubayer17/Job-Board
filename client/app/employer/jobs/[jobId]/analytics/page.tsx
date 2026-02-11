import React from 'react';

export default function JobAnalyticsPage({ params }: { params: Promise<{ jobId: string }> }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Analytics</h1>
      <p className="text-gray-500">Analytics for this job will be displayed here.</p>
    </div>
  );
}
