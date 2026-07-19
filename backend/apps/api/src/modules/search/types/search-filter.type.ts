export interface SearchFilter {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  serviced?: boolean;
  verified?: boolean;
  featured?: boolean;
  purpose?: string;
  propertyType?: string;
  category?: string;
  state?: string;
  city?: string;
  lga?: string;
  estate?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export interface GeoSearchFilter extends SearchFilter {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface SortOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  skip?: number;
}
