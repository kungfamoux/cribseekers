import { DashboardMetrics } from '../types/analytics-result.type';

export class DashboardMetricsEntity implements DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  verifiedUsers: number;
  landlords: number;
  agents: number;
  tenants: number;
  propertiesListed: number;
  propertiesVerified: number;
  propertiesRented: number;
  propertiesAvailable: number;
  featuredProperties: number;
  inspectionRequests: number;
  completedInspections: number;
  cancelledInspections: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  commissionEarned: number;
  averageRentPrice: number;
  averageInspectionCompletionTime: number;
  averageResponseTime: number;
  chatActivity: number;
  searchActivity: number;
  recommendationEngagement: number;

  constructor(data?: Partial<DashboardMetrics>) {
    Object.assign(this, data);
  }
}
