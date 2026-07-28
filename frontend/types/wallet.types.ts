export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  availableBalance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  isFrozen: boolean;
  frozenAt?: Date;
  frozenBy?: string;
  freezeReason?: string;
  closedAt?: Date;
  closedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  reference: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
}

export interface WalletSummary {
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  escrowBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
}

export interface WalletTransactionsResponse {
  data: WalletTransaction[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateWalletRequest {
  userId: string;
}

export interface FreezeWalletRequest {
  reason: string;
  frozenBy: string;
}

export interface CloseWalletRequest {
  closedBy: string;
}

export interface GetWalletTransactionsParams {
  type?: 'CREDIT' | 'DEBIT';
  status?: 'PENDING' | 'COMPLETED' | 'FAILED';
  page?: number;
  limit?: number;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: 'savings' | 'current';
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
}

export interface CreateBankAccountRequest {
  bankName: string;
  accountNumber: string;
  accountName: string;
  accountType: 'savings' | 'current';
}

export interface UpdateBankAccountRequest {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  accountType?: 'savings' | 'current';
}
