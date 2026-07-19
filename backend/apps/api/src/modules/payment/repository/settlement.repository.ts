import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Settlement } from '../entities/settlement.entity';
import {
  ISettlementRepository,
} from '../interfaces/settlement.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Settlement | null> {
    const settlement = await this.prisma.settlement.findUnique({
      where: { id },
    });
    return settlement as Settlement | null;
  }

  async findByEscrowId(escrowId: string): Promise<Settlement[]> {
    const settlements = await this.prisma.settlement.findMany({
      where: { escrowId },
    });
    return settlements as Settlement[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Settlement>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.settlement.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.settlement.count({ where: filters }),
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

  async create(data: any): Promise<Settlement> {
    return this.prisma.settlement.create({ data }) as Promise<Settlement>;
  }

  async update(id: string, data: any): Promise<Settlement> {
    return this.prisma.settlement.update({
      where: { id },
      data,
    }) as Promise<Settlement>;
  }

  async delete(id: string): Promise<Settlement> {
    return this.prisma.settlement.delete({
      where: { id },
    }) as Promise<Settlement>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
