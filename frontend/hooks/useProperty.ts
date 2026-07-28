import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

export interface PropertyFormData {
  title: string;
  description: string;
  type: string;
  category: string;
  purpose: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  lga?: string;
  estate?: string;
  lat?: number;
  lng?: number;
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  parkingSpaces?: number;
  area: number;
  areaUnit: string;
  amenities: string[];
  rules?: string[];
  availability?: {
    available: boolean;
    availableFrom?: string;
    availableTo?: string;
  };
}

// Get all properties
export function useProperties(filters?: {
  status?: string;
  type?: string;
  category?: string;
  purpose?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTIES, { params: filters });
      return response.data;
    },
  });
}

// Get published properties
export function usePublishedProperties() {
  return useQuery({
    queryKey: ['properties', 'published'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTY_PUBLISHED);
      return response.data;
    },
  });
}

// Get draft properties
export function useDraftProperties() {
  return useQuery({
    queryKey: ['properties', 'drafts'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTY_DRAFTS);
      return response.data;
    },
  });
}

// Get pending properties
export function usePendingProperties() {
  return useQuery({
    queryKey: ['properties', 'pending'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTY_PENDING);
      return response.data;
    },
  });
}

// Get rejected properties
export function useRejectedProperties() {
  return useQuery({
    queryKey: ['properties', 'rejected'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTY_REJECTED);
      return response.data;
    },
  });
}

// Get single property
export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTY_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Get property analytics
export function usePropertyAnalytics(id: string) {
  return useQuery({
    queryKey: ['property', id, 'analytics'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PROPERTY_ANALYTICS(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Create property
export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_CREATE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property created successfully', {
        description: 'Your property has been saved as a draft',
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to create property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Update property
export function useUpdateProperty(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<PropertyFormData>) => {
      const response = await apiClient.put(API_ENDPOINTS.PROPERTY_UPDATE(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property updated successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Delete property
export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(API_ENDPOINTS.PROPERTY_DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to delete property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Publish property
export function usePublishProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_PUBLISH(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property published successfully', {
        description: 'Your property is now visible to users',
      });
    },
    onError: (error: unknown) => {
      toast.error('Failed to publish property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Unpublish property
export function useUnpublishProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_UNPUBLISH(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property unpublished successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to unpublish property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Archive property
export function useArchiveProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_ARCHIVE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property archived successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to archive property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Duplicate property
export function useDuplicateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_DUPLICATE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property duplicated successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to duplicate property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Feature property
export function useFeatureProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_FEATURE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property featured successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to feature property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Unfeature property
export function useUnfeatureProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.PROPERTY_UNFEATURE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property unfeatured successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to unfeature property', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}
