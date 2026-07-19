export interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  pricePeriod?: string;
  categoryId: string;
  typeId: string;
  purposeId: string;
  locationId: string;
  state: string;
  city: string;
  lga?: string;
  district?: string;
  estate?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  squareMeters?: number;
  status: string;
  featured: boolean;
  verified: boolean;
  views: number;
  publishedAt: Date;
  distance?: number;
  thumbnailUrl?: string;
}

export interface SearchSuggestion {
  id: string;
  type: 'state' | 'city' | 'lga' | 'estate' | 'district';
  name: string;
  state?: string;
  city?: string;
  count: number;
}
