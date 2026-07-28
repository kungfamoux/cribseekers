import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '../services/api/wallet.service';
import { FreezeWalletRequest, CloseWalletRequest, GetWalletTransactionsParams } from '../types/wallet.types';

export const useWallet = (walletId: string) => {
  return useQuery({
    queryKey: ['wallet', walletId],
    queryFn: () => walletService.getWalletById(walletId),
    enabled: !!walletId,
  });
};

export const useWalletByUser = (userId: string) => {
  return useQuery({
    queryKey: ['wallet', 'user', userId],
    queryFn: () => walletService.getWalletByUserId(userId),
    enabled: !!userId,
  });
};

export const useWalletTransactions = (walletId: string, params?: GetWalletTransactionsParams) => {
  return useQuery({
    queryKey: ['wallet', 'transactions', walletId, params],
    queryFn: () => walletService.getWalletTransactions(walletId, params),
    enabled: !!walletId,
  });
};

export const useWalletSummary = (walletId: string) => {
  return useQuery({
    queryKey: ['wallet', 'summary', walletId],
    queryFn: () => walletService.getWalletSummary(walletId),
    enabled: !!walletId,
  });
};

export const useCreateWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => walletService.createWallet(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ['wallet', 'user', userId] });
    },
  });
};

export const useFreezeWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ walletId, data }: { walletId: string; data: FreezeWalletRequest }) =>
      walletService.freezeWallet(walletId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wallet', variables.walletId] });
    },
  });
};

export const useUnfreezeWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (walletId: string) => walletService.unfreezeWallet(walletId),
    onSuccess: (_data, walletId) => {
      queryClient.invalidateQueries({ queryKey: ['wallet', walletId] });
    },
  });
};

export const useCloseWallet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ walletId, data }: { walletId: string; data: CloseWalletRequest }) =>
      walletService.closeWallet(walletId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['wallet', variables.walletId] });
    },
  });
};
