import { apiClient } from '../client';
import { PaginatedResponse } from '@cribseekers/types';

export interface InitializePaymentData {
  amount: number;
  reference: string;
  metadata?: any;
}

export const paymentsResource = {
  list: (params?: any) => apiClient.get<PaginatedResponse<any>>('/payments', { params }),
  get: (id: string) => apiClient.get<any>(`/payments/${id}`),
  initialize: (data: InitializePaymentData) => apiClient.post<any>('/payments/initialize', data),
  verify: (reference: string) => apiClient.post<any>(`/payments/verify/${reference}`),
  refund: (id: string, data?: any) => apiClient.post<void>(`/payments/${id}/refund`, data),
};
