'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { RescheduleDialog } from '@/components/inspections/RescheduleDialog';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function RescheduleInspectionPage() {
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

  // Fetch available slots
  const { data: availableSlots } = useQuery({
    queryKey: ['available-slots', inspectionId],
    queryFn: async () => {
      const response = await fetch(`${API_ENDPOINTS.INSPECTION_BY_ID(inspectionId)}/available-slots`);
      if (!response.ok) throw new Error('Failed to fetch available slots');
      return response.json();
    },
  });

  // Reschedule mutation
  const rescheduleMutation = useMutation({
    mutationFn: async ({ newDate, newTime }: { newDate: string; newTime: string }) => {
      const response = await fetch(API_ENDPOINTS.INSPECTION_RESCHEDULE(inspectionId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: newDate, time: newTime }),
      });
      if (!response.ok) throw new Error('Failed to reschedule inspection');
      return response.json();
    },
    onSuccess: () => {
      toast.success('Inspection rescheduled successfully');
      router.push(`/inspections/${inspectionId}`);
    },
    onError: () => {
      toast.error('Failed to reschedule inspection');
    },
  });

  const handleReschedule = async (newDate: string, newTime: string) => {
    rescheduleMutation.mutate({ newDate, newTime });
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
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Reschedule Inspection</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Choose a new date and time for your inspection
          </p>
        </div>

        {/* Current Info */}
        {inspection && (
          <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4 mb-6">
            <p className="body-sm text-forest-600 dark:text-forest-400">
              <strong>Current Schedule:</strong> {new Date(inspection.date).toLocaleDateString()} at {inspection.time}
            </p>
          </div>
        )}

        {/* Reschedule Dialog */}
        {inspection && availableSlots && (
          <RescheduleDialog
            isOpen={isDialogOpen}
            onClose={handleClose}
            onConfirm={handleReschedule}
            currentDate={inspection.date}
            currentTime={inspection.time}
            availableSlots={availableSlots}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
