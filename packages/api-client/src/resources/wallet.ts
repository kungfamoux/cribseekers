import { apiClient } from '../client';
import { PaginatedResponse } from '@cribseekers/types';

export interface FundWalletData {
  amount: number;
  paymentMethod: string;
}

export interface WithdrawData {
  amount: number;
  accountNumber: string;
  bankCode: string;
}

export interface TransferData {
  amount: number;
  recipientId: string;
}

export const walletResource = {
  balance: () => apiClient.get<any>('/wallet/balance'),
  transactions: (params?: any) => apiClient.get<PaginatedResponse<any>>('/wallet/transactions', { params }),
  fund: (data: FundWalletData) => apiClient.post<any>('/wallet/fund', data),
  withdraw: (data: WithdrawData) => apiClient.post<any>('/wallet/withdraw', data),
  transfer: (data: TransferData) => apiClient.post<any>('/wallet/transfer', data),
};
