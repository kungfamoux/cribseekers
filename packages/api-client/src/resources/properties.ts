import { apiClient } from '../client';
import { PaginatedResponse } from '@cribseekers/types';

export interface PropertySearchParams {
  page?: number;
  limit?: number;
  query?: string;
  type?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  state?: string;
  city?: string;
}

export const propertiesResource = {
  list: (params?: PropertySearchParams) => apiClient.get<PaginatedResponse<any>>('/properties', { params }),
  get: (id: string) => apiClient.get<any>(`/properties/${id}`),
  create: (data: any) => apiClient.post<any>('/properties', data),
  update: (id: string, data: any) => apiClient.put<any>(`/properties/${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/properties/${id}`),
  myProperties: (params?: PropertySearchParams) => apiClient.get<PaginatedResponse<any>>('/properties/my', { params }),
  search: (params?: PropertySearchParams) => apiClient.get<PaginatedResponse<any>>('/properties/search', { params }),
  nearby: (latitude: number, longitude: number, radius?: number) =>
    apiClient.get<PaginatedResponse<any>>('/properties/nearby', { params: { latitude, longitude, radius } }),
};
