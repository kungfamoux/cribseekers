import { WalletStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class WalletSummaryDto {
  id: string;
  userId: string;
  balance: Decimal;
  availableBalance: Decimal;
  currency: string;
  status: WalletStatus;
}
