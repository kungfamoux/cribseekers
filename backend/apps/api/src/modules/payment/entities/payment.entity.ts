import { PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Payment {
  id: string;
  amount: Decimal;
  currency: string;
  status: PaymentStatus;
  gateway: string;
  gatewayReference: string | null;
  gatewayResponse: any;
  metadata: any;
  description: string | null;
  userId: string;
  walletId: string | null;
  escrowId: string | null;
  inspectionId: string | null;
  propertyId: string | null;
  paidAt: Date | null;
  failedAt: Date | null;
  refundedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
