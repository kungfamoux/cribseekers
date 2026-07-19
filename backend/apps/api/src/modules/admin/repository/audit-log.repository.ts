import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { AuditLog } from '../entities/audit-log.entity';
import { IAuditLogRepository, PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class AuditLogRepository implements IAuditLogRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AuditLog | null> {
    const auditLog = await this.prisma.auditLog.findUnique({
      where: { id },
    });
    return auditLog as AuditLog | null;
  }

  async findByActorId(actorId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { actorId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.auditLog.count({ where: { actorId } }),
    ]);

    return {
      data: data as AuditLog[],
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

  async findByEntityType(entityType: string, entityId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { entityType, entityId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.auditLog.count({ where: { entityType, entityId } }),
    ]);

    return {
      data: data as AuditLog[],
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

  async findByAction(action: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { action: action as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.auditLog.count({ where: { action: action as any } }),
    ]);

    return {
      data: data as AuditLog[],
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

  async findByRequestId(requestId: string): Promise<AuditLog[]> {
    const auditLogs = await this.prisma.auditLog.findMany({
      where: { requestId },
    });
    return auditLogs as AuditLog[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<AuditLog>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.search) {
      where.OR = [
        { action: { contains: filters.search, mode: 'insensitive' } },
        { entityType: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters?.startDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data: data as AuditLog[],
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

  async create(data: any): Promise<AuditLog> {
    const auditLog = await (this.transaction || this.prisma).auditLog.create({
      data,
    });
    return auditLog as AuditLog;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
