import { PropertyMetrics } from '../types/analytics-result.type';

export class PropertyMetricsEntity implements PropertyMetrics {
  totalListings: number;
  byState: Record<string, number>;
  byCity: Record<string, number>;
  byLga: Record<string, number>;
  byCategory: Record<string, number>;
  byType: Record<string, number>;
  byPurpose: Record<string, number>;
  priceDistribution: Array<{ min: number; max: number; count: number }>;
  verificationStatistics: { verified: number; pending: number; rejected: number; rate: number };
  availability: { available: number; rented: number; unavailable: number };
  mostViewed: Array<{ propertyId: string; title: string; count: number }>;
  mostFavorited: Array<{ propertyId: string; title: string; count: number }>;
  mostContacted: Array<{ propertyId: string; title: string; count: number }>;
  mostInspected: Array<{ propertyId: string; title: string; count: number }>;

  constructor(data?: Partial<PropertyMetrics>) {
    Object.assign(this, data);
  }
}
