import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Property } from '../entities/property.entity';
import { IPropertyRepository } from '../interfaces/property.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Property | null> {
    const prismaProperty = await this.prisma.property.findUnique({
      where: { id },
    });
    return prismaProperty ? this.mapToEntity(prismaProperty) : null;
  }

  async findOne(filters: Partial<Property>): Promise<Property | null> {
    const prismaProperty = await this.prisma.property.findFirst({
      where: filters,
    });
    return prismaProperty ? this.mapToEntity(prismaProperty) : null;
  }

  async findMany(
    filters?: Partial<Property>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({ where: filters }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async create(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const prismaProperty = await this.prisma.property.create({
      data,
    });
    return this.mapToEntity(prismaProperty);
  }

  async update(id: string, data: Partial<Omit<Property, 'id' | 'createdAt'>>): Promise<Property> {
    const prismaProperty = await this.prisma.property.update({
      where: { id },
      data,
    });
    return this.mapToEntity(prismaProperty);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.property.delete({
      where: { id },
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.property.count({
      where: { id },
    });
    return count > 0;
  }

  async count(filters?: Partial<Property>): Promise<number> {
    return this.prisma.property.count({ where: filters });
  }

  async search(
    query: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findByOwner(
    ownerId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { ownerId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({ where: { ownerId } }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findByCategory(
    categoryId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { categoryId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({ where: { categoryId } }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findByType(
    typeId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { typeId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({ where: { typeId } }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findByPurpose(
    purposeId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { purposeId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({ where: { purposeId } }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findByLocation(
    locationId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { locationId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({ where: { locationId } }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findFeatured(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: {
          featured: true,
          featuredUntil: { gte: new Date() },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({
        where: {
          featured: true,
          featuredUntil: { gte: new Date() },
        },
      }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findPublished(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
          expiresAt: { gte: new Date() },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
          expiresAt: { gte: new Date() },
        },
      }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async findVerified(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Property>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.property.findMany({
        where: {
          verifiedAt: { not: null },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.property.count({
        where: {
          verifiedAt: { not: null },
        },
      }),
    ]);

    return {
      data: data.map((p: any) => this.mapToEntity(p)),
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

  async incrementViews(id: string): Promise<void> {
    await this.prisma.property.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  async incrementInquiries(id: string): Promise<void> {
    await this.prisma.property.update({
      where: { id },
      data: { inquiries: { increment: 1 } },
    });
  }

  withTransaction(_transaction: any): this {
    return this as any;
  }

  private mapToEntity(prismaProperty: any): Property {
    const entity = new Property();
    entity.id = prismaProperty.id;
    entity.title = prismaProperty.title;
    entity.description = prismaProperty.description;
    entity.categoryId = prismaProperty.categoryId;
    entity.typeId = prismaProperty.typeId;
    entity.purposeId = prismaProperty.purposeId;
    entity.listingType = prismaProperty.listingType;
    entity.condition = prismaProperty.condition;
    entity.price = prismaProperty.price;
    entity.currency = prismaProperty.currency;
    entity.pricePeriod = prismaProperty.pricePeriod;
    entity.bedrooms = prismaProperty.bedrooms;
    entity.bathrooms = prismaProperty.bathrooms;
    entity.squareFeet = prismaProperty.squareFeet;
    entity.squareMeters = prismaProperty.squareMeters;
    entity.lotSize = prismaProperty.lotSize;
    entity.yearBuilt = prismaProperty.yearBuilt;
    entity.parkingSpaces = prismaProperty.parkingSpaces;
    entity.floors = prismaProperty.floors;
    entity.locationId = prismaProperty.locationId;
    entity.status = prismaProperty.status;
    entity.visibility = prismaProperty.visibility;
    entity.featured = prismaProperty.featured;
    entity.featuredUntil = prismaProperty.featuredUntil;
    entity.views = prismaProperty.views;
    entity.inquiries = prismaProperty.inquiries;
    entity.publishedAt = prismaProperty.publishedAt;
    entity.expiresAt = prismaProperty.expiresAt;
    entity.ownerId = prismaProperty.ownerId;
    entity.verifiedAt = prismaProperty.verifiedAt;
    entity.verifiedBy = prismaProperty.verifiedBy;
    entity.createdAt = prismaProperty.createdAt;
    entity.updatedAt = prismaProperty.updatedAt;
    entity.deletedAt = prismaProperty.deletedAt;
    entity.createdBy = prismaProperty.createdBy;
    entity.updatedBy = prismaProperty.updatedBy;
    return entity;
  }
}
