import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyReport } from '../entities/property-report.entity';
import { IPropertyReportRepository } from '../interfaces/property-report.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class PropertyReportRepository implements IPropertyReportRepository {
  private prisma: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
  }

  async findById(id: string): Promise<PropertyReport | null> {
    const report = await this.prisma.propertyReport.findUnique({
      where: { id },
    });
    return report ? this.toEntity(report) : null;
  }

  async findByPropertyId(propertyId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = { propertyId, deletedAt: null };

    const [data, total] = await Promise.all([
      this.prisma.propertyReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyReport.count({ where }),
    ]);

    return {
      data: data.map((r: any) => this.toEntity(r)),
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

  async findByReporter(reporterId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where = { reportedBy: reporterId, deletedAt: null };

    const [data, total] = await Promise.all([
      this.prisma.propertyReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyReport.count({ where }),
    ]);

    return {
      data: data.map((r: any) => this.toEntity(r)),
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

  async findMany(filters?: Partial<PropertyReport>, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};
    const skip = (page - 1) * limit;

    const where: any = { deletedAt: null };
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.reportedBy) where.reportedBy = filters.reportedBy;
    if (filters?.status) where.status = filters.status;

    const [data, total] = await Promise.all([
      this.prisma.propertyReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.propertyReport.count({ where }),
    ]);

    return {
      data: data.map((r: any) => this.toEntity(r)),
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

  async create(data: Omit<PropertyReport, 'id' | 'createdAt' | 'updatedAt'>): Promise<PropertyReport> {
    const report = await this.prisma.propertyReport.create({
      data,
    });
    return this.toEntity(report);
  }

  async update(id: string, data: Partial<Omit<PropertyReport, 'id' | 'createdAt'>>): Promise<PropertyReport> {
    const report = await this.prisma.propertyReport.update({
      where: { id },
      data,
    });
    return this.toEntity(report);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.propertyReport.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: string): Promise<boolean> {
    const report = await this.prisma.propertyReport.findUnique({
      where: { id, deletedAt: null },
      select: { id: true },
    });
    return !!report;
  }

  async count(filters?: Partial<PropertyReport>): Promise<number> {
    const where: any = { deletedAt: null };
    if (filters?.propertyId) where.propertyId = filters.propertyId;
    if (filters?.reportedBy) where.reportedBy = filters.reportedBy;
    if (filters?.status) where.status = filters.status;
    return this.prisma.propertyReport.count({ where });
  }

  async findByStatus(status: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<PropertyReport>> {
    return this.findMany({ status }, options);
  }

  async hasUserReportedProperty(propertyId: string, userId: string): Promise<boolean> {
    const report = await this.prisma.propertyReport.findFirst({
      where: { propertyId, reportedBy: userId, deletedAt: null },
      select: { id: true },
    });
    return !!report;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }

  private toEntity(prismaReport: any): PropertyReport {
    const entity = new PropertyReport();
    entity.id = prismaReport.id;
    entity.propertyId = prismaReport.propertyId;
    entity.reportedBy = prismaReport.reportedBy;
    entity.reason = prismaReport.reason;
    entity.description = prismaReport.description;
    entity.status = prismaReport.status;
    entity.reviewedBy = prismaReport.reviewedBy;
    entity.reviewedAt = prismaReport.reviewedAt;
    entity.resolution = prismaReport.resolution;
    entity.createdAt = prismaReport.createdAt;
    entity.updatedAt = prismaReport.updatedAt;
    entity.deletedAt = prismaReport.deletedAt;
    return entity;
  }
}
