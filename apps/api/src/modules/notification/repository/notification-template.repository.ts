import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { NotificationTemplate } from '../entities/notification-template.entity';
import { INotificationTemplateRepository } from '../interfaces/notification-template.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/notification.repository.interface';

@Injectable()
export class NotificationTemplateRepository implements INotificationTemplateRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NotificationTemplate | null> {
    const template = await this.prisma.notificationTemplate.findUnique({
      where: { id },
    });
    return template as NotificationTemplate | null;
  }

  async findByName(name: string): Promise<NotificationTemplate | null> {
    const template = await this.prisma.notificationTemplate.findUnique({
      where: { name },
    });
    return template as NotificationTemplate | null;
  }

  async findByType(type: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationTemplate>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationTemplate.findMany({
        where: { type: type as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationTemplate.count({ where: { type: type as any } }),
    ]);

    return {
      data: data as NotificationTemplate[],
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

  async findActive(options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationTemplate>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notificationTemplate.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationTemplate.count({ where: { isActive: true } }),
    ]);

    return {
      data: data as NotificationTemplate[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<NotificationTemplate>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.type) where.type = filters.type;
    if (filters?.isActive !== undefined) where.isActive = filters.isActive;
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { subject: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.notificationTemplate.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.notificationTemplate.count({ where }),
    ]);

    return {
      data: data as NotificationTemplate[],
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

  async create(data: any): Promise<NotificationTemplate> {
    const template = await (this.transaction || this.prisma).notificationTemplate.create({
      data,
    });
    return template as NotificationTemplate;
  }

  async update(id: string, data: any): Promise<NotificationTemplate> {
    const template = await (this.transaction || this.prisma).notificationTemplate.update({
      where: { id },
      data,
    });
    return template as NotificationTemplate;
  }

  async delete(id: string): Promise<NotificationTemplate> {
    const template = await (this.transaction || this.prisma).notificationTemplate.delete({
      where: { id },
    });
    return template as NotificationTemplate;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
