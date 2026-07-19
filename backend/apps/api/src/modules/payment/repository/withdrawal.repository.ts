import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Withdrawal } from '../entities/withdrawal.entity';
import {
  IWithdrawalRepository,
} from '../interfaces/withdrawal.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class WithdrawalRepository implements IWithdrawalRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Withdrawal | null> {
    const withdrawal = await this.prisma.withdrawal.findUnique({
      where: { id },
    });
    return withdrawal as Withdrawal | null;
  }

  async findByWalletId(walletId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Withdrawal>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.withdrawal.findMany({
        where: { walletId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.withdrawal.count({ where: { walletId } }),
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

  async findByBankAccountId(bankAccountId: string): Promise<Withdrawal[]> {
    const withdrawals = await this.prisma.withdrawal.findMany({
      where: { bankAccountId },
    });
    return withdrawals as Withdrawal[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Withdrawal>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.withdrawal.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.withdrawal.count({ where: filters }),
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

  async create(data: any): Promise<Withdrawal> {
    return this.prisma.withdrawal.create({ data }) as Promise<Withdrawal>;
  }

  async update(id: string, data: any): Promise<Withdrawal> {
    return this.prisma.withdrawal.update({
      where: { id },
      data,
    }) as Promise<Withdrawal>;
  }

  async delete(id: string): Promise<Withdrawal> {
    return this.prisma.withdrawal.delete({
      where: { id },
    }) as Promise<Withdrawal>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
