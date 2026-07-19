import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ReportCategory } from '../entities/report-category.entity';
import { IReportCategoryRepository } from '../interfaces/report-category.repository.interface';
import { PaginationOptions, SortOptions, PaginationResult } from '../interfaces/audit-log.repository.interface';

@Injectable()
export class ReportCategoryRepository implements IReportCategoryRepository {
  private transaction: any = null;

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ReportCategory | null> {
    const reportCategory = await this.prisma.reportCategory.findUnique({
      where: { id },
    });
    return reportCategory as ReportCategory | null;
  }

  async findByName(name: string): Promise<ReportCategory | null> {
    const reportCategory = await this.prisma.reportCategory.findUnique({
      where: { name },
    });
    return reportCategory as ReportCategory | null;
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<ReportCategory>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'sortOrder';
    const sortOrder = options?.sortOrder || 'asc';

    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.reportCategory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.reportCategory.count({ where }),
    ]);

    return {
      data: data as ReportCategory[],
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

  async create(data: any): Promise<ReportCategory> {
    const reportCategory = await (this.transaction || this.prisma).reportCategory.create({
      data,
    });
    return reportCategory as ReportCategory;
  }

  async update(id: string, data: any): Promise<ReportCategory> {
    const reportCategory = await (this.transaction || this.prisma).reportCategory.update({
      where: { id },
      data,
    });
    return reportCategory as ReportCategory;
  }

  async delete(id: string): Promise<ReportCategory> {
    const reportCategory = await (this.transaction || this.prisma).reportCategory.delete({
      where: { id },
    });
    return reportCategory as ReportCategory;
  }

  withTransaction(transaction: any): this {
    this.transaction = transaction;
    return this;
  }
}
