import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionHistory } from '../entities/inspection-history.entity';
import { IInspectionHistoryRepository } from '../interfaces/inspection-history.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/inspection.repository.interface';

@Injectable()
export class InspectionHistoryRepository implements IInspectionHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<InspectionHistory | null> {
    const history = await this.prisma.inspectionHistory.findUnique({
      where: { id },
    });
    return history as InspectionHistory | null;
  }

  async findByInspectionId(
    inspectionId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionHistory>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'performedAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionHistory.findMany({
        where: { inspectionId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionHistory.count({ where: { inspectionId } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findByPerformedBy(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionHistory>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'performedAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionHistory.findMany({
        where: { performedBy: userId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionHistory.count({ where: { performedBy: userId } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async create(data: any): Promise<InspectionHistory> {
    return this.prisma.inspectionHistory.create({ data }) as Promise<InspectionHistory>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
