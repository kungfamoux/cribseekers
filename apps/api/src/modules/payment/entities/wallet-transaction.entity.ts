import { TransactionStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class WalletTransaction {
  id: string;
  walletId: string;
  type: string;
  amount: Decimal;
  balanceBefore: Decimal;
  balanceAfter: Decimal;
  description: string;
  reference: string;
  status: TransactionStatus;
  metadata: any;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
  createdAt: Date;
  updatedAt: Date;
}
