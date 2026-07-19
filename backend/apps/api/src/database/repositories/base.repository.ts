import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaClientLike, PrismaTransactionClient } from '../types/prisma-transaction.type';
import { TransactionalRepository } from '../interfaces/repository.interface';

@Injectable()
export abstract class BaseRepository implements TransactionalRepository<PrismaTransactionClient> {
  protected constructor(
    protected readonly prisma: PrismaService,
    private readonly transactionClient?: PrismaTransactionClient,
  ) {}

  protected get client(): PrismaClientLike {
    return this.transactionClient ?? this.prisma;
  }

  abstract withTransaction(transaction: PrismaTransactionClient): this;

  protected isOptimisticConflict(updatedCount: number): boolean {
    return updatedCount === 0;
  }
}

