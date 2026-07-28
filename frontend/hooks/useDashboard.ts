import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

// Dashboard Stats
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    },
  });
}

// User Profile
export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ME);
      return response.data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await apiClient.patch(API_ENDPOINTS.UPDATE_PROFILE, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
}

// Saved Properties
export function useSavedProperties() {
  return useQuery({
    queryKey: ['saved', 'properties'],
    queryFn: async () => {
      const response = await apiClient.get('/saved/properties');
      return response.data;
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (propertyId: string) => {
      const response = await apiClient.post(`/properties/${propertyId}/favorite`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved', 'properties'] });
    },
  });
}

// Search History
export function useSearchHistory() {
  return useQuery({
    queryKey: ['search', 'history'],
    queryFn: async () => {
      const response = await apiClient.get('/search/history');
      return response.data;
    },
  });
}

// Recommendations
export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const response = await apiClient.get('/recommendations/personalized');
      return response.data;
    },
  });
}

// Notifications
export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS);
      return response.data;
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await apiClient.patch(API_ENDPOINTS.NOTIFICATION_MARK_READ(notificationId));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post('/notifications/read-all');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
  });
}

// Activity History
export function useActivityHistory() {
  return useQuery({
    queryKey: ['activity', 'history'],
    queryFn: async () => {
      const response = await apiClient.get('/activity/history');
      return response.data;
    },
  });
}
