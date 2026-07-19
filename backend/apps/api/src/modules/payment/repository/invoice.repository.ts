import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Invoice } from '../entities/invoice.entity';
import {
  IInvoiceRepository,
} from '../interfaces/invoice.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class InvoiceRepository implements IInvoiceRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });
    return invoice as Invoice | null;
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { invoiceNumber },
    });
    return invoice as Invoice | null;
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Invoice>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where: { userId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.invoice.count({ where: { userId } }),
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

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Invoice>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.invoice.count({ where: filters }),
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

  async create(data: any): Promise<Invoice> {
    return this.prisma.invoice.create({ data }) as Promise<Invoice>;
  }

  async update(id: string, data: any): Promise<Invoice> {
    return this.prisma.invoice.update({
      where: { id },
      data,
    }) as Promise<Invoice>;
  }

  async delete(id: string): Promise<Invoice> {
    return this.prisma.invoice.delete({
      where: { id },
    }) as Promise<Invoice>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
