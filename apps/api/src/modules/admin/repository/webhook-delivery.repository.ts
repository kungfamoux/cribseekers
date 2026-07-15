import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { WebhookDelivery } from '../entities/webhook-delivery.entity';
import { IWebhookDeliveryRepository } from '../interfaces/webhook-delivery.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class WebhookDeliveryRepository implements IWebhookDeliveryRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<WebhookDelivery | null> {
    const webhookDelivery = await this.prisma.webhookDelivery.findUnique({
      where: { id },
    });
    return webhookDelivery as WebhookDelivery | null;
  }

  async findByWebhookId(webhookId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.webhookDelivery.findMany({
        where: { webhookId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhookDelivery.count({ where: { webhookId } }),
    ]);

    return {
      data: data as WebhookDelivery[],
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

  async findByEvent(event: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.webhookDelivery.findMany({
        where: { event },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhookDelivery.count({ where: { event } }),
    ]);

    return {
      data: data as WebhookDelivery[],
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

  async findBySuccess(success: boolean, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.webhookDelivery.findMany({
        where: { success },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhookDelivery.count({ where: { success } }),
    ]);

    return {
      data: data as WebhookDelivery[],
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

  async findPendingRetries(options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'nextRetryAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.webhookDelivery.findMany({
        where: {
          success: false,
          nextRetryAt: { lte: new Date() },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhookDelivery.count({
        where: {
          success: false,
          nextRetryAt: { lte: new Date() },
        },
      }),
    ]);

    return {
      data: data as WebhookDelivery[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<WebhookDelivery>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.webhookId) {
      where.webhookId = filters.webhookId;
    }
    if (filters?.success !== undefined) {
      where.success = filters.success;
    }
    if (filters?.event) {
      where.event = filters.event;
    }
    if (filters?.search) {
      where.OR = [
        { event: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.webhookDelivery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.webhookDelivery.count({ where }),
    ]);

    return {
      data: data as WebhookDelivery[],
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

  async create(data: any): Promise<WebhookDelivery> {
    const webhookDelivery = await (this.transaction || this.prisma).webhookDelivery.create({
      data,
    });
    return webhookDelivery as WebhookDelivery;
  }

  async update(id: string, data: any): Promise<WebhookDelivery> {
    const webhookDelivery = await (this.transaction || this.prisma).webhookDelivery.update({
      where: { id },
      data,
    });
    return webhookDelivery as WebhookDelivery;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
