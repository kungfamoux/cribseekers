import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { BankAccount } from '../entities/bank-account.entity';
import {
  IBankAccountRepository,
} from '../interfaces/bank-account.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class BankAccountRepository implements IBankAccountRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<BankAccount | null> {
    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id },
    });
    return bankAccount as BankAccount | null;
  }

  async findByWalletId(walletId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BankAccount>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.bankAccount.findMany({
        where: { walletId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.bankAccount.count({ where: { walletId } }),
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

  async findByAccountNumber(accountNumber: string): Promise<BankAccount | null> {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { accountNumber },
    });
    return bankAccount as BankAccount | null;
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<BankAccount>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.bankAccount.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.bankAccount.count({ where: filters }),
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

  async create(data: any): Promise<BankAccount> {
    return this.prisma.bankAccount.create({ data }) as Promise<BankAccount>;
  }

  async update(id: string, data: any): Promise<BankAccount> {
    return this.prisma.bankAccount.update({
      where: { id },
      data,
    }) as Promise<BankAccount>;
  }

  async delete(id: string): Promise<BankAccount> {
    return this.prisma.bankAccount.delete({
      where: { id },
    }) as Promise<BankAccount>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
