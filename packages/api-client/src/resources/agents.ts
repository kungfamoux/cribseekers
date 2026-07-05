import { apiClient } from '../client';
import { PaginatedResponse } from '@cribseekers/types';

export const agentsResource = {
  list: (params?: any) => apiClient.get<PaginatedResponse<any>>('/agents', { params }),
  get: (id: string) => apiClient.get<any>(`/agents/${id}`),
  verify: (id: string) => apiClient.post<void>(`/agents/${id}/verify`),
  reviews: (id: string, params?: any) => apiClient.get<PaginatedResponse<any>>(`/agents/${id}/reviews`, { params }),
};
