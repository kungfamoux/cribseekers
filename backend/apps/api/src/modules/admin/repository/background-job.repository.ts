import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { BackgroundJob } from '../entities/background-job.entity';
import { IBackgroundJobRepository } from '../interfaces/background-job.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class BackgroundJobRepository implements IBackgroundJobRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<BackgroundJob | null> {
    const backgroundJob = await this.prisma.backgroundJob.findUnique({
      where: { id },
    });
    return backgroundJob as BackgroundJob | null;
  }

  async findByQueue(queue: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'scheduledAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.backgroundJob.findMany({
        where: { queue },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.backgroundJob.count({ where: { queue } }),
    ]);

    return {
      data: data as BackgroundJob[],
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

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'scheduledAt';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.backgroundJob.findMany({
        where: { status: status as any },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.backgroundJob.count({ where: { status: status as any } }),
    ]);

    return {
      data: data as BackgroundJob[],
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

  async findPendingJobs(options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'priority';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.backgroundJob.findMany({
        where: {
          status: 'PENDING',
          scheduledAt: { lte: new Date() },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.backgroundJob.count({
        where: {
          status: 'PENDING',
          scheduledAt: { lte: new Date() },
        },
      }),
    ]);

    return {
      data: data as BackgroundJob[],
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

  async findFailedJobs(options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'failedAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.backgroundJob.findMany({
        where: { status: 'FAILED' },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.backgroundJob.count({ where: { status: 'FAILED' } }),
    ]);

    return {
      data: data as BackgroundJob[],
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BackgroundJob>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'scheduledAt';
    const sortOrder = options?.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.queue) {
      where.queue = filters.queue;
    }
    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.backgroundJob.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.backgroundJob.count({ where }),
    ]);

    return {
      data: data as BackgroundJob[],
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

  async create(data: any): Promise<BackgroundJob> {
    const backgroundJob = await (this.transaction || this.prisma).backgroundJob.create({
      data,
    });
    return backgroundJob as BackgroundJob;
  }

  async update(id: string, data: any): Promise<BackgroundJob> {
    const backgroundJob = await (this.transaction || this.prisma).backgroundJob.update({
      where: { id },
      data,
    });
    return backgroundJob as BackgroundJob;
  }

  async delete(id: string): Promise<BackgroundJob> {
    const backgroundJob = await (this.transaction || this.prisma).backgroundJob.delete({
      where: { id },
    });
    return backgroundJob as BackgroundJob;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
