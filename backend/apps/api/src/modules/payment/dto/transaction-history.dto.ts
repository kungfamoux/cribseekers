import { TransactionStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionHistoryDto {
  id: string;
  walletId: string;
  type: string;
  amount: Decimal;
  balanceBefore: Decimal;
  balanceAfter: Decimal;
  description: string;
  reference: string;
  status: TransactionStatus;
  createdAt: Date;
}
