import { WalletStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class Wallet {
  id: string;
  userId: string;
  balance: Decimal;
  availableBalance: Decimal;
  currency: string;
  status: WalletStatus;
  frozenAt: Date | null;
  frozenBy: string | null;
  frozenReason: string | null;
  closedAt: Date | null;
  closedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
