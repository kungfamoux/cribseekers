import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTransactionClient } from './types/prisma-transaction.type';

export type TransactionIsolationLevel =
  | 'ReadUncommitted'
  | 'ReadCommitted'
  | 'RepeatableRead'
  | 'Serializable';

export interface TransactionOptions {
  readonly isolationLevel?: TransactionIsolationLevel;
  readonly maxWait?: number;
  readonly timeout?: number;
}

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  run<T>(
    callback: (transaction: PrismaTransactionClient) => Promise<T>,
    options?: TransactionOptions,
  ): Promise<T> {
    return this.prisma.$transaction(callback, {
      isolationLevel: options?.isolationLevel,
      maxWait: options?.maxWait,
      timeout: options?.timeout,
    });
  }

  runSerializable<T>(
    callback: (transaction: PrismaTransactionClient) => Promise<T>,
    options?: Omit<TransactionOptions, 'isolationLevel'>,
  ): Promise<T> {
    return this.run(callback, {
      ...options,
      isolationLevel: 'Serializable',
    });
  }
}
