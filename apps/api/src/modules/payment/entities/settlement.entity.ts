import { SettlementStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Settlement {
  id: string;
  escrowId: string;
  amount: Decimal;
  currency: string;
  status: SettlementStatus;
  settledAt: Date | null;
  gateway: string | null;
  gatewayReference: string | null;
  createdAt: Date;
  updatedAt: Date;
}
