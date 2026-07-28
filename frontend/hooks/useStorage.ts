import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

// Storage Types
export interface UploadFileData {
  file: File;
  folder?: string;
  metadata?: Record<string, unknown>;
}

export interface StorageFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  folder?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// Upload single file
export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadFileData) => {
      const formData = new FormData();
      formData.append('file', data.file);
      if (data.folder) formData.append('folder', data.folder);
      if (data.metadata) formData.append('metadata', JSON.stringify(data.metadata));

      const response = await apiClient.post(API_ENDPOINTS.STORAGE_UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storage'] });
      toast.success('File uploaded successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to upload file', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Upload multiple files
export function useUploadBulk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { files: File[]; folder?: string }) => {
      const formData = new FormData();
      data.files.forEach((file) => formData.append('files', file));
      if (data.folder) formData.append('folder', data.folder);

      const response = await apiClient.post(API_ENDPOINTS.STORAGE_UPLOAD_BULK, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storage'] });
      toast.success('Files uploaded successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to upload files', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Delete file
export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(API_ENDPOINTS.STORAGE_DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storage'] });
      toast.success('File deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to delete file', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Update file
export function useUpdateFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<StorageFile> }) => {
      const response = await apiClient.put(API_ENDPOINTS.STORAGE_UPDATE(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storage'] });
      toast.success('File updated successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to update file', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Get signed URL
export function useGetSignedUrl() {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.get(API_ENDPOINTS.STORAGE_SIGNED_URL(id));
      return response.data;
    },
    onError: (error: unknown) => {
      toast.error('Failed to get signed URL', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}
