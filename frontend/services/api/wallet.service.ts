import apiClient from './axios';
import { ApiResponse } from '../../types/api.types';
import {
  Wallet,
  WalletSummary,
  WalletTransactionsResponse,
  FreezeWalletRequest,
  CloseWalletRequest,
  GetWalletTransactionsParams,
} from '../../types/wallet.types';

export const walletService = {
  // Create wallet for user
  createWallet: async (userId: string): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.post(`/wallets/users/${userId}`);
    return response.data;
  },

  // Get wallet by ID
  getWalletById: async (id: string): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.get(`/wallets/${id}`);
    return response.data;
  },

  // Get wallet by user ID
  getWalletByUserId: async (userId: string): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.get(`/wallets/user/${userId}`);
    return response.data;
  },

  // Get wallet transactions
  getWalletTransactions: async (
    walletId: string,
    params?: GetWalletTransactionsParams,
  ): Promise<WalletTransactionsResponse> => {
    const response = await apiClient.get(`/wallets/${walletId}/transactions`, {
      params,
    });
    return response.data;
  },

  // Get wallet summary
  getWalletSummary: async (walletId: string): Promise<ApiResponse<WalletSummary>> => {
    const response = await apiClient.get(`/wallets/${walletId}/summary`);
    return response.data;
  },

  // Freeze wallet
  freezeWallet: async (walletId: string, data: FreezeWalletRequest): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.post(`/wallets/${walletId}/freeze`, data);
    return response.data;
  },

  // Unfreeze wallet
  unfreezeWallet: async (walletId: string): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.post(`/wallets/${walletId}/unfreeze`);
    return response.data;
  },

  // Close wallet
  closeWallet: async (walletId: string, data: CloseWalletRequest): Promise<ApiResponse<Wallet>> => {
    const response = await apiClient.post(`/wallets/${walletId}/close`, data);
    return response.data;
  },
};
