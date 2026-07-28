import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { escrowService } from '../services/api/escrow.service';
import { CreateEscrowRequest, ReleaseEscrowRequest, RefundEscrowRequest, DisputeEscrowRequest, EscrowPaginationParams } from '../types/escrow.types';

export const useEscrow = (escrowId: string) => {
  return useQuery({
    queryKey: ['escrow', escrowId],
    queryFn: () => escrowService.getEscrowById(escrowId),
    enabled: !!escrowId,
  });
};

export const useEscrowsByPayer = (payerId: string, params?: EscrowPaginationParams) => {
  return useQuery({
    queryKey: ['escrows', 'payer', payerId, params],
    queryFn: () => escrowService.getEscrowsByPayerId(payerId, params),
    enabled: !!payerId,
  });
};

export const useEscrowsByPayee = (payeeId: string, params?: EscrowPaginationParams) => {
  return useQuery({
    queryKey: ['escrows', 'payee', payeeId, params],
    queryFn: () => escrowService.getEscrowsByPayeeId(payeeId, params),
    enabled: !!payeeId,
  });
};

export const useCreateEscrow = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEscrowRequest) => escrowService.createEscrow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['escrows'] });
    },
  });
};

export const useReleaseEscrow = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReleaseEscrowRequest }) =>
      escrowService.releaseEscrow(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['escrow', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['escrows'] });
    },
  });
};

export const useRefundEscrow = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: RefundEscrowRequest }) =>
      escrowService.refundEscrow(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['escrow', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['escrows'] });
    },
  });
};

export const useDisputeEscrow = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DisputeEscrowRequest }) =>
      escrowService.disputeEscrow(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['escrow', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['escrows'] });
    },
  });
};
