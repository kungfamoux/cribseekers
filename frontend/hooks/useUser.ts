import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
  address?: string;
  state?: string;
  lga?: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// Get current user
export function useMe() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.ME);
      return response.data;
    },
  });
}

// Update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update profile', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Change password
export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD_USER, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to change password', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Upload avatar
export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await apiClient.post(API_ENDPOINTS.UPLOAD_AVATAR, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      toast.success('Avatar uploaded successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to upload avatar', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Submit KYC
export function useSubmitKYC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiClient.post(API_ENDPOINTS.KYC_SUBMIT, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'kyc-status'] });
      toast.success('KYC submitted successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to submit KYC', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Get KYC status
export function useKYCStatus() {
  return useQuery({
    queryKey: ['user', 'kyc-status'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.KYC_STATUS);
      return response.data;
    },
  });
}
