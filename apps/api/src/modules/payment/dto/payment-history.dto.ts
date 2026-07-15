import { PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class PaymentHistoryDto {
  id: string;
  amount: Decimal;
  currency: string;
  status: PaymentStatus;
  gateway: string;
  description: string | null;
  createdAt: Date;
}
