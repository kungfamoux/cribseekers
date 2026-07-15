import { PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class PaymentAttempt {
  id: string;
  paymentId: string;
  gateway: string;
  gatewayReference: string | null;
  amount: Decimal;
  currency: string;
  status: PaymentStatus;
  requestPayload: any;
  responsePayload: any;
  failureReason: string | null;
  attemptedAt: Date;
  completedAt: Date | null;
}
