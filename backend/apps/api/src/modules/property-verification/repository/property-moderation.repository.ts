import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyModeration } from '../entities/property-moderation.entity';
import { IPropertyModerationRepository } from '../interfaces/property-moderation.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class PropertyModerationRepository implements IPropertyModerationRepository {
  private prisma: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
  }

  async findById(id: string): Promise<PropertyModeration | null> {
    const moderation = await this.prisma.propertyModeration.findUnique({
      where: { id },
    });
    return moderation ? this.toEntity(moderation) : null;
  }

  async findByPropertyId(propertyId: string): Promise<PropertyModeration | null> {
    const moderation = await this.prisma.propertyModeration.findFirst({
      where: { propertyId, deletedAt: null },
    });
    return moderation ? this.toEntity(moderation) : null;
  }

  async findMany(
    filters?: Partial<PropertyModeration>,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<PropertyModeration>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.status) where.status = filters.status;
    if (filters?.reviewedBy) where.reviewedBy = filters.reviewedBy;

    const [data, total] = await Promise.all([
      this.prisma.propertyModeration.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyModeration.count({ where }),
    ]);

    return {
      data: data.map((m: any) => this.toEntity(m)),
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

  async create(data: Omit<PropertyModeration, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyModeration> {
    const moderation = await this.prisma.propertyModeration.create({
      data,
    });
    return this.toEntity(moderation);
  }

  async update(id: string, data: Partial<Omit<PropertyModeration, 'id' | 'createdAt'>>): Promise<PropertyModeration> {
    const moderation = await this.prisma.propertyModeration.update({
      where: { id },
      data,
    });
    return this.toEntity(moderation);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.propertyModeration.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: string): Promise<boolean> {
    const moderation = await this.prisma.propertyModeration.findUnique({
      where: { id, deletedAt: null },
      select: { id: true },
    });
    return !!moderation;
  }

  async count(filters?: Partial<PropertyModeration>): Promise<number> {
    const where: any = { deletedAt: null };
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.status) where.status = filters.status;
    return this.prisma.propertyModeration.count({ where });
  }

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyModeration>> {
    return this.findMany({ status: status as any }, options);
  }

  async findByReviewer(reviewerId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyModeration>> {
    return this.findMany({ reviewedBy: reviewerId }, options);
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }

  private toEntity(prismaModeration: any): PropertyModeration {
    const entity = new PropertyModeration();
    entity.id = prismaModeration.id;
    entity.propertyId = prismaModeration.propertyId;
    entity.status = prismaModeration.status;
    entity.reviewedBy = prismaModeration.reviewedBy;
    entity.reviewedAt = prismaModeration.reviewedAt;
    entity.rejectionReason = prismaModeration.rejectionReason;
    entity.notes = prismaModeration.notes;
    entity.createdAt = prismaModeration.createdAt;
    entity.updatedAt = prismaModeration.updatedAt;
    entity.deletedAt = prismaModeration.deletedAt;
    return entity;
  }
}
