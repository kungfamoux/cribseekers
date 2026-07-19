import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyHistory } from '../entities/property-history.entity';
import { IPropertyHistoryRepository } from '../interfaces/property-history.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class PropertyHistoryRepository implements IPropertyHistoryRepository {
  private prisma: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
  }

  async findById(id: string): Promise<PropertyHistory | null> {
    const history = await this.prisma.propertyHistory.findUnique({
      where: { id },
    });
    return history ? this.toEntity(history) : null;
  }

  async findByPropertyId(propertyId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>> {
    const { page = 1, limit = 10, sortBy = 'performedAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = { propertyId };

    const [data, total] = await Promise.all([
      this.prisma.propertyHistory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyHistory.count({ where }),
    ]);

    return {
      data: data.map((h: any) => this.toEntity(h)),
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

  async findMany(filters?: Partial<PropertyHistory>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>> {
    const { page = 1, limit = 10, sortBy = 'performedAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.action) where.action = filters.action;
    if (filters?.performedBy) where.performedBy = filters.performedBy;

    const [data, total] = await Promise.all([
      this.prisma.propertyHistory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyHistory.count({ where }),
    ]);

    return {
      data: data.map((h: any) => this.toEntity(h)),
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

  async create(data: Omit<PropertyHistory, 'id' | 'createdAt'>): Promise<PropertyHistory> {
    const history = await this.prisma.propertyHistory.create({
      data,
    });
    return this.toEntity(history);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.propertyHistory.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const history = await this.prisma.propertyHistory.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!history;
  }

  async count(filters?: Partial<PropertyHistory>): Promise<number> {
    const where: any = {};
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.action) where.action = filters.action;
    if (filters?.performedBy) where.performedBy = filters.performedBy;
    return this.prisma.propertyHistory.count({ where });
  }

  async findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>> {
    return this.findMany({ action }, options);
  }

  async findByPerformedBy(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyHistory>> {
    return this.findMany({ performedBy: userId }, options);
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }

  private toEntity(prismaHistory: any): PropertyHistory {
    const entity = new PropertyHistory();
    entity.id = prismaHistory.id;
    entity.propertyId = prismaHistory.propertyId;
    entity.action = prismaHistory.action;
    entity.changes = prismaHistory.changes;
    entity.performedBy = prismaHistory.performedBy;
    entity.performedAt = prismaHistory.performedAt;
    entity.createdAt = prismaHistory.createdAt;
    return entity;
  }
}
