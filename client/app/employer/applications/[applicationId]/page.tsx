import React from 'react';

export default function ApplicationDetailsPage({ params }: { params: Promise<{ applicationId: string }> }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <p className="text-gray-500">Details for application will be displayed here.</p>
    </div>
  );
}
