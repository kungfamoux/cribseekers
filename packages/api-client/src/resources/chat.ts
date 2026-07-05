import { apiClient } from '../client';
import { PaginatedResponse } from '@cribseekers/types';

export interface SendMessageData {
  content: string;
  attachments?: string[];
}

export const chatResource = {
  conversations: (params?: any) => apiClient.get<PaginatedResponse<any>>('/chat/conversations', { params }),
  messages: (conversationId: string, params?: any) =>
    apiClient.get<PaginatedResponse<any>>(`/chat/conversations/${conversationId}/messages`, { params }),
  send: (conversationId: string, data: SendMessageData) =>
    apiClient.post<any>(`/chat/conversations/${conversationId}/messages`, data),
};
