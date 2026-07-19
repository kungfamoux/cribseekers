import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Receipt } from '../entities/receipt.entity';
import {
  IReceiptRepository,
} from '../interfaces/receipt.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class ReceiptRepository implements IReceiptRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Receipt | null> {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
    });
    return receipt as Receipt | null;
  }

  async findByReceiptNumber(receiptNumber: string): Promise<Receipt | null> {
    const receipt = await this.prisma.receipt.findUnique({
      where: { receiptNumber },
    });
    return receipt as Receipt | null;
  }

  async findByPaymentId(paymentId: string): Promise<Receipt | null> {
    const receipt = await this.prisma.receipt.findFirst({
      where: { paymentId },
    });
    return receipt as Receipt | null;
  }

  async findByInvoiceId(invoiceId: string): Promise<Receipt[]> {
    const receipts = await this.prisma.receipt.findMany({
      where: { invoiceId },
    });
    return receipts as Receipt[];
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Receipt>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.receipt.findMany({
        where: { userId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.receipt.count({ where: { userId } }),
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Receipt>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.receipt.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.receipt.count({ where: filters }),
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

  async create(data: any): Promise<Receipt> {
    return this.prisma.receipt.create({ data }) as Promise<Receipt>;
  }

  async delete(id: string): Promise<Receipt> {
    return this.prisma.receipt.delete({
      where: { id },
    }) as Promise<Receipt>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
