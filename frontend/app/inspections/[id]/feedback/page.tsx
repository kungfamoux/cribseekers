'use client';

export const dynamic = 'force-dynamic';

import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { FeedbackForm } from '@/components/inspections/FeedbackForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery } from '@tanstack/react-query';

export default function InspectionFeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const inspectionId = params.id as string;

  // Fetch inspection details
  const { data: inspection, isLoading } = useQuery({
    queryKey: ['inspection', inspectionId],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.INSPECTION_BY_ID(inspectionId));
      if (!response.ok) throw new Error('Failed to fetch inspection');
      return response.json();
    },
  });

  const handleFeedbackSubmit = () => {
    // Feedback submission is handled in the FeedbackForm component
    router.push(`/inspections/${inspectionId}`);
  };

  const handleCancel = () => {
    router.push(`/inspections/${inspectionId}`);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-900" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/inspections/${inspectionId}`}>
            <button className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 mb-4 body-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inspection Details
            </button>
          </Link>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Rate Your Inspection</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Share your experience with the property and agent
          </p>
        </div>

        {/* Inspection Info */}
        {inspection && (
          <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4 mb-6">
            <p className="body-sm text-forest-600 dark:text-forest-400">
              <strong>Property:</strong> {inspection.property?.title}
            </p>
            <p className="body-sm text-forest-600 dark:text-forest-400">
              <strong>Date:</strong> {new Date(inspection.date).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Feedback Form */}
        <FeedbackForm
          inspectionId={inspectionId}
          onSubmit={handleFeedbackSubmit}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
}
