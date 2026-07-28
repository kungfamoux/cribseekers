export interface Escrow {
  id: string;
  payerId: string;
  payeeId: string;
  walletId: string;
  propertyId?: string;
  amount: number;
  currency: string;
  description: string;
  status: 'PENDING' | 'FUNDED' | 'HELD' | 'RELEASE_PENDING' | 'REFUND_PENDING' | 'RELEASED' | 'REFUNDED' | 'DISPUTED' | 'CANCELLED';
  releaseNotes?: string;
  refundReason?: string;
  disputeReason?: string;
  disputeEvidence?: string;
  disputedAt?: Date;
  releasedAt?: Date;
  refundedAt?: Date;
  reference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEscrowRequest {
  payerId: string;
  payeeId: string;
  walletId: string;
  propertyId?: string;
  amount: number;
  currency?: string;
  description: string;
}

export interface ReleaseEscrowRequest {
  notes?: string;
}

export interface RefundEscrowRequest {
  reason?: string;
}

export interface DisputeEscrowRequest {
  reason: string;
  evidence?: string;
}

export interface EscrowPaginationParams {
  page?: number;
  limit?: number;
  status?: Escrow['status'];
}
