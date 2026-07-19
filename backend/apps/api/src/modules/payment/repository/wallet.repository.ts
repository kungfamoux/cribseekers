import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Wallet } from '../entities/wallet.entity';
import {
  IWalletRepository,
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Wallet | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
    });
    return wallet as Wallet | null;
  }

  async findByUserId(userId: string): Promise<Wallet | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });
    return wallet as Wallet | null;
  }

  async findAll(options?: PaginationOptions & SortOptions): Promise<PaginationResult<Wallet>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.wallet.findMany({
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.wallet.count(),
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

  async create(data: any): Promise<Wallet> {
    return this.prisma.wallet.create({ data }) as Promise<Wallet>;
  }

  async update(id: string, data: any): Promise<Wallet> {
    return this.prisma.wallet.update({
      where: { id },
      data,
    }) as Promise<Wallet>;
  }

  async delete(id: string): Promise<Wallet> {
    return this.prisma.wallet.delete({
      where: { id },
    }) as Promise<Wallet>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
