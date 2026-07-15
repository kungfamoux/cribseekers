import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Payment } from '../entities/payment.entity';
import {
  IPaymentRepository,
} from '../interfaces/payment.repository.interface';
import {
  PaginationOptions,
  SortOptions,
  PaginationResult,
} from '../interfaces/wallet.repository.interface';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    return payment as Payment | null;
  }

  async findByUserId(userId: string, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Payment>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: { userId },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.payment.count({ where: { userId } }),
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

  async findByGatewayReference(reference: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findFirst({
      where: { gatewayReference: reference },
    });
    return payment as Payment | null;
  }

  async findByEscrowId(escrowId: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { escrowId },
    });
    return payments as Payment[];
  }

  async findByInspectionId(inspectionId: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { inspectionId },
    });
    return payments as Payment[];
  }

  async findByPropertyId(propertyId: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { propertyId },
    });
    return payments as Payment[];
  }

  async findAll(filters?: any, options?: PaginationOptions & SortOptions): Promise<PaginationResult<Payment>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const sortBy = options?.sortBy || 'createdAt';
    const sortOrder = options?.sortOrder || 'desc';

    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.payment.count({ where: filters }),
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

  async create(data: any): Promise<Payment> {
    return this.prisma.payment.create({ data }) as Promise<Payment>;
  }

  async update(id: string, data: any): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data,
    }) as Promise<Payment>;
  }

  async delete(id: string): Promise<Payment> {
    return this.prisma.payment.delete({
      where: { id },
    }) as Promise<Payment>;
  }

  withTransaction(transaction: any): this {
    this.prisma = transaction;
    return this;
  }
}
