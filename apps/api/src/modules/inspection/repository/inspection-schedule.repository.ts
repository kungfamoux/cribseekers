import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionSchedule } from '../entities/inspection-schedule.entity';
import { IInspectionScheduleRepository } from '../interfaces/inspection-schedule.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/inspection.repository.interface';

@Injectable()
export class InspectionScheduleRepository implements IInspectionScheduleRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<InspectionSchedule | null> {
    const schedule = await this.prisma.inspectionSchedule.findUnique({
      where: { id },
    });
    return schedule as InspectionSchedule | null;
  }

  async findByInspectionId(
    inspectionId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionSchedule>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'startTime';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionSchedule.findMany({
        where: { inspectionId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionSchedule.count({ where: { inspectionId } }),
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

  async findAvailableSlots(
    startTime: Date,
    endTime: Date,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionSchedule>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;

    const [data, total] = await Promise.all([
      this.prisma.inspectionSchedule.findMany({
        where: {
          isAvailable: true,
          startTime: { gte: startTime },
          endTime: { lte: endTime },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionSchedule.count({
        where: {
          isAvailable: true,
          startTime: { gte: startTime },
          endTime: { lte: endTime },
        },
      }),
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

  async create(data: any): Promise<InspectionSchedule> {
    return this.prisma.inspectionSchedule.create({ data }) as Promise<InspectionSchedule>;
  }

  async update(id: string, data: any): Promise<InspectionSchedule> {
    return this.prisma.inspectionSchedule.update({
      where: { id },
      data,
    }) as Promise<InspectionSchedule>;
  }

  async delete(id: string): Promise<InspectionSchedule> {
    return this.prisma.inspectionSchedule.delete({
      where: { id },
    }) as Promise<InspectionSchedule>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
