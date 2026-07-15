import { EscrowStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Escrow {
  id: string;
  walletId: string;
  amount: Decimal;
  currency: string;
  status: EscrowStatus;
  propertyId: string | null;
  inspectionId: string | null;
  paymentId: string | null;
  payerId: string;
  payeeId: string;
  releaseCondition: string | null;
  releaseAt: Date | null;
  refundAt: Date | null;
  disputedAt: Date | null;
  disputeReason: string | null;
  resolvedAt: Date | null;
  resolutionNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
