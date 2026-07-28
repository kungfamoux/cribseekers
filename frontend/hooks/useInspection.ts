import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

export interface CreateInspectionData {
  propertyId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface RescheduleInspectionData {
  newDate: string;
  newTime: string;
  reason?: string;
}

// Get all inspections
export function useInspections() {
  return useQuery({
    queryKey: ['inspections'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.INSPECTIONS);
      return response.data;
    },
  });
}

// Get inspection by ID
export function useInspection(id: string) {
  return useQuery({
    queryKey: ['inspection', id],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.INSPECTION_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Get inspections by user
export function useInspectionsByUser(userId: string) {
  return useQuery({
    queryKey: ['inspections', 'user', userId],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.INSPECTION_BY_USER(userId));
      return response.data;
    },
    enabled: !!userId,
  });
}

// Get inspections by property
export function useInspectionsByProperty(propertyId: string) {
  return useQuery({
    queryKey: ['inspections', 'property', propertyId],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.INSPECTION_BY_PROPERTY(propertyId));
      return response.data;
    },
    enabled: !!propertyId,
  });
}

// Create inspection
export function useCreateInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInspectionData) => {
      const response = await apiClient.post(API_ENDPOINTS.INSPECTIONS, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      toast.success('Inspection booked successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to book inspection', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Confirm inspection
export function useConfirmInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.INSPECTION_CONFIRM(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      toast.success('Inspection confirmed successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to confirm inspection', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Cancel inspection
export function useCancelInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const response = await apiClient.post(API_ENDPOINTS.INSPECTION_CANCEL(id), { reason });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      toast.success('Inspection cancelled successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to cancel inspection', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Reschedule inspection
export function useRescheduleInspection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: RescheduleInspectionData }) => {
      const response = await apiClient.post(API_ENDPOINTS.INSPECTION_RESCHEDULE(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      toast.success('Inspection rescheduled successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to reschedule inspection', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}
