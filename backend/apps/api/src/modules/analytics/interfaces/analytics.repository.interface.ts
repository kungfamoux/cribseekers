import {
  DashboardMetrics,
  RevenueMetrics,
  PropertyMetrics,
  UserMetrics,
  PaymentMetrics,
  InspectionMetrics,
  SearchMetrics,
  ChatMetrics,
  RecommendationMetrics,
} from '../types/analytics-result.type';
import { AnalyticsFilter, DateRangeFilter, GroupByOptions } from '../types/analytics-filter.type';

export interface IAnalyticsRepository {
  // Dashboard
  getDashboardMetrics(filter?: AnalyticsFilter): Promise<DashboardMetrics>;
  
  // Revenue
  getRevenueMetrics(filter?: DateRangeFilter): Promise<RevenueMetrics>;
  
  // Properties
  getPropertyMetrics(filter?: AnalyticsFilter): Promise<PropertyMetrics>;
  
  // Users
  getUserMetrics(filter?: AnalyticsFilter): Promise<UserMetrics>;
  
  // Payments
  getPaymentMetrics(filter?: DateRangeFilter): Promise<PaymentMetrics>;
  
  // Inspections
  getInspectionMetrics(filter?: AnalyticsFilter): Promise<InspectionMetrics>;
  
  // Search
  getSearchMetrics(filter?: AnalyticsFilter): Promise<SearchMetrics>;
  
  // Chat
  getChatMetrics(filter?: AnalyticsFilter): Promise<ChatMetrics>;
  
  // Recommendations
  getRecommendationMetrics(filter?: AnalyticsFilter): Promise<RecommendationMetrics>;
  
  // Aggregation helpers
  aggregateByField(
    model: string,
    field: string,
    filter?: AnalyticsFilter,
    groupBy?: GroupByOptions,
  ): Promise<Record<string, number>>;
  
  countByField(
    model: string,
    field: string,
    filter?: AnalyticsFilter,
  ): Promise<number>;
  
  sumByField(
    model: string,
    field: string,
    filter?: AnalyticsFilter,
  ): Promise<number>;
  
  averageByField(
    model: string,
    field: string,
    filter?: AnalyticsFilter,
  ): Promise<number>;
}
