import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';

// Search Types
export interface SearchFilters {
  keyword?: string;
  state?: string;
  city?: string;
  lga?: string;
  estate?: string;
  category?: string;
  type?: string;
  purpose?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  images: string[];
  type: string;
  category: string;
  purpose: string;
  status: string;
}

// Global search
export function useGlobalSearch(filters: SearchFilters) {
  return useQuery({
    queryKey: ['search', 'global', filters],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_GLOBAL, { params: filters });
      return response.data;
    },
    enabled: Object.keys(filters).length > 0,
  });
}

// Keyword search
export function useKeywordSearch(keyword: string) {
  return useQuery({
    queryKey: ['search', 'keyword', keyword],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_KEYWORD, { params: { keyword } });
      return response.data;
    },
    enabled: !!keyword && keyword.length > 2,
  });
}

// Popular searches
export function usePopularSearches() {
  return useQuery({
    queryKey: ['search', 'popular'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_POPULAR);
      return response.data;
    },
  });
}

// Recent searches
export function useRecentSearches() {
  return useQuery({
    queryKey: ['search', 'recent'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_RECENT);
      return response.data;
    },
  });
}

// Search suggestions
export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ['search', 'suggestions', query],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_SUGGESTIONS, { params: { query } });
      return response.data;
    },
    enabled: !!query && query.length > 2,
  });
}

// Search by state
export function useSearchByState(state: string, filters?: SearchFilters) {
  return useQuery({
    queryKey: ['search', 'state', state, filters],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_STATE(state), { params: filters });
      return response.data;
    },
    enabled: !!state,
  });
}

// Search by city
export function useSearchByCity(city: string, filters?: SearchFilters) {
  return useQuery({
    queryKey: ['search', 'city', city, filters],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_CITY(city), { params: filters });
      return response.data;
    },
    enabled: !!city,
  });
}

// Search by category
export function useSearchByCategory(categoryId: string, filters?: SearchFilters) {
  return useQuery({
    queryKey: ['search', 'category', categoryId, filters],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_CATEGORY(categoryId), { params: filters });
      return response.data;
    },
    enabled: !!categoryId,
  });
}

// Featured properties
export function useFeaturedSearch() {
  return useQuery({
    queryKey: ['search', 'featured'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_FEATURED);
      return response.data;
    },
  });
}
