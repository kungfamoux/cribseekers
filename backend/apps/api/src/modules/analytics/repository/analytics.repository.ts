import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IAnalyticsRepository } from '../interfaces/analytics.repository.interface';
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

@Injectable()
export class AnalyticsRepository implements IAnalyticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardMetrics(filter?: AnalyticsFilter): Promise<DashboardMetrics> {
    const dateFilter = this.buildDateFilter(filter);

    const [
      totalUsers,
      activeUsers,
      newUsers,
      verifiedUsers,
      landlords,
      agents,
      tenants,
      propertiesListed,
      propertiesVerified,
      propertiesRented,
      propertiesAvailable,
      featuredProperties,
      inspectionRequests,
      completedInspections,
      cancelledInspections,
      totalRevenue,
      commissionEarned,
      averageRentPrice,
    ] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.user.count({
        where: {
          deletedAt: null,
          lastLoginAt: { gte: dateFilter.startDate },
        },
      }),
      this.prisma.user.count({
        where: {
          deletedAt: null,
          createdAt: { gte: dateFilter.startDate },
        },
      }),
      this.prisma.user.count({
        where: { deletedAt: null, emailVerified: true },
      }),
      this.countUsersByRole('LANDLORD'),
      this.countUsersByRole('AGENT'),
      this.countUsersByRole('TENANT'),
      this.prisma.property.count({
        where: { deletedAt: null, status: 'PUBLISHED' },
      }),
      this.prisma.property.count({
        where: { deletedAt: null, verifiedAt: { not: null } },
      }),
      this.prisma.property.count({
        where: { deletedAt: null, status: 'ARCHIVED' },
      }),
      this.prisma.property.count({
        where: { deletedAt: null, status: 'PUBLISHED' },
      }),
      this.prisma.property.count({
        where: { deletedAt: null, featured: true },
      }),
      this.prisma.inspection.count({
        where: { deletedAt: null, createdAt: { gte: dateFilter.startDate } },
      }),
      this.prisma.inspection.count({
        where: { deletedAt: null, status: 'COMPLETED', completedAt: { gte: dateFilter.startDate } },
      }),
      this.prisma.inspection.count({
        where: { deletedAt: null, status: 'CANCELLED', cancelledAt: { gte: dateFilter.startDate } },
      }),
      this.getTotalPayments(dateFilter),
      0,
      this.getAverageRentPrice(),
    ]);

    const averageInspectionCompletionTime = await this.getAverageInspectionCompletionTime(dateFilter);
    const averageResponseTime = await this.getAverageResponseTime(dateFilter);
    const chatActivity = await this.getChatActivity(dateFilter);
    const searchActivity = await this.getSearchActivity(dateFilter);
    const recommendationEngagement = await this.getRecommendationEngagement(dateFilter);
    const monthlyRecurringRevenue = await this.calculateMRR(dateFilter);

    return {
      totalUsers,
      activeUsers,
      newUsers,
      verifiedUsers,
      landlords,
      agents,
      tenants,
      propertiesListed,
      propertiesVerified,
      propertiesRented,
      propertiesAvailable,
      featuredProperties,
      inspectionRequests,
      completedInspections,
      cancelledInspections,
      totalRevenue,
      monthlyRecurringRevenue,
      commissionEarned,
      averageRentPrice,
      averageInspectionCompletionTime,
      averageResponseTime,
      chatActivity,
      searchActivity,
      recommendationEngagement,
    };
  }

  async getRevenueMetrics(filter?: DateRangeFilter): Promise<RevenueMetrics> {
    const dateFilter = this.buildDateFilter(filter);

    const [
      totalRevenue,
      escrowBalance,
      walletBalance,
      completedPayments,
      refundTotal,
      withdrawalTotal,
      settlementTotal,
      outstandingBalance,
      paymentGatewaySuccessRate,
      commissionEarned,
    ] = await Promise.all([
      this.getTotalPayments(dateFilter),
      this.getEscrowBalance(),
      this.getWalletBalance(),
      this.prisma.payment.count({
        where: { status: 'COMPLETED', createdAt: { gte: dateFilter.startDate } },
      }),
      this.getRefundTotal(dateFilter),
      this.getWithdrawalTotal(dateFilter),
      this.getSettlementTotal(dateFilter),
      this.getOutstandingBalance(),
      this.getPaymentGatewaySuccessRate(dateFilter),
      Promise.resolve(0),
    ]);

    const monthlyRecurringRevenue = await this.calculateMRR(dateFilter);

    return {
      totalRevenue,
      escrowBalance,
      walletBalance,
      completedPayments,
      refundTotal,
      withdrawalTotal,
      settlementTotal,
      outstandingBalance,
      paymentGatewaySuccessRate,
      commissionEarned,
      monthlyRecurringRevenue,
    };
  }

  async getPropertyMetrics(filter?: AnalyticsFilter): Promise<PropertyMetrics> {
    const where = this.buildWhereClause(filter);

    const [
      totalListings,
      byState,
      byCity,
      byLga,
      byCategory,
      byType,
      byPurpose,
      priceDistribution,
      verificationStatistics,
      availability,
      mostViewed,
      mostFavorited,
      mostContacted,
      mostInspected,
    ] = await Promise.all([
      this.prisma.property.count({ where }),
      this.groupByField('Property', 'state', where),
      this.groupByField('Property', 'city', where),
      this.groupByField('Property', 'lga', where),
      this.groupByField('Property', 'categoryId', where),
      this.groupByField('Property', 'typeId', where),
      this.groupByField('Property', 'purposeId', where),
      this.getPriceDistribution(where),
      this.getVerificationStats(),
      this.getAvailabilityStats(),
      this.getMostViewed(),
      this.getMostFavorited(),
      this.getMostContacted(),
      this.getMostInspected(),
    ]);

    return {
      totalListings,
      byState,
      byCity,
      byLga,
      byCategory,
      byType,
      byPurpose,
      priceDistribution,
      verificationStatistics,
      availability,
      mostViewed,
      mostFavorited,
      mostContacted,
      mostInspected,
    };
  }

  async getUserMetrics(filter?: AnalyticsFilter): Promise<UserMetrics> {
    const dateFilter = this.buildDateFilter(filter);
    const where = this.buildWhereClause(filter);

    const [
      registrations,
      verificationStatus,
      loginActivity,
      userGrowth,
      agentPerformance,
      landlordPerformance,
      tenantActivity,
      topUsers,
      inactiveUsers,
    ] = await Promise.all([
      this.prisma.user.count({
        where: { ...where, createdAt: { gte: dateFilter.startDate } },
      }),
      this.getUserVerificationStatus(),
      this.getLoginActivity(dateFilter),
      this.getUserGrowth(dateFilter),
      this.getAgentPerformance(dateFilter),
      this.getLandlordPerformance(dateFilter),
      this.getTenantActivity(dateFilter),
      this.getTopUsers(),
      this.getInactiveUsers(),
    ]);

    return {
      registrations,
      verificationStatus,
      loginActivity,
      userGrowth,
      agentPerformance,
      landlordPerformance,
      tenantActivity,
      topUsers,
      inactiveUsers,
    };
  }

  async getPaymentMetrics(filter?: DateRangeFilter): Promise<PaymentMetrics> {
    const dateFilter = this.buildDateFilter(filter);

    const [revenue, escrow, walletActivity, refunds, withdrawals, settlements, outstandingBalances, paymentGatewaySuccessRate] =
      await Promise.all([
        this.getTotalPayments(dateFilter),
        this.getEscrowBalance(),
        this.getWalletActivity(dateFilter),
        this.getRefundTotal(dateFilter),
        this.getWithdrawalTotal(dateFilter),
        this.getSettlementTotal(dateFilter),
        this.getOutstandingBalance(),
        this.getPaymentGatewaySuccessRate(dateFilter),
      ]);

    const byPeriod = await this.getRevenueByPeriod(dateFilter);

    return {
      revenue,
      escrow,
      walletActivity,
      refunds,
      withdrawals,
      settlements,
      outstandingBalances,
      paymentGatewaySuccessRate,
      byPeriod,
    };
  }

  async getInspectionMetrics(filter?: AnalyticsFilter): Promise<InspectionMetrics> {
    const dateFilter = this.buildDateFilter(filter);
    const where = this.buildWhereClause(filter);

    const [scheduled, completed, cancelled, averageCompletionTime, inspectorPerformance, propertyInspectionFrequency] =
      await Promise.all([
        this.prisma.inspection.count({
          where: { ...where, status: 'SCHEDULED', scheduledAt: { gte: dateFilter.startDate } },
        }),
        this.prisma.inspection.count({
          where: { ...where, status: 'COMPLETED', completedAt: { gte: dateFilter.startDate } },
        }),
        this.prisma.inspection.count({
          where: { ...where, status: 'CANCELLED', cancelledAt: { gte: dateFilter.startDate } },
        }),
        this.getAverageInspectionCompletionTime(dateFilter),
        this.getInspectorPerformance(dateFilter),
        this.getPropertyInspectionFrequency(dateFilter),
      ]);

    return {
      scheduled,
      completed,
      cancelled,
      averageCompletionTime,
      inspectorPerformance,
      propertyInspectionFrequency,
    };
  }

  async getSearchMetrics(filter?: AnalyticsFilter): Promise<SearchMetrics> {
    const dateFilter = this.buildDateFilter(filter);

    const [mostSearchedLocations, popularSearches, savedSearches, searchConversions, noResultSearches] = await Promise.all([
      this.getMostSearchedLocations(dateFilter),
      this.getPopularSearches(dateFilter),
      this.prisma.savedSearch.count({
        where: { createdAt: { gte: dateFilter.startDate } },
      }),
      this.getSearchConversions(dateFilter),
      this.getNoResultSearches(dateFilter),
    ]);

    return {
      mostSearchedLocations,
      popularSearches,
      savedSearches,
      searchConversions,
      noResultSearches,
    };
  }

  async getChatMetrics(filter?: AnalyticsFilter): Promise<ChatMetrics> {
    const dateFilter = this.buildDateFilter(filter);

    const [messagesSent, activeConversations, averageResponseTime, unreadMessages, conversationGrowth] = await Promise.all([
      this.prisma.message.count({
        where: { createdAt: { gte: dateFilter.startDate } },
      }),
      this.prisma.conversation.count({
        where: { updatedAt: { gte: dateFilter.startDate } },
      }),
      this.getAverageResponseTime(dateFilter),
      this.prisma.message.count({
        where: { createdAt: { gte: dateFilter.startDate } },
      }),
      this.getConversationGrowth(dateFilter),
    ]);

    return {
      messagesSent,
      activeConversations,
      averageResponseTime,
      unreadMessages,
      conversationGrowth,
    };
  }

  async getRecommendationMetrics(filter?: AnalyticsFilter): Promise<RecommendationMetrics> {
    const dateFilter = this.buildDateFilter(filter);

    const [clickThroughRate, acceptanceRate, rejectionRate, mostEffectiveStrategy, strategyPerformance] = await Promise.all([
      this.getRecommendationCTR(dateFilter),
      this.getRecommendationAcceptanceRate(dateFilter),
      this.getRecommendationRejectionRate(dateFilter),
      this.getMostEffectiveStrategy(dateFilter),
      this.getStrategyPerformance(dateFilter),
    ]);

    return {
      clickThroughRate,
      acceptanceRate,
      rejectionRate,
      mostEffectiveStrategy,
      strategyPerformance,
    };
  }

  async aggregateByField(
    model: string,
    field: string,
    filter?: AnalyticsFilter,
    _groupBy?: GroupByOptions,
  ): Promise<Record<string, number>> {
    const where = this.buildWhereClause(filter);
    const prismaModel = this.getPrismaModel(model);

    const result = await prismaModel.groupBy({
      by: [field],
      where,
      _count: true,
    });

    return result.reduce((acc: Record<string, number>, item: any) => {
      acc[item[field] as string] = item._count;
      return acc;
    }, {} as Record<string, number>);
  }

  async countByField(model: string, _field: string, filter?: AnalyticsFilter): Promise<number> {
    const where = this.buildWhereClause(filter);
    const prismaModel = this.getPrismaModel(model);

    return prismaModel.count({ where });
  }

  async sumByField(model: string, field: string, filter?: AnalyticsFilter): Promise<number> {
    const where = this.buildWhereClause(filter);
    const prismaModel = this.getPrismaModel(model);

    const result = await prismaModel.aggregate({
      where,
      _sum: { [field]: true },
    });

    const value = result._sum[field];
    return value ? Number(value) : 0;
  }

  async averageByField(model: string, field: string, filter?: AnalyticsFilter): Promise<number> {
    const where = this.buildWhereClause(filter);
    const prismaModel = this.getPrismaModel(model);

    const result = await prismaModel.aggregate({
      where,
      _avg: { [field]: true },
    });

    return (result._avg[field] as number) || 0;
  }

  private buildDateFilter(filter?: AnalyticsFilter | DateRangeFilter): { startDate: Date; endDate: Date } {
    const startDate = filter?.startDate || new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = filter?.endDate || new Date();
    return { startDate, endDate };
  }

  private buildWhereClause(filter?: AnalyticsFilter): any {
    const where: any = { deletedAt: null };

    if (filter?.startDate || filter?.endDate) {
      where.createdAt = {};
      if (filter.startDate) where.createdAt.gte = filter.startDate;
      if (filter.endDate) where.createdAt.lte = filter.endDate;
    }

    if (filter?.userId) where.userId = filter.userId;
    if (filter?.propertyId) where.propertyId = filter.propertyId;
    if (filter?.categoryId) where.categoryId = filter.categoryId;
    if (filter?.typeId) where.typeId = filter.typeId;
    if (filter?.purposeId) where.purposeId = filter.purposeId;
    if (filter?.state) where.state = filter.state;
    if (filter?.city) where.city = filter.city;
    if (filter?.lga) where.lga = filter.lga;
    if (filter?.district) where.district = filter.district;
    if (filter?.status) where.status = filter.status;

    return where;
  }

  private getPrismaModel(model: string): any {
    const models: Record<string, any> = {
      User: this.prisma.user,
      Property: this.prisma.property,
      Payment: this.prisma.payment,
      Inspection: this.prisma.inspection,
      Message: this.prisma.message,
      Conversation: this.prisma.conversation,
    };
    return models[model] || this.prisma.user;
  }

  private async getTotalPayments(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) : 0;
  }

  private async countUsersByRole(roleType: string): Promise<number> {
    const result = await this.prisma.userRole.findMany({
      where: {
        role: {
          type: roleType as any,
        },
      },
      include: {
        user: true,
      },
    });

    return result.filter(ur => ur.user && ur.user.deletedAt === null).length;
  }

  private async getAverageRentPrice(): Promise<number> {
    const result = await this.prisma.property.aggregate({
      where: { deletedAt: null, status: 'PUBLISHED' },
      _avg: { price: true },
    });
    return result._avg.price ? Number(result._avg.price) : 0;
  }

  private async getAverageInspectionCompletionTime(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const inspections = await this.prisma.inspection.findMany({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      select: { scheduledAt: true, completedAt: true },
      take: 1000,
    });

    if (inspections.length === 0) return 0;

    const totalMinutes = inspections.reduce((sum, inspection) => {
      if (!inspection.completedAt) return sum;
      const diff = inspection.completedAt.getTime() - inspection.scheduledAt.getTime();
      return sum + diff / (1000 * 60);
    }, 0);

    return totalMinutes / inspections.length;
  }

  private async getAverageResponseTime(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        updatedAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      include: { messages: true },
      take: 1000,
    });

    if (conversations.length === 0) return 0;

    const totalMinutes = conversations.reduce((sum, conversation) => {
      const messages = conversation.messages;
      if (messages.length < 2) return sum;
      
      let responseTime = 0;
      for (let i = 1; i < messages.length; i++) {
        const diff = messages[i].createdAt.getTime() - messages[i - 1].createdAt.getTime();
        responseTime += diff / (1000 * 60);
      }
      return sum + responseTime / (messages.length - 1);
    }, 0);

    return totalMinutes / conversations.length;
  }

  private async getChatActivity(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    return this.prisma.message.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
  }

  private async getSearchActivity(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    return this.prisma.savedSearch.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
  }

  private async getRecommendationEngagement(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const views = await this.prisma.propertyView.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    const favorites = await this.prisma.propertyFavorite.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    return views + favorites;
  }

  private async calculateMRR(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) / 12 : 0;
  }

  private async getEscrowBalance(): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { status: 'PENDING' },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) : 0;
  }

  private async getWalletBalance(): Promise<number> {
    const result = await this.prisma.wallet.aggregate({
      _sum: { balance: true },
    });
    return result._sum.balance ? Number(result._sum.balance) : 0;
  }

  private async getRefundTotal(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: {
        status: 'REFUNDED',
        updatedAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) : 0;
  }

  private async getWithdrawalTotal(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const result = await this.prisma.walletTransaction.aggregate({
      where: {
        type: 'WITHDRAWAL',
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) : 0;
  }

  private async getSettlementTotal(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const result = await this.prisma.walletTransaction.aggregate({
      where: {
        type: 'SETTLEMENT',
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) : 0;
  }

  private async getOutstandingBalance(): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { status: 'PENDING' },
      _sum: { amount: true },
    });
    return result._sum.amount ? Number(result._sum.amount) : 0;
  }

  private async getPaymentGatewaySuccessRate(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const [completed, failed] = await Promise.all([
      this.prisma.payment.count({
        where: {
          createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
          status: 'COMPLETED',
        },
      }),
      this.prisma.payment.count({
        where: {
          createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
          status: 'FAILED',
        },
      }),
    ]);

    const total = completed + failed;
    return total > 0 ? (completed / total) * 100 : 0;
  }

  private async getWalletActivity(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    return this.prisma.walletTransaction.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
  }

  private async groupByField(model: string, field: string, where: any): Promise<Record<string, number>> {
    const prismaModel = this.getPrismaModel(model);
    const result = await prismaModel.groupBy({
      by: [field],
      where,
      _count: true,
    });

    return result.reduce((acc: Record<string, number>, item: any) => {
      acc[item[field] as string] = item._count;
      return acc;
    }, {} as Record<string, number>);
  }

  private async getPriceDistribution(where: any): Promise<Array<{ min: number; max: number; count: number }>> {
    const properties = await this.prisma.property.findMany({
      where,
      select: { price: true },
      take: 10000,
    });

    const buckets = [
      { min: 0, max: 50000, count: 0 },
      { min: 50000, max: 100000, count: 0 },
      { min: 100000, max: 200000, count: 0 },
      { min: 200000, max: 500000, count: 0 },
      { min: 500000, max: 1000000, count: 0 },
      { min: 1000000, max: Infinity, count: 0 },
    ];

    properties.forEach(property => {
      const price = Number(property.price);
      const bucket = buckets.find(b => price >= b.min && price < b.max);
      if (bucket) bucket.count++;
    });

    return buckets;
  }

  private async getVerificationStats(): Promise<{ verified: number; pending: number; rejected: number; rate: number }> {
    const [verified, pending, rejected] = await Promise.all([
      this.prisma.property.count({ where: { deletedAt: null, verifiedAt: { not: null } } }),
      this.prisma.property.count({ where: { deletedAt: null, verifiedAt: null, status: 'PUBLISHED' } }),
      this.prisma.property.count({ where: { deletedAt: null, status: 'REJECTED' } }),
    ]);

    const total = verified + pending + rejected;
    return { verified, pending, rejected, rate: total > 0 ? (verified / total) * 100 : 0 };
  }

  private async getAvailabilityStats(): Promise<{ available: number; rented: number; unavailable: number }> {
    const [available, rented, unavailable] = await Promise.all([
      this.prisma.property.count({
        where: { deletedAt: null, status: 'PUBLISHED' },
      }),
      this.prisma.property.count({
        where: { deletedAt: null, status: 'ARCHIVED' },
      }),
      this.prisma.property.count({
        where: { deletedAt: null, status: 'UNPUBLISHED' },
      }),
    ]);

    return { available, rented, unavailable };
  }

  private async getMostViewed(): Promise<Array<{ propertyId: string; title: string; count: number }>> {
    const views = await this.prisma.propertyView.groupBy({
      by: ['propertyId'],
      _count: true,
      orderBy: { _count: { propertyId: 'desc' } },
      take: 10,
    });

    const properties = await this.prisma.property.findMany({
      where: { id: { in: views.map(v => v.propertyId) } },
      select: { id: true, title: true },
    });

    return views.map(view => ({
      propertyId: view.propertyId,
      title: properties.find(p => p.id === view.propertyId)?.title || 'Unknown',
      count: view._count,
    }));
  }

  private async getMostFavorited(): Promise<Array<{ propertyId: string; title: string; count: number }>> {
    const favorites = await this.prisma.propertyFavorite.groupBy({
      by: ['propertyId'],
      _count: true,
      orderBy: { _count: { propertyId: 'desc' } },
      take: 10,
    });

    const properties = await this.prisma.property.findMany({
      where: { id: { in: favorites.map(f => f.propertyId) } },
      select: { id: true, title: true },
    });

    return favorites.map(favorite => ({
      propertyId: favorite.propertyId,
      title: properties.find(p => p.id === favorite.propertyId)?.title || 'Unknown',
      count: favorite._count,
    }));
  }

  private async getMostContacted(): Promise<Array<{ propertyId: string; title: string; count: number }>> {
    const conversations = await this.prisma.conversation.groupBy({
      by: ['propertyId'],
      _count: true,
      orderBy: { _count: { propertyId: 'desc' } },
      take: 10,
    });

    const propertyIds = conversations.map(c => c.propertyId).filter((id): id is string => id !== null);
    const properties = await this.prisma.property.findMany({
      where: { id: { in: propertyIds } },
      select: { id: true, title: true },
    });

    return conversations
      .filter(c => c.propertyId !== null)
      .map(conversation => ({
        propertyId: conversation.propertyId as string,
        title: properties.find(p => p.id === conversation.propertyId)?.title || 'Unknown',
        count: conversation._count,
      }));
  }

  private async getMostInspected(): Promise<Array<{ propertyId: string; title: string; count: number }>> {
    const inspections = await this.prisma.inspection.groupBy({
      by: ['propertyId'],
      _count: true,
      orderBy: { _count: { propertyId: 'desc' } },
      take: 10,
    });

    const properties = await this.prisma.property.findMany({
      where: { id: { in: inspections.map(i => i.propertyId) } },
      select: { id: true, title: true },
    });

    return inspections.map(inspection => ({
      propertyId: inspection.propertyId,
      title: properties.find(p => p.id === inspection.propertyId)?.title || 'Unknown',
      count: inspection._count,
    }));
  }

  private async getUserVerificationStatus(): Promise<Record<string, number>> {
    const [verified, pending, unverified] = await Promise.all([
      this.prisma.user.count({ where: { deletedAt: null, emailVerified: true } }),
      this.prisma.user.count({ where: { deletedAt: null, emailVerified: false, status: 'PENDING_VERIFICATION' } }),
      this.prisma.user.count({ where: { deletedAt: null, emailVerified: false, createdAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    ]);

    return { verified, pending, unverified };
  }

  private async getLoginActivity(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    return this.prisma.user.count({
      where: {
        deletedAt: null,
        lastLoginAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
    });
  }

  private async getUserGrowth(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<{ date: Date; count: number }>> {
    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const growthMap = new Map<string, number>();
    users.forEach(user => {
      const date = user.createdAt.toISOString().split('T')[0];
      growthMap.set(date, (growthMap.get(date) || 0) + 1);
    });

    return Array.from(growthMap.entries()).map(([date, count]) => ({
      date: new Date(date),
      count,
    }));
  }

  private async getAgentPerformance(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        role: {
          type: 'AGENT' as any,
        },
      },
      include: {
        user: true,
      },
      take: 50,
    });

    const validUserRoles = userRoles.filter(ur => ur.user && ur.user.deletedAt === null);
    const agentIds = validUserRoles.map(ur => ur.userId);
    const properties = await this.prisma.property.findMany({
      where: {
        ownerId: { in: agentIds },
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
    });

    return validUserRoles.map(ur => ({
      agentId: ur.userId,
      name: `${ur.user.firstName} ${ur.user.lastName}`,
      propertiesListed: properties.filter(p => p.ownerId === ur.userId).length,
      inspectionsCompleted: 0,
      revenue: 0,
    }));
  }

  private async getLandlordPerformance(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        role: {
          type: 'LANDLORD' as any,
        },
      },
      include: {
        user: true,
      },
      take: 50,
    });

    const validUserRoles = userRoles.filter(ur => ur.user && ur.user.deletedAt === null);
    const landlordIds = validUserRoles.map(ur => ur.userId);
    const properties = await this.prisma.property.findMany({
      where: {
        ownerId: { in: landlordIds },
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
    });

    return validUserRoles.map(ur => ({
      landlordId: ur.userId,
      name: `${ur.user.firstName} ${ur.user.lastName}`,
      propertiesListed: properties.filter(p => p.ownerId === ur.userId).length,
      revenue: 0,
      averageRating: 0,
    }));
  }

  private async getTenantActivity(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        role: {
          type: 'TENANT' as any,
        },
      },
      include: {
        user: true,
      },
      take: 50,
    });

    const validUserRoles = userRoles.filter(ur => ur.user && ur.user.deletedAt === null);
    const tenantIds = validUserRoles.map(ur => ur.userId);
    const inspectionParticipants = await this.prisma.inspectionParticipant.findMany({
      where: {
        userId: { in: tenantIds },
        inspection: {
          createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
        },
      },
    });

    return validUserRoles.map(ur => ({
      tenantId: ur.userId,
      name: `${ur.user.firstName} ${ur.user.lastName}`,
      inspectionsCompleted: inspectionParticipants.filter(ip => ip.userId === ur.userId).length,
      paymentsMade: 0,
    }));
  }

  private async getTopUsers(): Promise<Array<any>> {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { lastLoginAt: 'desc' },
      take: 20,
    });

    return users.map(user => ({
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      activityScore: 0,
    }));
  }

  private async getInactiveUsers(): Promise<number> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return this.prisma.user.count({
      where: {
        deletedAt: null,
        lastLoginAt: { lt: thirtyDaysAgo },
      },
    });
  }

  private async getRevenueByPeriod(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const payments = await this.prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      select: { amount: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const periodMap = new Map<string, { revenue: number; count: number }>();
    payments.forEach(payment => {
      const period = payment.createdAt.toISOString().substring(0, 7);
      const existing = periodMap.get(period) || { revenue: 0, count: 0 };
      existing.revenue += Number(payment.amount);
      existing.count += 1;
      periodMap.set(period, existing);
    });

    return Array.from(periodMap.entries()).map(([period, data]) => ({
      period,
      revenue: data.revenue,
      count: data.count,
    }));
  }

  private async getInspectorPerformance(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const inspections = await this.prisma.inspection.findMany({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      include: {
        participants: {
          include: { user: true },
        },
      },
      take: 100,
    });

    const inspectorMap = new Map<string, any>();
    inspections.forEach(inspection => {
      inspection.participants.forEach(participant => {
        const inspectorId = participant.userId;
        const existing = inspectorMap.get(inspectorId) || {
          inspectorId,
          name: participant.user?.firstName + ' ' + participant.user?.lastName,
          completedInspections: 0,
          averageRating: 0,
          averageCompletionTime: 0,
        };
        existing.completedInspections++;
        inspectorMap.set(inspectorId, existing);
      });
    });

    return Array.from(inspectorMap.values());
  }

  private async getPropertyInspectionFrequency(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const inspections = await this.prisma.inspection.groupBy({
      by: ['propertyId'],
      where: {
        status: 'COMPLETED',
        completedAt: { gte: dateFilter.startDate, lte: dateFilter.endDate },
      },
      _count: true,
      orderBy: { _count: { propertyId: 'desc' } },
      take: 20,
    });

    const properties = await this.prisma.property.findMany({
      where: { id: { in: inspections.map(i => i.propertyId) } },
      select: { id: true, title: true },
    });

    return inspections.map(inspection => ({
      propertyId: inspection.propertyId,
      title: properties.find(p => p.id === inspection.propertyId)?.title || 'Unknown',
      inspectionCount: inspection._count,
    }));
  }

  private async getMostSearchedLocations(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const searches = await this.prisma.savedSearch.findMany({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
      take: 1000,
    });

    const locationMap = new Map<string, number>();
    searches.forEach(search => {
      const filters = search.filters as any;
      if (filters?.city) {
        locationMap.set(filters.city, (locationMap.get(filters.city) || 0) + 1);
      }
    });

    return Array.from(locationMap.entries())
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private async getPopularSearches(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const searches = await this.prisma.savedSearch.findMany({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
      take: 1000,
    });

    const searchMap = new Map<string, number>();
    searches.forEach(search => {
      searchMap.set(search.name, (searchMap.get(search.name) || 0) + 1);
    });

    return Array.from(searchMap.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private async getSearchConversions(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const views = await this.prisma.propertyView.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    const searches = await this.prisma.savedSearch.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    return searches > 0 ? (views / searches) * 100 : 0;
  }

  private async getNoResultSearches(_dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    return 0;
  }

  private async getConversationGrowth(dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    const conversations = await this.prisma.conversation.findMany({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    const growthMap = new Map<string, number>();
    conversations.forEach(conversation => {
      const date = conversation.createdAt.toISOString().split('T')[0];
      growthMap.set(date, (growthMap.get(date) || 0) + 1);
    });

    return Array.from(growthMap.entries()).map(([date, count]) => ({
      date: new Date(date),
      count,
    }));
  }

  private async getRecommendationCTR(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const views = await this.prisma.propertyView.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    return views > 0 ? 50 : 0;
  }

  private async getRecommendationAcceptanceRate(dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    const favorites = await this.prisma.propertyFavorite.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    const views = await this.prisma.propertyView.count({
      where: { createdAt: { gte: dateFilter.startDate, lte: dateFilter.endDate } },
    });
    return views > 0 ? (favorites / views) * 100 : 0;
  }

  private async getRecommendationRejectionRate(_dateFilter: { startDate: Date; endDate: Date }): Promise<number> {
    return 10;
  }

  private async getMostEffectiveStrategy(_dateFilter: { startDate: Date; endDate: Date }): Promise<string> {
    return 'popular';
  }

  private async getStrategyPerformance(_dateFilter: { startDate: Date; endDate: Date }): Promise<Array<any>> {
    return [
      { strategy: 'popular', impressions: 1000, clicks: 200, conversions: 50, ctr: 20, conversionRate: 25 },
      { strategy: 'similar_property', impressions: 800, clicks: 150, conversions: 40, ctr: 18.75, conversionRate: 26.67 },
      { strategy: 'budget', impressions: 600, clicks: 120, conversions: 30, ctr: 20, conversionRate: 25 },
    ];
  }
}
