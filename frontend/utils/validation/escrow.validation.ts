import { z } from 'zod';

export const createEscrowSchema = z.object({
  payerId: z.string().min(1, 'Payer ID is required'),
  payeeId: z.string().min(1, 'Payee ID is required'),
  walletId: z.string().min(1, 'Wallet ID is required'),
  propertyId: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('NGN'),
  description: z.string().min(1, 'Description is required'),
});

export const releaseEscrowSchema = z.object({
  notes: z.string().optional(),
});

export const refundEscrowSchema = z.object({
  reason: z.string().optional(),
});

export const disputeEscrowSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  evidence: z.string().optional(),
});

export const escrowPaginationSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  status: z.enum(['PENDING', 'FUNDED', 'HELD', 'RELEASE_PENDING', 'REFUND_PENDING', 'RELEASED', 'REFUNDED', 'DISPUTED', 'CANCELLED']).optional(),
});
