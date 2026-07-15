import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { FeatureFlag } from '../entities/feature-flag.entity';
import { IFeatureFlagRepository } from '../interfaces/feature-flag.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class FeatureFlagRepository implements IFeatureFlagRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<FeatureFlag | null> {
    const featureFlag = await this.prisma.featureFlag.findUnique({
      where: { id },
    });
    return featureFlag as FeatureFlag | null;
  }

  async findByKey(key: string): Promise<FeatureFlag | null> {
    const featureFlag = await this.prisma.featureFlag.findUnique({
      where: { key },
    });
    return featureFlag as FeatureFlag | null;
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<FeatureFlag>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'key';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.enabled !== undefined) {
      where.enabled = filters.enabled;
    }
    if (filters?.search) {
      where.OR = [
        { key: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.featureFlag.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.featureFlag.count({ where }),
    ]);

    return {
      data: data as FeatureFlag[],
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

  async create(data: any): Promise<FeatureFlag> {
    const featureFlag = await (this.transaction || this.prisma).featureFlag.create({
      data,
    });
    return featureFlag as FeatureFlag;
  }

  async update(id: string, data: any): Promise<FeatureFlag> {
    const featureFlag = await (this.transaction || this.prisma).featureFlag.update({
      where: { id },
      data,
    });
    return featureFlag as FeatureFlag;
  }

  async delete(id: string): Promise<FeatureFlag> {
    const featureFlag = await (this.transaction || this.prisma).featureFlag.delete({
      where: { id },
    });
    return featureFlag as FeatureFlag;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
