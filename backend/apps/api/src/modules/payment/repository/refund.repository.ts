import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Refund } from '../entities/refund.entity';
import {
  IRefundRepository,
} from '../interfaces/refund.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class RefundRepository implements IRefundRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Refund | null> {
    const refund = await this.prisma.refund.findUnique({
      where: { id },
    });
    return refund as Refund | null;
  }

  async findByPaymentId(paymentId: string): Promise<Refund[]> {
    const refunds = await this.prisma.refund.findMany({
      where: { paymentId },
    });
    return refunds as Refund[];
  }

  async findByEscrowId(escrowId: string): Promise<Refund[]> {
    const refunds = await this.prisma.refund.findMany({
      where: { escrowId },
    });
    return refunds as Refund[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Refund>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.refund.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.refund.count({ where: filters }),
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

  async create(data: any): Promise<Refund> {
    return this.prisma.refund.create({ data }) as Promise<Refund>;
  }

  async update(id: string, data: any): Promise<Refund> {
    return this.prisma.refund.update({
      where: { id },
      data,
    }) as Promise<Refund>;
  }

  async delete(id: string): Promise<Refund> {
    return this.prisma.refund.delete({
      where: { id },
    }) as Promise<Refund>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
