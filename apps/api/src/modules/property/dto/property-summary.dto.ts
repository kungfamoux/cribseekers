import { PropertyStatus, PropertyVisibility, ListingType, PricePeriod } from '@prisma/client';

export class PropertySummaryDto {
  id: string;
  title: string;
  categoryId: string;
  typeId: string;
  purposeId: string;
  listingType: ListingType;
  price: number;
  currency: string;
  pricePeriod: PricePeriod;
  bedrooms?: number;
  bathrooms?: number;
  locationId: string;
  status: PropertyStatus;
  visibility: PropertyVisibility;
  featured: boolean;
  views: number;
  inquiries: number;
  publishedAt?: Date;
  ownerId: string;
  createdAt: Date;
}
