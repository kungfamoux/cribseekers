import { RecommendationItem, RecommendationReason } from '../types/recommendation-result.type';

export class RecommendationItemEntity implements RecommendationItem {
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

  constructor(data: Partial<RecommendationItem>) {
    Object.assign(this, data);
  }
}
