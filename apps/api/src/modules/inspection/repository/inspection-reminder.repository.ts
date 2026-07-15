import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionReminder } from '../entities/inspection-reminder.entity';
import { IInspectionReminderRepository } from '../interfaces/inspection-reminder.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/inspection.repository.interface';

@Injectable()
export class InspectionReminderRepository implements IInspectionReminderRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<InspectionReminder | null> {
    const reminder = await this.prisma.inspectionReminder.findUnique({
      where: { id },
    });
    return reminder as InspectionReminder | null;
  }

  async findByInspectionId(
    inspectionId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionReminder>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'remindAt';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionReminder.findMany({
        where: { inspectionId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionReminder.count({ where: { inspectionId } }),
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

  async findByUserId(
    userId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionReminder>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'remindAt';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionReminder.findMany({
        where: { userId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionReminder.count({ where: { userId } }),
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

  async findByStatus(
    status: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionReminder>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'remindAt';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionReminder.findMany({
        where: { status: status as any },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionReminder.count({ where: { status: status as any } }),
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

  async findPendingReminders(
    before: Date,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionReminder>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'remindAt';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionReminder.findMany({
        where: {
          status: 'PENDING',
          remindAt: { lte: before },
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionReminder.count({
        where: {
          status: 'PENDING',
          remindAt: { lte: before },
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

  async create(data: any): Promise<InspectionReminder> {
    return this.prisma.inspectionReminder.create({ data }) as Promise<InspectionReminder>;
  }

  async update(id: string, data: any): Promise<InspectionReminder> {
    return this.prisma.inspectionReminder.update({
      where: { id },
      data,
    }) as Promise<InspectionReminder>;
  }

  async delete(id: string): Promise<InspectionReminder> {
    return this.prisma.inspectionReminder.delete({
      where: { id },
    }) as Promise<InspectionReminder>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
