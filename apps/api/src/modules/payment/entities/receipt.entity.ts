import { Decimal } from '@prisma/client/runtime/library';

export class Receipt {
  id: string;
  invoiceId: string | null;
  paymentId: string | null;
  userId: string;
  amount: Decimal;
  currency: string;
  receiptNumber: string;
  issuedAt: Date;
  metadata: any;
}
