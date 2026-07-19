export interface AnalyticsFilter {
  startDate?: Date;
  endDate?: Date;
  period?: string;
  userId?: string;
  propertyId?: string;
  categoryId?: string;
  typeId?: string;
  purposeId?: string;
  state?: string;
  city?: string;
  lga?: string;
  district?: string;
  status?: string;
  role?: string;
}

export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
  timezone?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface GroupByOptions {
  field: string;
  interval?: 'hour' | 'day' | 'week' | 'month' | 'year';
}

export interface MetricFilter {
  metric?: string;
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max';
}
