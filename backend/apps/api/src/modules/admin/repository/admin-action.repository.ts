import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { AdminAction } from '../entities/admin-action.entity';
import { IAdminActionRepository } from '../interfaces/admin-action.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class AdminActionRepository implements IAdminActionRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AdminAction | null> {
    const adminAction = await this.prisma.adminAction.findUnique({
      where: { id },
    });
    return adminAction as AdminAction | null;
  }

  async findByAdminId(adminId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.adminAction.findMany({
        where: { adminId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.adminAction.count({ where: { adminId } }),
    ]);

    return {
      data: data as AdminAction[],
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

  async findByTargetEntity(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.adminAction.findMany({
        where: { targetEntityType: entityType, targetEntityId: entityId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.adminAction.count({ where: { targetEntityType: entityType, targetEntityId: entityId } }),
    ]);

    return {
      data: data as AdminAction[],
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

  async findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.adminAction.findMany({
        where: { action },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.adminAction.count({ where: { action } }),
    ]);

    return {
      data: data as AdminAction[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AdminAction>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.search) {
      where.OR = [
        { action: { contains: filters.search, mode: 'insensitive' } },
        { targetEntityType: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters?.startDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    const [data, total] = await Promise.all([
      this.prisma.adminAction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.adminAction.count({ where }),
    ]);

    return {
      data: data as AdminAction[],
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

  async create(data: any): Promise<AdminAction> {
    const adminAction = await (this.transaction || this.prisma).adminAction.create({
      data,
    });
    return adminAction as AdminAction;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
