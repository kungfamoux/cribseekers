import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IRecommendationRepository } from '../interfaces/recommendation.repository.interface';
import { RecommendationFilter, RecommendationPaginationOptions, RecommendationSortOptions } from '../types/recommendation-filter.type';
import { RecommendationItem, RecommendationExplanation, RecommendationFeedback } from '../types/recommendation-result.type';
import { PaginationResult } from '../../../common/types/pagination.type';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@Injectable()
export class RecommendationRepository implements IRecommendationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause(filter?: RecommendationFilter) {
    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
    };

    if (filter?.categoryId) where.categoryId = filter.categoryId;
    if (filter?.typeId) where.typeId = filter.typeId;
    if (filter?.purposeId) where.purposeId = filter.purposeId;
    if (filter?.minPrice !== undefined || filter?.maxPrice !== undefined) {
      where.price = {};
      if (filter.minPrice !== undefined) where.price.gte = filter.minPrice;
      if (filter.maxPrice !== undefined) where.price.lte = filter.maxPrice;
    }
    if (filter?.minBedrooms !== undefined) where.bedrooms = { gte: filter.minBedrooms };
    if (filter?.minBathrooms !== undefined) where.bathrooms = { gte: filter.minBathrooms };

    if (filter?.state || filter?.city || filter?.lga || filter?.estate || filter?.district) {
      where.location = {};
      if (filter.state) where.location.state = filter.state;
      if (filter.city) where.location.city = filter.city;
      if (filter.lga) where.location.neighborhood = { contains: filter.lga, mode: 'insensitive' };
      if (filter.estate) where.location.neighborhood = { contains: filter.estate, mode: 'insensitive' };
      if (filter.district) where.location.neighborhood = { contains: filter.district, mode: 'insensitive' };
    }

    return where;
  }

  private buildOrderByClause(sort?: RecommendationSortOptions) {
    const sortBy = sort?.sortBy || 'score';
    const sortOrder = sort?.sortOrder || 'desc';

    const orderByMap: Record<string, any> = {
      score: { score: sortOrder },
      price: { price: sortOrder },
      popularity: { views: sortOrder },
      freshness: { publishedAt: sortOrder },
      distance: { distance: sortOrder },
    };

    return orderByMap[sortBy] || { publishedAt: 'desc' };
  }

  async getRecommendations(
    _userId: string,
    filter?: RecommendationFilter,
    pagination?: RecommendationPaginationOptions,
    sort?: RecommendationSortOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(filter);
    const orderBy = this.buildOrderByClause(sort);

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 0)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getSimilarProperties(
    propertyId: string,
    _userId?: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const referenceProperty = await this.prisma.property.findUnique({
      where: { id: propertyId },
      include: { location: true },
    });

    if (!referenceProperty) {
      return {
        data: [],
        meta: {
          total: 0,
          page,
          limit,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      id: { not: propertyId },
      categoryId: referenceProperty.categoryId,
      typeId: referenceProperty.typeId,
      purposeId: referenceProperty.purposeId,
    };

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy: { views: 'desc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 50)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getPopular(
    filter?: RecommendationFilter,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const where = this.buildWhereClause(filter);

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy: { views: 'desc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 70)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getByLocation(
    locationId: string,
    _userId?: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      locationId,
    };

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 60)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getByBudget(
    _userId: string,
    minPrice?: number,
    maxPrice?: number,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
    };

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy: { price: 'asc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 55)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getByCategory(
    categoryId: string,
    _userId?: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      categoryId,
    };

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        skip,
        take: limit,
        orderBy: { views: 'desc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 65)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getByInspectionHistory(
    userId: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    // Get inspection participants for this user
    const participants = await this.prisma.inspectionParticipant.findMany({
      where: { userId },
      include: {
        inspection: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const inspectionIds = participants.map(p => p.inspectionId);

    const inspections = await this.prisma.inspection.findMany({
      where: {
        id: { in: inspectionIds },
        status: 'COMPLETED',
      },
      orderBy: { scheduledAt: 'desc' },
      take: 50,
    });

    const propertyIds = inspections.map(i => i.propertyId);

    const properties = await this.prisma.property.findMany({
      where: {
        id: { in: propertyIds },
        deletedAt: null,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
      },
      include: {
        location: true,
        category: true,
        type: true,
        purpose: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    const paginatedProperties = properties.slice(skip, skip + limit);

    return {
      data: paginatedProperties.map(p => this.mapToRecommendationItem(p, 75)),
      meta: {
        total: properties.length,
        page,
        limit,
        totalPages: Math.ceil(properties.length / limit),
        hasNextPage: page < Math.ceil(properties.length / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getByFavoriteHistory(
    _userId: string,
    pagination?: RecommendationPaginationOptions,
  ): Promise<PaginationResult<RecommendationItem>> {
    const { page = 1, limit = RECOMMENDATION_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    const favorites = await this.prisma.propertyFavorite.findMany({
      where: { userId: _userId },
      include: {
        property: {
          include: {
            location: true,
            category: true,
            type: true,
            purpose: true,
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const properties = favorites
      .map(f => f.property)
      .filter(p => p && p.status === 'PUBLISHED' && p.visibility === 'PUBLIC' && !p.deletedAt)
      .slice(skip, skip + limit);

    return {
      data: properties.map(p => this.mapToRecommendationItem(p, 80)),
      meta: {
        total: properties.length,
        page,
        limit,
        totalPages: Math.ceil(properties.length / limit),
        hasNextPage: page < Math.ceil(properties.length / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  async getExplanation(propertyId: string, _userId: string): Promise<RecommendationExplanation | null> {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        location: true,
        category: true,
        type: true,
        purpose: true,
      },
    });

    if (!property) return null;

    const factors = [
      {
        name: 'Popularity',
        value: property.views,
        weight: 0.15,
        contribution: Math.min(property.views / 1000, 1) * 15,
        description: `${property.views} views`,
      },
      {
        name: 'Freshness',
        value: property.publishedAt ? Date.now() - property.publishedAt.getTime() : 0,
        weight: 0.10,
        contribution: property.publishedAt ? Math.max(0, 1 - (Date.now() - property.publishedAt.getTime()) / (30 * 24 * 60 * 60 * 1000)) * 10 : 0,
        description: property.publishedAt ? `Listed ${new Date(property.publishedAt).toLocaleDateString()}` : 'Recently listed',
      },
      {
        name: 'Verification',
        value: property.verifiedAt ? 1 : 0,
        weight: 0.10,
        contribution: property.verifiedAt ? 10 : 0,
        description: property.verifiedAt ? 'Verified property' : 'Not verified',
      },
      {
        name: 'Featured',
        value: property.featured ? 1 : 0,
        weight: 0.10,
        contribution: property.featured ? 10 : 0,
        description: property.featured ? 'Featured listing' : 'Standard listing',
      },
    ];

    return {
      propertyId,
      score: factors.reduce((sum, f) => sum + f.contribution, 0),
      factors,
      generatedAt: new Date(),
    };
  }

  async saveFeedback(_feedback: Omit<RecommendationFeedback, 'id' | 'createdAt'>): Promise<RecommendationFeedback> {
    const savedFeedback = await this.prisma.propertyFavorite.upsert({
      where: {
        propertyId_userId: {
          propertyId: _feedback.propertyId,
          userId: _feedback.userId,
        },
      },
      update: {},
      create: {
        propertyId: _feedback.propertyId,
        userId: _feedback.userId,
      },
    });

    return {
      id: savedFeedback.id,
      propertyId: _feedback.propertyId,
      userId: _feedback.userId,
      type: _feedback.type,
      createdAt: savedFeedback.createdAt,
    };
  }

  async getUserFeedback(userId: string, propertyId?: string): Promise<RecommendationFeedback[]> {
    const where: any = { userId };
    if (propertyId) where.propertyId = propertyId;

    const favorites = await this.prisma.propertyFavorite.findMany({ where });

    return favorites.map(f => ({
      id: f.id,
      propertyId: f.propertyId,
      userId: f.userId,
      type: 'save' as const,
      createdAt: f.createdAt,
    }));
  }

  async getRecentlyViewed(userId: string, limit: number = 10): Promise<RecommendationItem[]> {
    const views = await this.prisma.propertyView.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    const propertyIds = views.map(v => v.propertyId);

    const properties = await this.prisma.property.findMany({
      where: {
        id: { in: propertyIds },
        deletedAt: null,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
      },
      include: {
        location: true,
        category: true,
        type: true,
        purpose: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    return properties.map(p => this.mapToRecommendationItem(p, 85));
  }

  async getRecentlySearched(userId: string, limit: number = 10): Promise<RecommendationItem[]> {
    const searches = await this.prisma.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    const results: RecommendationItem[] = [];

    for (const search of searches) {
      const filters = search.filters as any;
      const where: any = {
        deletedAt: null,
        status: 'PUBLISHED',
        visibility: 'PUBLIC',
      };

      if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
        where.price = {};
        if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
        if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
      }
      if (filters?.bedrooms !== undefined) where.bedrooms = { gte: filters.bedrooms };
      if (filters?.bathrooms !== undefined) where.bathrooms = { gte: filters.bathrooms };
      if (filters?.categoryId) where.categoryId = filters.categoryId;
      if (filters?.typeId) where.typeId = filters.typeId;
      if (filters?.purposeId) where.purposeId = filters.purposeId;

      const properties = await this.prisma.property.findMany({
        where,
        include: {
          location: true,
          category: true,
          type: true,
          purpose: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        take: 3,
        orderBy: { publishedAt: 'desc' },
      });

      results.push(...properties.map(p => this.mapToRecommendationItem(p, 60)));
    }

    return results.slice(0, limit);
  }

  async getUserPreferences(userId: string): Promise<any> {
    const favorites = await this.prisma.propertyFavorite.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            category: true,
            type: true,
            purpose: true,
          },
        },
      },
      take: 50,
    });

    const views = await this.prisma.propertyView.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            category: true,
            type: true,
            purpose: true,
          },
        },
      },
      take: 100,
    });

    const categoryCounts = new Map<string, number>();
    const typeCounts = new Map<string, number>();
    const purposeCounts = new Map<string, number>();

    [...favorites, ...views].forEach(item => {
      if (item.property.categoryId) {
        categoryCounts.set(
          item.property.categoryId,
          (categoryCounts.get(item.property.categoryId) || 0) + 1,
        );
      }
      if (item.property.typeId) {
        typeCounts.set(item.property.typeId, (typeCounts.get(item.property.typeId) || 0) + 1);
      }
      if (item.property.purposeId) {
        purposeCounts.set(
          item.property.purposeId,
          (purposeCounts.get(item.property.purposeId) || 0) + 1,
        );
      }
    });

    return {
      preferredCategories: Array.from(categoryCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => id),
      preferredTypes: Array.from(typeCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => id),
      preferredPurposes: Array.from(purposeCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id]) => id),
    };
  }

  private mapToRecommendationItem(property: any, baseScore: number): RecommendationItem {
    return {
      propertyId: property.id,
      title: property.title,
      description: property.description,
      price: Number(property.price),
      currency: property.currency,
      pricePeriod: property.pricePeriod,
      categoryId: property.categoryId,
      typeId: property.typeId,
      purposeId: property.purposeId,
      locationId: property.locationId,
      state: property.location?.state || '',
      city: property.location?.city || '',
      lga: property.location?.neighborhood || undefined,
      district: property.location?.neighborhood || undefined,
      estate: property.location?.neighborhood || undefined,
      bedrooms: property.bedrooms || undefined,
      bathrooms: property.bathrooms || undefined,
      squareFeet: property.squareFeet ? Number(property.squareFeet) : undefined,
      squareMeters: property.squareMeters ? Number(property.squareMeters) : undefined,
      status: property.status,
      featured: property.featured,
      verified: !!property.verifiedAt,
      views: property.views,
      publishedAt: property.publishedAt || property.createdAt,
      thumbnailUrl: property.images?.[0]?.url || undefined,
      score: baseScore,
      reasons: [
        {
          type: 'base_score',
          description: 'Base recommendation score',
          weight: 1,
          contribution: baseScore,
        },
      ],
    };
  }
}
