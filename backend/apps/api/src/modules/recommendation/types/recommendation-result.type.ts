export interface RecommendationResult {
  id: string;
  propertyId: string;
  userId: string;
  score: number;
  reasons: RecommendationReason[];
  strategy: string;
  generatedAt: Date;
}

export interface RecommendationReason {
  type: string;
  description: string;
  weight: number;
  contribution: number;
}

export interface RecommendationItem {
  propertyId: string;
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
  score: number;
  reasons: RecommendationReason[];
}

export interface RecommendationExplanation {
  propertyId: string;
  score: number;
  factors: RecommendationFactor[];
  generatedAt: Date;
}

export interface RecommendationFactor {
  name: string;
  value: number;
  weight: number;
  contribution: number;
  description: string;
}

export interface RecommendationFeedback {
  id: string;
  propertyId: string;
  userId: string;
  type: 'like' | 'dislike' | 'hide' | 'save';
  createdAt: Date;
}
