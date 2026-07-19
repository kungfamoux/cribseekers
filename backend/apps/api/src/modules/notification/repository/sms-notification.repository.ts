import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { SMSNotification } from '../entities/sms-notification.entity';
import { ISMSNotificationRepository } from '../interfaces/sms-notification.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class SMSNotificationRepository implements ISMSNotificationRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<SMSNotification | null> {
    const sms = await this.prisma.sMSNotification.findUnique({
      where: { id },
    });
    return sms as SMSNotification | null;
  }

  async findByNotificationId(notificationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.sMSNotification.findMany({
        where: { notificationId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.sMSNotification.count({ where: { notificationId, deletedAt: null } }),
    ]);

    return {
      data: data as SMSNotification[],
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

  async findByTo(to: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.sMSNotification.findMany({
        where: { to, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.sMSNotification.count({ where: { to, deletedAt: null } }),
    ]);

    return {
      data: data as SMSNotification[],
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

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.sMSNotification.findMany({
        where: { status: status as any, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.sMSNotification.count({ where: { status: status as any, deletedAt: null } }),
    ]);

    return {
      data: data as SMSNotification[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<SMSNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };
    if (filters?.notificationId) where.notificationId = filters.notificationId;
    if (filters?.to) where.to = filters.to;
    if (filters?.status) where.status = filters.status;
    if (filters?.search) {
      where.OR = [
        { message: { contains: filters.search, mode: 'insensitive' } },
        { to: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.sMSNotification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.sMSNotification.count({ where }),
    ]);

    return {
      data: data as SMSNotification[],
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

  async create(data: any): Promise<SMSNotification> {
    const sms = await (this.transaction || this.prisma).sMSNotification.create({
      data,
    });
    return sms as SMSNotification;
  }

  async update(id: string, data: any): Promise<SMSNotification> {
    const sms = await (this.transaction || this.prisma).sMSNotification.update({
      where: { id },
      data,
    });
    return sms as SMSNotification;
  }

  async softDelete(id: string): Promise<SMSNotification> {
    const sms = await (this.transaction || this.prisma).sMSNotification.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return sms as SMSNotification;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
