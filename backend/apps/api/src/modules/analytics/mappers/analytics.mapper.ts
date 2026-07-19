import { DashboardDto } from '../dto/dashboard.dto';
import { DashboardMetricsEntity } from '../entities/dashboard-metrics.entity';
import { RevenueReportDto } from '../dto/revenue-report.dto';
import { RevenueMetricsEntity } from '../entities/revenue-metrics.entity';
import { PropertyReportDto, PriceBucketDto, TopPropertyDto } from '../dto/property-report.dto';
import { PropertyMetricsEntity } from '../entities/property-metrics.entity';
import { UserReportDto, GrowthDataDto, AgentStatsDto, LandlordStatsDto, TenantStatsDto, TopUserDto } from '../dto/user-report.dto';
import { UserMetricsEntity } from '../entities/user-metrics.entity';
import { PaymentReportDto, PeriodMetricsDto } from '../dto/payment-report.dto';
import { PaymentMetricsEntity } from '../entities/payment-metrics.entity';
import { InspectionReportDto, InspectorStatsDto, PropertyInspectionStatsDto } from '../dto/inspection-report.dto';
import { InspectionMetricsEntity } from '../entities/inspection-metrics.entity';
import { SearchReportDto, LocationSearchStatsDto, PopularSearchDto } from '../dto/search-report.dto';
import { SearchMetricsEntity } from '../entities/search-metrics.entity';
import { ChatReportDto, GrowthDataDto as ChatGrowthDataDto } from '../dto/chat-report.dto';
import { ChatMetricsEntity } from '../entities/chat-metrics.entity';
import { RecommendationReportDto, StrategyStatsDto } from '../dto/recommendation-report.dto';
import { RecommendationMetricsEntity } from '../entities/recommendation-metrics.entity';

export class AnalyticsMapper {
  static toDashboardDto(entity: DashboardMetricsEntity): DashboardDto {
    const dto = new DashboardDto();
    dto.totalUsers = entity.totalUsers;
    dto.activeUsers = entity.activeUsers;
    dto.newUsers = entity.newUsers;
    dto.verifiedUsers = entity.verifiedUsers;
    dto.landlords = entity.landlords;
    dto.agents = entity.agents;
    dto.tenants = entity.tenants;
    dto.propertiesListed = entity.propertiesListed;
    dto.propertiesVerified = entity.propertiesVerified;
    dto.propertiesRented = entity.propertiesRented;
    dto.propertiesAvailable = entity.propertiesAvailable;
    dto.featuredProperties = entity.featuredProperties;
    dto.inspectionRequests = entity.inspectionRequests;
    dto.completedInspections = entity.completedInspections;
    dto.cancelledInspections = entity.cancelledInspections;
    dto.totalRevenue = entity.totalRevenue;
    dto.monthlyRecurringRevenue = entity.monthlyRecurringRevenue;
    dto.commissionEarned = entity.commissionEarned;
    dto.averageRentPrice = entity.averageRentPrice;
    dto.averageInspectionCompletionTime = entity.averageInspectionCompletionTime;
    dto.averageResponseTime = entity.averageResponseTime;
    dto.chatActivity = entity.chatActivity;
    dto.searchActivity = entity.searchActivity;
    dto.recommendationEngagement = entity.recommendationEngagement;
    return dto;
  }

  static toRevenueReportDto(entity: RevenueMetricsEntity): RevenueReportDto {
    const dto = new RevenueReportDto();
    dto.totalRevenue = entity.totalRevenue;
    dto.escrowBalance = entity.escrowBalance;
    dto.walletBalance = entity.walletBalance;
    dto.completedPayments = entity.completedPayments;
    dto.refundTotal = entity.refundTotal;
    dto.withdrawalTotal = entity.withdrawalTotal;
    dto.settlementTotal = entity.settlementTotal;
    dto.outstandingBalance = entity.outstandingBalance;
    dto.paymentGatewaySuccessRate = entity.paymentGatewaySuccessRate;
    dto.commissionEarned = entity.commissionEarned;
    dto.monthlyRecurringRevenue = entity.monthlyRecurringRevenue;
    return dto;
  }

  static toPropertyReportDto(entity: PropertyMetricsEntity): PropertyReportDto {
    const dto = new PropertyReportDto();
    dto.totalListings = entity.totalListings;
    dto.byState = entity.byState;
    dto.byCity = entity.byCity;
    dto.byLga = entity.byLga;
    dto.byCategory = entity.byCategory;
    dto.byType = entity.byType;
    dto.byPurpose = entity.byPurpose;
    dto.priceDistribution = entity.priceDistribution.map(p => {
      const bucket = new PriceBucketDto();
      bucket.min = p.min;
      bucket.max = p.max;
      bucket.count = p.count;
      return bucket;
    });
    dto.verificationStatistics = {
      verified: entity.verificationStatistics.verified,
      pending: entity.verificationStatistics.pending,
      rejected: entity.verificationStatistics.rejected,
      rate: entity.verificationStatistics.rate,
    };
    dto.availability = {
      available: entity.availability.available,
      rented: entity.availability.rented,
      unavailable: entity.availability.unavailable,
    };
    dto.mostViewed = entity.mostViewed.map(p => {
      const top = new TopPropertyDto();
      top.propertyId = p.propertyId;
      top.title = p.title;
      top.count = p.count;
      return top;
    });
    dto.mostFavorited = entity.mostFavorited.map(p => {
      const top = new TopPropertyDto();
      top.propertyId = p.propertyId;
      top.title = p.title;
      top.count = p.count;
      return top;
    });
    dto.mostContacted = entity.mostContacted.map(p => {
      const top = new TopPropertyDto();
      top.propertyId = p.propertyId;
      top.title = p.title;
      top.count = p.count;
      return top;
    });
    dto.mostInspected = entity.mostInspected.map(p => {
      const top = new TopPropertyDto();
      top.propertyId = p.propertyId;
      top.title = p.title;
      top.count = p.count;
      return top;
    });
    return dto;
  }

  static toUserReportDto(entity: UserMetricsEntity): UserReportDto {
    const dto = new UserReportDto();
    dto.registrations = entity.registrations;
    dto.verificationStatus = entity.verificationStatus;
    dto.loginActivity = entity.loginActivity;
    dto.userGrowth = entity.userGrowth.map(g => {
      const growth = new GrowthDataDto();
      growth.date = g.date;
      growth.count = g.count;
      return growth;
    });
    dto.agentPerformance = entity.agentPerformance.map(a => {
      const stats = new AgentStatsDto();
      stats.agentId = a.agentId;
      stats.name = a.name;
      stats.propertiesListed = a.propertiesListed;
      stats.inspectionsCompleted = a.inspectionsCompleted;
      stats.revenue = a.revenue;
      return stats;
    });
    dto.landlordPerformance = entity.landlordPerformance.map(l => {
      const stats = new LandlordStatsDto();
      stats.landlordId = l.landlordId;
      stats.name = l.name;
      stats.propertiesListed = l.propertiesListed;
      stats.revenue = l.revenue;
      stats.averageRating = l.averageRating;
      return stats;
    });
    dto.tenantActivity = entity.tenantActivity.map(t => {
      const stats = new TenantStatsDto();
      stats.tenantId = t.tenantId;
      stats.name = t.name;
      stats.inspectionsCompleted = t.inspectionsCompleted;
      stats.paymentsMade = t.paymentsMade;
      return stats;
    });
    dto.topUsers = entity.topUsers.map(u => {
      const top = new TopUserDto();
      top.userId = u.userId;
      top.name = u.name;
      top.activityScore = u.activityScore;
      return top;
    });
    dto.inactiveUsers = entity.inactiveUsers;
    return dto;
  }

  static toPaymentReportDto(entity: PaymentMetricsEntity): PaymentReportDto {
    const dto = new PaymentReportDto();
    dto.revenue = entity.revenue;
    dto.escrow = entity.escrow;
    dto.walletActivity = entity.walletActivity;
    dto.refunds = entity.refunds;
    dto.withdrawals = entity.withdrawals;
    dto.settlements = entity.settlements;
    dto.outstandingBalances = entity.outstandingBalances;
    dto.paymentGatewaySuccessRate = entity.paymentGatewaySuccessRate;
    dto.byPeriod = entity.byPeriod.map(p => {
      const period = new PeriodMetricsDto();
      period.period = p.period;
      period.revenue = p.revenue;
      period.count = p.count;
      return period;
    });
    return dto;
  }

  static toInspectionReportDto(entity: InspectionMetricsEntity): InspectionReportDto {
    const dto = new InspectionReportDto();
    dto.scheduled = entity.scheduled;
    dto.completed = entity.completed;
    dto.cancelled = entity.cancelled;
    dto.averageCompletionTime = entity.averageCompletionTime;
    dto.inspectorPerformance = entity.inspectorPerformance.map(i => {
      const stats = new InspectorStatsDto();
      stats.inspectorId = i.inspectorId;
      stats.name = i.name;
      stats.completedInspections = i.completedInspections;
      stats.averageRating = i.averageRating;
      stats.averageCompletionTime = i.averageCompletionTime;
      return stats;
    });
    dto.propertyInspectionFrequency = entity.propertyInspectionFrequency.map(p => {
      const stats = new PropertyInspectionStatsDto();
      stats.propertyId = p.propertyId;
      stats.title = p.title;
      stats.inspectionCount = p.inspectionCount;
      return stats;
    });
    return dto;
  }

  static toSearchReportDto(entity: SearchMetricsEntity): SearchReportDto {
    const dto = new SearchReportDto();
    dto.mostSearchedLocations = entity.mostSearchedLocations.map(l => {
      const stats = new LocationSearchStatsDto();
      stats.location = l.location;
      stats.count = l.count;
      return stats;
    });
    dto.popularSearches = entity.popularSearches.map(s => {
      const stats = new PopularSearchDto();
      stats.query = s.query;
      stats.count = s.count;
      return stats;
    });
    dto.savedSearches = entity.savedSearches;
    dto.searchConversions = entity.searchConversions;
    dto.noResultSearches = entity.noResultSearches;
    return dto;
  }

  static toChatReportDto(entity: ChatMetricsEntity): ChatReportDto {
    const dto = new ChatReportDto();
    dto.messagesSent = entity.messagesSent;
    dto.activeConversations = entity.activeConversations;
    dto.averageResponseTime = entity.averageResponseTime;
    dto.unreadMessages = entity.unreadMessages;
    dto.conversationGrowth = entity.conversationGrowth.map(g => {
      const growth = new ChatGrowthDataDto();
      growth.date = g.date;
      growth.count = g.count;
      return growth;
    });
    return dto;
  }

  static toRecommendationReportDto(entity: RecommendationMetricsEntity): RecommendationReportDto {
    const dto = new RecommendationReportDto();
    dto.clickThroughRate = entity.clickThroughRate;
    dto.acceptanceRate = entity.acceptanceRate;
    dto.rejectionRate = entity.rejectionRate;
    dto.mostEffectiveStrategy = entity.mostEffectiveStrategy;
    dto.strategyPerformance = entity.strategyPerformance.map(s => {
      const stats = new StrategyStatsDto();
      stats.strategy = s.strategy;
      stats.impressions = s.impressions;
      stats.clicks = s.clicks;
      stats.conversions = s.conversions;
      stats.ctr = s.ctr;
      stats.conversionRate = s.conversionRate;
      return stats;
    });
    return dto;
  }
}
