import { apiClient } from '../client';
import { PaginatedResponse } from '@cribseekers/types';

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

export const notificationsResource = {
  list: (params?: any) => apiClient.get<PaginatedResponse<any>>('/notifications', { params }),
  markRead: (id: string) => apiClient.post<void>(`/notifications/${id}/read`),
  markAllRead: () => apiClient.post<void>('/notifications/read-all'),
  settings: () => apiClient.get<NotificationSettings>('/notifications/settings'),
  updateSettings: (data: NotificationSettings) => apiClient.put<NotificationSettings>('/notifications/settings', data),
};
