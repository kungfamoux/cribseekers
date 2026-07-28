export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'land' | 'commercial' | 'office' | 'warehouse';
  category: 'residential' | 'commercial' | 'industrial' | 'agricultural';
  purpose: 'rent' | 'sale' | 'short_term';
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    state: string;
    lga?: string;
    estate?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    toilets?: number;
    parkingSpaces?: number;
    area: number;
    areaUnit: string;
    size?: number;
    sizeUnit?: string;
    furnished?: boolean;
    serviced?: boolean;
  };
  amenities: string[];
  images: string[];
  videos?: string[];
  documents?: string[];
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
  isFeatured: boolean;
  views: number;
  favorites: number;
  inquiries: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  createdBy: string;
  availability?: {
    available: boolean;
    availableFrom?: string;
    availableTo?: string;
    blockedDates?: string[];
  };
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
  address?: {
    street: string;
    city: string;
    state: string;
    lga?: string;
    estate?: string;
    postalCode?: string;
  };
  agent?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
}

export interface PropertyFormData {
  title: string;
  description: string;
  type: string;
  category: string;
  purpose: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  lga?: string;
  estate?: string;
  lat?: number;
  lng?: number;
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  parkingSpaces?: number;
  area: number;
  areaUnit: string;
  amenities: string[];
  rules?: string[];
  availability?: {
    available: boolean;
    availableFrom?: string;
    availableTo?: string;
  };
}

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface PropertyDocument {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface PropertyFilters {
  type?: string[];
  category?: string[];
  purpose?: string[];
  state?: string[];
  city?: string[];
  lga?: string[];
  estate?: string[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean;
  serviced?: boolean;
  verified?: boolean;
}
