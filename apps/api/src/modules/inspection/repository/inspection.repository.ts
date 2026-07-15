import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Inspection } from '../entities/inspection.entity';
import {
  IInspectionRepository,
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/inspection.repository.interface';

@Injectable()
export class InspectionRepository implements IInspectionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Inspection | null> {
    const inspection = await this.prisma.inspection.findUnique({
      where: { id, deletedAt: null },
    });
    return inspection as Inspection | null;
  }

  async findByPropertyId(
    propertyId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Inspection>> {
    return this.findMany({ propertyId }, options);
  }

  async findByRequestedBy(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Inspection>> {
    return this.findMany({ requestedBy: userId }, options);
  }

  async findByStatus(
    status: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Inspection>> {
    return this.findMany({ status: status as any }, options);
  }

  async findMany(
    filters: any,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<Inspection>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'scheduledAt';
    const sortOrder = options?.sortOrder || 'asc';

    const where: any = { deletedAt: null };
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.requestedBy) where.requestedBy = filters.requestedBy;
    if (filters?.status) where.status = filters.status;
    if (filters?.scheduledFrom) where.scheduledAt = { ...where.scheduledAt, gte: filters.scheduledFrom };
    if (filters?.scheduledTo) where.scheduledAt = { ...where.scheduledAt, lte: filters.scheduledTo };

    const [data, total] = await Promise.all([
      this.prisma.inspection.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspection.count({ where }),
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

  async create(data: any): Promise<Inspection> {
    return this.prisma.inspection.create({ data }) as Promise<Inspection>;
  }

  async update(id: string, data: any): Promise<Inspection> {
    return this.prisma.inspection.update({
      where: { id },
      data,
    }) as Promise<Inspection>;
  }

  async delete(id: string): Promise<Inspection> {
    return this.prisma.inspection.update({
      where: { id },
      data: { deletedAt: new Date() },
    }) as Promise<Inspection>;
  }

  async count(filters?: any): Promise<number> {
    const where: any = { deletedAt: null };
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.status) where.status = filters.status;
    return this.prisma.inspection.count({ where });
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
