import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ISearchRepository } from '../interfaces/search.repository.interface';
import { SearchFilter, GeoSearchFilter, SortOptions, PaginationOptions } from '../types/search-filter.type';
import { SearchResult, SearchSuggestion } from '../types/search-result.type';
import { SearchResultEntity } from '../entities/search-result.entity';
import { PaginationResult } from '../../../common/types/pagination.type';
import { SEARCH_CONSTANTS } from '../constants/search.constants';

@Injectable()
export class SearchRepository implements ISearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause(filter: SearchFilter) {
    const where: any = {
      deletedAt: null,
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
    };

    if (filter.keyword) {
      where.OR = [
        { title: { contains: filter.keyword, mode: 'insensitive' } },
        { description: { contains: filter.keyword, mode: 'insensitive' } },
      ];
    }

    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      where.price = {};
      if (filter.minPrice !== undefined) where.price.gte = filter.minPrice;
      if (filter.maxPrice !== undefined) where.price.lte = filter.maxPrice;
    }

    if (filter.bedrooms !== undefined) where.bedrooms = { gte: filter.bedrooms };
    if (filter.bathrooms !== undefined) where.bathrooms = { gte: filter.bathrooms };
    if (filter.furnished !== undefined) where.condition = filter.furnished ? 'FURNISHED' : undefined;
    if (filter.verified !== undefined && filter.verified) where.verifiedAt = { not: null };
    if (filter.featured !== undefined && filter.featured) where.featured = true;
    if (filter.purpose) where.purposeId = filter.purpose;
    if (filter.propertyType) where.typeId = filter.propertyType;
    if (filter.category) where.categoryId = filter.category;

    if (filter.state || filter.city || filter.lga || filter.estate || filter.district) {
      where.location = {};
      if (filter.state) where.location.state = filter.state;
      if (filter.city) where.location.city = filter.city;
      if (filter.lga) where.location.neighborhood = { contains: filter.lga, mode: 'insensitive' };
      if (filter.estate) where.location.neighborhood = { contains: filter.estate, mode: 'insensitive' };
      if (filter.district) where.location.neighborhood = { contains: filter.district, mode: 'insensitive' };
    }

    return where;
  }

  private buildOrderByClause(sort?: SortOptions) {
    const sortBy = sort?.sortBy || 'newest';
    const sortOrder = sort?.sortOrder || 'desc';

    const orderByMap: Record<string, any> = {
      newest: { publishedAt: sortOrder },
      oldest: { publishedAt: sortOrder === 'desc' ? 'asc' : 'desc' },
      price_low_high: { price: 'asc' },
      price_high_low: { price: 'desc' },
      popularity: { views: sortOrder },
      featured: { featured: 'desc', publishedAt: 'desc' },
    };

    return orderByMap[sortBy] || { publishedAt: 'desc' };
  }

  async search(
    filter: SearchFilter,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    const { page = 1, limit = SEARCH_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
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
      data: (properties as any[]).map(p => this.mapToSearchResult(p)),
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

  async searchByKeyword(
    keyword: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ keyword }, pagination, sort);
  }

  async searchByState(
    state: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ state }, pagination, sort);
  }

  async searchByCity(
    city: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ city }, pagination, sort);
  }

  async searchByLGA(
    lga: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ lga }, pagination, sort);
  }

  async searchByEstate(
    estate: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ estate }, pagination, sort);
  }

  async searchNearby(
    filter: GeoSearchFilter,
    pagination?: PaginationOptions,
  ): Promise<PaginationResult<SearchResult>> {
    const { page = 1, limit = SEARCH_CONSTANTS.DEFAULT_PAGE_SIZE } = pagination || {};
    const skip = (page - 1) * limit;

    // PostgreSQL distance calculation using Haversine formula
    const distanceQuery = `
      6371 * acos(
        cos(radians(${filter.latitude})) * cos(radians(CAST("location"."latitude" AS DOUBLE PRECISION))) *
        cos(radians(CAST("location"."longitude" AS DOUBLE PRECISION)) - radians(${filter.longitude})) +
        sin(radians(${filter.latitude})) * sin(radians(CAST("location"."latitude" AS DOUBLE PRECISION)))
      )
    `;

    const where = this.buildWhereClause(filter);
    where.location = {
      ...where.location,
      latitude: { not: null },
      longitude: { not: null },
    };

    const [rawResult, total] = await Promise.all([
      this.prisma.$queryRaw`
        SELECT 
          p.*,
          l.*,
          c.*,
          t.*,
          pur.*,
          ${distanceQuery} as distance
        FROM "properties" p
        LEFT JOIN "property_locations" l ON p."locationId" = l.id
        LEFT JOIN "property_categories" c ON p."categoryId" = c.id
        LEFT JOIN "property_types" t ON p."typeId" = t.id
        LEFT JOIN "property_purposes" pur ON p."purposeId" = pur.id
        WHERE p."deletedAt" IS NULL
          AND p.status = 'PUBLISHED'
          AND p.visibility = 'PUBLIC'
          AND l.latitude IS NOT NULL
          AND l.longitude IS NOT NULL
          AND ${distanceQuery} <= ${filter.radius}
        ORDER BY distance ASC
        LIMIT ${limit}
        OFFSET ${skip}
      `,
      this.prisma.property.count({ where }),
    ]);

    const properties = rawResult as any[];

    return {
      data: properties.map((p: any) => this.mapRawToSearchResult(p)),
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

  async searchByRadius(
    filter: GeoSearchFilter,
    pagination?: PaginationOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.searchNearby(filter, pagination);
  }

  async searchByCategory(
    categoryId: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ category: categoryId }, pagination, sort);
  }

  async searchByType(
    typeId: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ propertyType: typeId }, pagination, sort);
  }

  async searchByPurpose(
    purposeId: string,
    pagination?: PaginationOptions,
    sort?: SortOptions,
  ): Promise<PaginationResult<SearchResult>> {
    return this.search({ purpose: purposeId }, pagination, sort);
  }

  async findFeatured(pagination?: PaginationOptions): Promise<PaginationResult<SearchResult>> {
    return this.search({ featured: true }, pagination, { sortBy: 'featured' });
  }

  async findRecent(pagination?: PaginationOptions): Promise<PaginationResult<SearchResult>> {
    return this.search({}, pagination, { sortBy: 'newest' });
  }

  async findPopular(pagination?: PaginationOptions): Promise<PaginationResult<SearchResult>> {
    return this.search({}, pagination, { sortBy: 'popularity' });
  }

  async getSuggestions(query: string, limit: number = SEARCH_CONSTANTS.MAX_SUGGESTIONS): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];

    // Search by state
    const states = await this.prisma.propertyLocation.findMany({
      where: {
        state: { contains: query, mode: 'insensitive' },
        deletedAt: null,
      },
      select: {
        state: true,
      },
      distinct: ['state'],
      take: limit,
    });

    suggestions.push(
      ...states.map(s => ({
        id: s.state,
        type: 'state' as const,
        name: s.state,
        count: 0,
      })),
    );

    // Search by city
    const cities = await this.prisma.propertyLocation.findMany({
      where: {
        city: { contains: query, mode: 'insensitive' },
        deletedAt: null,
      },
      select: {
        city: true,
        state: true,
      },
      distinct: ['city', 'state'],
      take: limit,
    });

    suggestions.push(
      ...cities.map(c => ({
        id: `${c.state}-${c.city}`,
        type: 'city' as const,
        name: c.city,
        state: c.state,
        count: 0,
      })),
    );

    // Search by neighborhood (LGA/estate/district)
    const neighborhoodResults = await this.prisma.propertyLocation.findMany({
      where: {
        neighborhood: { contains: query, mode: 'insensitive' },
        deletedAt: null,
      },
      select: {
        neighborhood: true,
        city: true,
        state: true,
      },
      take: limit,
    });

    suggestions.push(
      ...neighborhoodResults.map((n: any) => ({
        id: n.neighborhood || '',
        type: 'lga' as const,
        name: n.neighborhood || '',
        city: n.city,
        state: n.state,
        count: 0,
      })),
    );

    return suggestions.slice(0, limit);
  }

  async count(filter: SearchFilter): Promise<number> {
    const where = this.buildWhereClause(filter);
    return this.prisma.property.count({ where });
  }

  private mapToSearchResult(property: any): SearchResult {
    return new SearchResultEntity({
      id: property.id,
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
    });
  }

  private mapRawToSearchResult(raw: any): SearchResult {
    return new SearchResultEntity({
      id: raw.id,
      title: raw.title,
      description: raw.description,
      price: Number(raw.price),
      currency: raw.currency,
      pricePeriod: raw.pricePeriod,
      categoryId: raw.categoryId,
      typeId: raw.typeId,
      purposeId: raw.purposeId,
      locationId: raw.locationId,
      state: raw.state || '',
      city: raw.city || '',
      lga: raw.neighborhood || undefined,
      district: raw.neighborhood || undefined,
      estate: raw.neighborhood || undefined,
      bedrooms: raw.bedrooms || undefined,
      bathrooms: raw.bathrooms || undefined,
      squareFeet: raw.squareFeet ? Number(raw.squareFeet) : undefined,
      squareMeters: raw.squareMeters ? Number(raw.squareMeters) : undefined,
      status: raw.status,
      featured: raw.featured,
      verified: !!raw.verifiedAt,
      views: raw.views,
      publishedAt: raw.publishedAt || raw.createdAt,
      distance: raw.distance ? Number(raw.distance) : undefined,
      thumbnailUrl: raw.url || undefined,
    });
  }
}
