import { RefundStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Withdrawal {
  id: string;
  walletId: string;
  bankAccountId: string;
  amount: Decimal;
  currency: string;
  status: RefundStatus;
  reason: string | null;
  processedAt: Date | null;
  rejectedAt: Date | null;
  rejectionReason: string | null;
  approvedBy: string | null;
  approvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
