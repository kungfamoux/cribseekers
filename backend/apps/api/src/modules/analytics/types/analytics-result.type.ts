export interface DashboardMetrics {
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
}

export interface RevenueMetrics {
  totalRevenue: number;
  escrowBalance: number;
  walletBalance: number;
  completedPayments: number;
  refundTotal: number;
  withdrawalTotal: number;
  settlementTotal: number;
  outstandingBalance: number;
  paymentGatewaySuccessRate: number;
  commissionEarned: number;
  monthlyRecurringRevenue: number;
}

export interface PropertyMetrics {
  totalListings: number;
  byState: Record<string, number>;
  byCity: Record<string, number>;
  byLga: Record<string, number>;
  byCategory: Record<string, number>;
  byType: Record<string, number>;
  byPurpose: Record<string, number>;
  priceDistribution: PriceBucket[];
  verificationStatistics: VerificationStats;
  availability: AvailabilityStats;
  mostViewed: TopProperty[];
  mostFavorited: TopProperty[];
  mostContacted: TopProperty[];
  mostInspected: TopProperty[];
}

export interface UserMetrics {
  registrations: number;
  verificationStatus: Record<string, number>;
  loginActivity: number;
  userGrowth: GrowthData[];
  agentPerformance: AgentStats[];
  landlordPerformance: LandlordStats[];
  tenantActivity: TenantStats[];
  topUsers: TopUser[];
  inactiveUsers: number;
}

export interface PaymentMetrics {
  revenue: number;
  escrow: number;
  walletActivity: number;
  refunds: number;
  withdrawals: number;
  settlements: number;
  outstandingBalances: number;
  paymentGatewaySuccessRate: number;
  byPeriod: PeriodMetrics[];
}

export interface InspectionMetrics {
  scheduled: number;
  completed: number;
  cancelled: number;
  averageCompletionTime: number;
  inspectorPerformance: InspectorStats[];
  propertyInspectionFrequency: PropertyInspectionStats[];
}

export interface SearchMetrics {
  mostSearchedLocations: LocationSearchStats[];
  popularSearches: PopularSearch[];
  savedSearches: number;
  searchConversions: number;
  noResultSearches: number;
}

export interface ChatMetrics {
  messagesSent: number;
  activeConversations: number;
  averageResponseTime: number;
  unreadMessages: number;
  conversationGrowth: GrowthData[];
}

export interface RecommendationMetrics {
  clickThroughRate: number;
  acceptanceRate: number;
  rejectionRate: number;
  mostEffectiveStrategy: string;
  strategyPerformance: StrategyStats[];
}

export interface PriceBucket {
  min: number;
  max: number;
  count: number;
}

export interface VerificationStats {
  verified: number;
  pending: number;
  rejected: number;
  rate: number;
}

export interface AvailabilityStats {
  available: number;
  rented: number;
  unavailable: number;
}

export interface TopProperty {
  propertyId: string;
  title: string;
  count: number;
}

export interface GrowthData {
  date: Date;
  count: number;
}

export interface AgentStats {
  agentId: string;
  name: string;
  propertiesListed: number;
  inspectionsCompleted: number;
  revenue: number;
}

export interface LandlordStats {
  landlordId: string;
  name: string;
  propertiesListed: number;
  revenue: number;
  averageRating: number;
}

export interface TenantStats {
  tenantId: string;
  name: string;
  inspectionsCompleted: number;
  paymentsMade: number;
}

export interface TopUser {
  userId: string;
  name: string;
  activityScore: number;
}

export interface PeriodMetrics {
  period: string;
  revenue: number;
  count: number;
}

export interface InspectorStats {
  inspectorId: string;
  name: string;
  completedInspections: number;
  averageRating: number;
  averageCompletionTime: number;
}

export interface PropertyInspectionStats {
  propertyId: string;
  title: string;
  inspectionCount: number;
}

export interface LocationSearchStats {
  location: string;
  count: number;
}

export interface PopularSearch {
  query: string;
  count: number;
}

export interface StrategyStats {
  strategy: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}
