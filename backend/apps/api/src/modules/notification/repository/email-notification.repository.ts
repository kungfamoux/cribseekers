import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { EmailNotification } from '../entities/email-notification.entity';
import { IEmailNotificationRepository } from '../interfaces/email-notification.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class EmailNotificationRepository implements IEmailNotificationRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<EmailNotification | null> {
    const email = await this.prisma.emailNotification.findUnique({
      where: { id },
    });
    return email as EmailNotification | null;
  }

  async findByNotificationId(notificationId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.emailNotification.findMany({
        where: { notificationId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.emailNotification.count({ where: { notificationId, deletedAt: null } }),
    ]);

    return {
      data: data as EmailNotification[],
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

  async findByTo(to: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.emailNotification.findMany({
        where: { to, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.emailNotification.count({ where: { to, deletedAt: null } }),
    ]);

    return {
      data: data as EmailNotification[],
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

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.emailNotification.findMany({
        where: { status: status as any, deletedAt: null },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.emailNotification.count({ where: { status: status as any, deletedAt: null } }),
    ]);

    return {
      data: data as EmailNotification[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<EmailNotification>> {
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
        { subject: { contains: filters.search, mode: 'insensitive' } },
        { to: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.emailNotification.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.emailNotification.count({ where }),
    ]);

    return {
      data: data as EmailNotification[],
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

  async create(data: any): Promise<EmailNotification> {
    const email = await (this.transaction || this.prisma).emailNotification.create({
      data,
    });
    return email as EmailNotification;
  }

  async update(id: string, data: any): Promise<EmailNotification> {
    const email = await (this.transaction || this.prisma).emailNotification.update({
      where: { id },
      data,
    });
    return email as EmailNotification;
  }

  async softDelete(id: string): Promise<EmailNotification> {
    const email = await (this.transaction || this.prisma).emailNotification.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return email as EmailNotification;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
