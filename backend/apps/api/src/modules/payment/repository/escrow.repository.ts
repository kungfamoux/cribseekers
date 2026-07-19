import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Escrow } from '../entities/escrow.entity';
import {
  IEscrowRepository,
} from '../interfaces/escrow.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class EscrowRepository implements IEscrowRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Escrow | null> {
    const escrow = await this.prisma.escrow.findUnique({
      where: { id },
    });
    return escrow as Escrow | null;
  }

  async findByWalletId(walletId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.escrow.findMany({
        where: { walletId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.escrow.count({ where: { walletId } }),
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

  async findByPayerId(payerId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.escrow.findMany({
        where: { payerId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.escrow.count({ where: { payerId } }),
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

  async findByPayeeId(payeeId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.escrow.findMany({
        where: { payeeId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.escrow.count({ where: { payeeId } }),
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

  async findByPropertyId(propertyId: string): Promise<Escrow[]> {
    const escrows = await this.prisma.escrow.findMany({
      where: { propertyId },
    });
    return escrows as Escrow[];
  }

  async findByInspectionId(inspectionId: string): Promise<Escrow[]> {
    const escrows = await this.prisma.escrow.findMany({
      where: { inspectionId },
    });
    return escrows as Escrow[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Escrow>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.escrow.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.escrow.count({ where: filters }),
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

  async create(data: any): Promise<Escrow> {
    return this.prisma.escrow.create({ data }) as Promise<Escrow>;
  }

  async update(id: string, data: any): Promise<Escrow> {
    return this.prisma.escrow.update({
      where: { id },
      data,
    }) as Promise<Escrow>;
  }

  async delete(id: string): Promise<Escrow> {
    return this.prisma.escrow.delete({
      where: { id },
    }) as Promise<Escrow>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
