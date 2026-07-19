import { RefundStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Refund {
  id: string;
  paymentId: string;
  escrowId: string | null;
  amount: Decimal;
  currency: string;
  status: RefundStatus;
  reason: string | null;
  gateway: string;
  gatewayReference: string | null;
  processedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
