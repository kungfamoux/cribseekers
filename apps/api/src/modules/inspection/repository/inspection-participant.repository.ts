import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionParticipant } from '../entities/inspection-participant.entity';
import { IInspectionParticipantRepository } from '../interfaces/inspection-participant.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/inspection.repository.interface';

@Injectable()
export class InspectionParticipantRepository implements IInspectionParticipantRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<InspectionParticipant | null> {
    const participant = await this.prisma.inspectionParticipant.findUnique({
      where: { id },
    });
    return participant as InspectionParticipant | null;
  }

  async findByInspectionId(
    inspectionId: string,
    options?: PaginationOptions & SortOptions,
  ): Promise<PaginationResult<InspectionParticipant>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionParticipant.findMany({
        where: { inspectionId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionParticipant.count({ where: { inspectionId } }),
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
  ): Promise<PaginationResult<InspectionParticipant>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'asc';

    const [data, total] = await Promise.all([
      this.prisma.inspectionParticipant.findMany({
        where: { userId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionParticipant.count({ where: { userId } }),
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

  async findByInspectionAndUser(
    inspectionId: string,
    userId: string,
  ): Promise<InspectionParticipant | null> {
    const participant = await this.prisma.inspectionParticipant.findUnique({
      where: {
        inspectionId_userId: {
          inspectionId,
          userId,
        },
      },
    });
    return participant as InspectionParticipant | null;
  }

  async create(data: any): Promise<InspectionParticipant> {
    return this.prisma.inspectionParticipant.create({ data }) as Promise<InspectionParticipant>;
  }

  async update(id: string, data: any): Promise<InspectionParticipant> {
    return this.prisma.inspectionParticipant.update({
      where: { id },
      data,
    }) as Promise<InspectionParticipant>;
  }

  async delete(id: string): Promise<InspectionParticipant> {
    return this.prisma.inspectionParticipant.delete({
      where: { id },
    }) as Promise<InspectionParticipant>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
