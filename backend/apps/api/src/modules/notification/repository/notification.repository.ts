import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Notification } from '../entities/notification.entity';
import { INotificationRepository, PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    return notification as Notification | null;
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    return {
      data: data as Notification[],
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

  async findByType(type: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { type: type as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where: { type: type as any } }),
    ]);

    return {
      data: data as Notification[],
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

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { status: status as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where: { status: status as any } }),
    ]);

    return {
      data: data as Notification[],
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

  async findByPriority(priority: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { priority: priority as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where: { priority: priority as any } }),
    ]);

    return {
      data: data as Notification[],
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

  async findUnread(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId, readAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where: { userId, readAt: null } }),
    ]);

    return {
      data: data as Notification[],
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

  async findExpired(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'expiresAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { expiresAt: { lt: new Date() } },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where: { expiresAt: { lt: new Date() } } }),
    ]);

    return {
      data: data as Notification[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Notification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.status) where.status = filters.status;
    if (filters?.type) where.type = filters.type;
    if (filters?.priority) where.priority = filters.priority;
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { message: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters?.startDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(filters.startDate) };
    }
    if (filters?.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      data: data as Notification[],
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

  async create(data: any): Promise<Notification> {
    const notification = await (this.transaction || this.prisma).notification.create({
      data,
    });
    return notification as Notification;
  }

  async update(id: string, data: any): Promise<Notification> {
    const notification = await (this.transaction || this.prisma).notification.update({
      where: { id },
      data,
    });
    return notification as Notification;
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await (this.transaction || this.prisma).notification.update({
      where: { id },
      data: { readAt: new Date(), status: 'READ' as any },
    });
    return notification as Notification;
  }

  async markAsDismissed(id: string): Promise<Notification> {
    const notification = await (this.transaction || this.prisma).notification.update({
      where: { id },
      data: { status: 'DISMISSED' as any },
    });
    return notification as Notification;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
