import { SearchMetrics } from '../types/analytics-result.type';

export class SearchMetricsEntity implements SearchMetrics {
  mostSearchedLocations: Array<{ location: string; count: number }>;
  popularSearches: Array<{ query: string; count: number }>;
  savedSearches: number;
  searchConversions: number;
  noResultSearches: number;

  constructor(data?: Partial<SearchMetrics>) {
    Object.assign(this, data);
  }
}
