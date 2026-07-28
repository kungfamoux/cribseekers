'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { CancellationDialog } from '@/components/inspections/CancellationDialog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function CancelInspectionPage() {
  const router = useRouter();
  const params = useParams();
  const inspectionId = params.id as string;
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  // Fetch inspection details
  const { data: inspection, isLoading } = useQuery({
    queryKey: ['inspection', inspectionId],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.INSPECTION_BY_ID(inspectionId));
      if (!response.ok) throw new Error('Failed to fetch inspection');
      return response.json();
    },
  });

  // Cancel mutation
  const cancelMutation = useMutation({
    mutationFn: async (reason: string) => {
      const response = await fetch(API_ENDPOINTS.INSPECTION_CANCEL(inspectionId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) throw new Error('Failed to cancel inspection');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Inspection cancelled successfully');
      router.push('/inspections');
    },
    onError: () => {
      toast.error('Failed to cancel inspection');
    },
  });

  const handleCancel = async (reason: string) => {
    cancelMutation.mutate(reason);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    router.back();
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href={`/inspections/${inspectionId}`}>
            <button className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 mb-4 body-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inspection Details
            </button>
          </Link>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Cancel Inspection</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Please provide a reason for cancelling this inspection
          </p>
        </div>

        {/* Current Info */}
        {inspection && (
          <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4 mb-6">
            <p className="body-sm text-forest-600 dark:text-forest-400">
              <strong>Inspection:</strong> {inspection.property?.title}
            </p>
            <p className="body-sm text-forest-600 dark:text-forest-400">
              <strong>Scheduled:</strong> {new Date(inspection.date).toLocaleDateString()} at {inspection.time}
            </p>
          </div>
        )}

        {/* Cancellation Dialog */}
        <CancellationDialog
          isOpen={isDialogOpen}
          onClose={handleClose}
          onConfirm={handleCancel}
          inspectionId={inspectionId}
        />
      </div>
    </DashboardLayout>
  );
}
