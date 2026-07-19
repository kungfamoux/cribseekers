import { UserMetrics } from '../types/analytics-result.type';

export class UserMetricsEntity implements UserMetrics {
  registrations: number;
  verificationStatus: Record<string, number>;
  loginActivity: number;
  userGrowth: Array<{ date: Date; count: number }>;
  agentPerformance: Array<{ agentId: string; name: string; propertiesListed: number; inspectionsCompleted: number; revenue: number }>;
  landlordPerformance: Array<{ landlordId: string; name: string; propertiesListed: number; revenue: number; averageRating: number }>;
  tenantActivity: Array<{ tenantId: string; name: string; inspectionsCompleted: number; paymentsMade: number }>;
  topUsers: Array<{ userId: string; name: string; activityScore: number }>;
  inactiveUsers: number;

  constructor(data?: Partial<UserMetrics>) {
    Object.assign(this, data);
  }
}
