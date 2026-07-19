import { Decimal } from '@prisma/client/runtime/library';

export class Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  amount: Decimal;
  currency: string;
  status: string;
  dueDate: Date | null;
  paidAt: Date | null;
  items: any;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}
