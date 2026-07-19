import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ActivityLog } from '../entities/activity-log.entity';
import { IActivityLogRepository } from '../interfaces/activity-log.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class ActivityLogRepository implements IActivityLogRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ActivityLog | null> {
    const activityLog = await this.prisma.activityLog.findUnique({
      where: { id },
    });
    return activityLog as ActivityLog | null;
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ActivityLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.activityLog.count({ where: { userId } }),
    ]);

    return {
      data: data as ActivityLog[],
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

  async findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ActivityLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where: { action },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.activityLog.count({ where: { action } }),
    ]);

    return {
      data: data as ActivityLog[],
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

  async findByRequestId(requestId: string): Promise<ActivityLog[]> {
    const activityLogs = await this.prisma.activityLog.findMany({
      where: { requestId },
    });
    return activityLogs as ActivityLog[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ActivityLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.search) {
      where.OR = [
        { action: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters?.startDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    const [data, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.activityLog.count({ where }),
    ]);

    return {
      data: data as ActivityLog[],
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

  async create(data: any): Promise<ActivityLog> {
    const activityLog = await (this.transaction || this.prisma).activityLog.create({
      data,
    });
    return activityLog as ActivityLog;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
