import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { NotificationQueue } from '../entities/notification-queue.entity';
import { INotificationQueueRepository } from '../interfaces/notification-queue.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class NotificationQueueRepository implements INotificationQueueRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NotificationQueue | null> {
    const queue = await this.prisma.notificationQueue.findUnique({
      where: { id },
    });
    return queue as NotificationQueue | null;
  }

  async findByNotificationId(notificationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where: { notificationId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({ where: { notificationId, deletedAt: null } }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async findByChannel(channel: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where: { channel: channel as any, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({ where: { channel: channel as any, deletedAt: null } }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where: { status: status as any, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({ where: { status: status as any, deletedAt: null } }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async findPending(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'scheduledAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where: { status: 'PENDING' as any, scheduledAt: { lte: new Date() }, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({
        where: { status: 'PENDING' as any, scheduledAt: { lte: new Date() }, deletedAt: null },
      }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async findFailed(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where: { status: 'FAILED' as any, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({ where: { status: 'FAILED' as any, deletedAt: null } }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async findRetryable(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where: {
          status: 'FAILED' as any,
          attempts: { lt: 3 },
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({
        where: {
          status: 'FAILED' as any,
          attempts: { lt: 3 },
          deletedAt: null,
        },
      }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationQueue>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };
    if (filters?.notificationId) where.notificationId = filters.notificationId;
    if (filters?.channel) where.channel = filters.channel;
    if (filters?.status) where.status = filters.status;
    if (filters?.search) {
      where.OR = [
        { error: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.notificationQueue.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationQueue.count({ where }),
    ]);

    return {
      data: data as NotificationQueue[],
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

  async create(data: any): Promise<NotificationQueue> {
    const queue = await (this.transaction || this.prisma).notificationQueue.create({
      data,
    });
    return queue as NotificationQueue;
  }

  async update(id: string, data: any): Promise<NotificationQueue> {
    const queue = await (this.transaction || this.prisma).notificationQueue.update({
      where: { id },
      data,
    });
    return queue as NotificationQueue;
  }

  async softDelete(id: string): Promise<NotificationQueue> {
    const queue = await (this.transaction || this.prisma).notificationQueue.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return queue as NotificationQueue;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
