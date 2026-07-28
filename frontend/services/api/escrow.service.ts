import apiClient from './axios';
import { ApiResponse, PaginatedResponse } from '../../types/api.types';
import {
  Escrow,
  CreateEscrowRequest,
  ReleaseEscrowRequest,
  RefundEscrowRequest,
  DisputeEscrowRequest,
  EscrowPaginationParams,
} from '../../types/escrow.types';

export const escrowService = {
  // Create escrow
  createEscrow: async (data: CreateEscrowRequest): Promise<ApiResponse<Escrow>> => {
    const response = await apiClient.post('/escrows', data);
    return response.data;
  },

  // Get escrow by ID
  getEscrowById: async (id: string): Promise<ApiResponse<Escrow>> => {
    const response = await apiClient.get(`/escrows/${id}`);
    return response.data;
  },

  // Get escrows by payer ID
  getEscrowsByPayerId: async (
    payerId: string,
    params?: EscrowPaginationParams,
  ): Promise<PaginatedResponse<Escrow>> => {
    const response = await apiClient.get(`/escrows/payer/${payerId}`, {
      params,
    });
    return response.data;
  },

  // Get escrows by payee ID
  getEscrowsByPayeeId: async (
    payeeId: string,
    params?: EscrowPaginationParams,
  ): Promise<PaginatedResponse<Escrow>> => {
    const response = await apiClient.get(`/escrows/payee/${payeeId}`, {
      params,
    });
    return response.data;
  },

  // Release escrow
  releaseEscrow: async (
    id: string,
    data: ReleaseEscrowRequest,
  ): Promise<ApiResponse<Escrow>> => {
    const response = await apiClient.post(`/escrows/${id}/release`, data);
    return response.data;
  },

  // Refund escrow
  refundEscrow: async (
    id: string,
    data?: RefundEscrowRequest,
  ): Promise<ApiResponse<Escrow>> => {
    const response = await apiClient.post(`/escrows/${id}/refund`, data);
    return response.data;
  },

  // Dispute escrow
  disputeEscrow: async (
    id: string,
    data: DisputeEscrowRequest,
  ): Promise<ApiResponse<Escrow>> => {
    const response = await apiClient.post(`/escrows/${id}/dispute`, data);
    return response.data;
  },
};
