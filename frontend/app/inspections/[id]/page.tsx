'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { InspectionSummary } from '@/components/inspections/InspectionSummary';
import { InspectionTimeline } from '@/components/inspections/InspectionTimeline';
import { InspectionQRCode } from '@/components/inspections/InspectionQRCode';
import { FeedbackForm } from '@/components/inspections/FeedbackForm';
import { ArrowLeft, MapPin, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function InspectionDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const inspectionId = params.id as string;
  const [showFeedback, setShowFeedback] = useState(false);

  // Fetch inspection details from backend
  const { data: inspection, isLoading, error } = useQuery({
    queryKey: ['inspection', inspectionId],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.INSPECTION_BY_ID(inspectionId));
      if (!response.ok) throw new Error('Failed to fetch inspection');
      return response.json();
    },
  });

  // Submit feedback mutation
  const feedbackMutation = useMutation({
    mutationFn: async (feedback: {
      propertyRating: number;
      agentRating: number;
      comment: string;
    }) => {
      const response = await fetch(`${API_ENDPOINTS.INSPECTION_BY_ID(inspectionId)}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Feedback submitted successfully');
      setShowFeedback(false);
    },
    onError: () => {
      toast.error('Failed to submit feedback');
    },
  });

  const handleReschedule = () => {
    router.push(`/inspections/${inspectionId}/reschedule`);
  };

  const handleCancel = () => {
    router.push(`/inspections/${inspectionId}/cancel`);
  };

  const handleContactAgent = () => {
    toast.success('Opening chat with agent');
  };

  const handleFeedbackSubmit = (feedback: {
    propertyRating: number;
    agentRating: number;
    comment: string;
  }) => {
    feedbackMutation.mutate(feedback);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-900 mx-auto mb-4" />
            <p className="body-sm text-forest-600 dark:text-forest-400">Loading inspection details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !inspection) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="body-md text-red-600 dark:text-red-400 mb-2">Failed to load inspection</p>
            <Link href="/inspections">
              <button className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium">
                Back to Inspections
              </button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const timelineEvents = [
    { id: '1', status: 'pending' as const, title: 'Booking Requested', description: 'Inspection was requested', timestamp: inspection.createdAt },
    { id: '2', status: inspection.status === 'cancelled' ? 'cancelled' as const : 'confirmed' as const, title: 'Confirmed', description: 'Inspection was confirmed', timestamp: inspection.confirmedAt },
    { id: '3', status: inspection.status === 'completed' ? 'completed' as const : 'pending' as const, title: 'Inspection Completed', description: 'Property inspection completed', timestamp: inspection.completedAt },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/inspections">
            <button className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 mb-4 body-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inspections
            </button>
          </Link>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Inspection Details</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            View and manage your property inspection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inspection Summary */}
            <InspectionSummary
              inspection={inspection}
              onContactAgent={handleContactAgent}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />

            {/* Timeline */}
            <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
              <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Inspection Timeline</h3>
              <InspectionTimeline events={timelineEvents} currentStatus={inspection.status} />
            </div>

            {/* Feedback Form */}
            {inspection.status === 'completed' && (
              showFeedback ? (
                <FeedbackForm
                  inspectionId={inspectionId}
                  onSubmit={handleFeedbackSubmit}
                  onCancel={() => setShowFeedback(false)}
                />
              ) : (
                <button
                  onClick={() => setShowFeedback(true)}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Rate This Inspection
                </button>
              )
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            {inspection.status === 'confirmed' && (
              <InspectionQRCode
                inspectionId={inspectionId}
                onDownload={() => toast.success('Downloading QR code')}
                onShare={() => toast.success('Sharing QR code')}
              />
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
              <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleContactAgent}
                  className="w-full inline-flex items-center px-4 py-3 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Agent
                </button>
                {inspection.status === 'confirmed' && (
                  <>
                    <button
                      onClick={handleReschedule}
                      className="w-full inline-flex items-center px-4 py-3 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={handleCancel}
                      className="w-full inline-flex items-center px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors body-md font-medium text-red-600 dark:text-red-400"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Directions */}
            {inspection.property?.address && (
              <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Location</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0 mt-0.5" />
                  <p className="body-sm text-forest-600 dark:text-forest-400">
                    {inspection.property.address}
                  </p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(inspection.property.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium"
                >
                  Get Directions
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
