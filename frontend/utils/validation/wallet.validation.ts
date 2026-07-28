import { z } from 'zod';

export const freezeWalletSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  frozenBy: z.string().min(1, 'Frozen by is required'),
});

export const closeWalletSchema = z.object({
  closedBy: z.string().min(1, 'Closed by is required'),
});

export const getWalletTransactionsSchema = z.object({
  type: z.enum(['CREDIT', 'DEBIT']).optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});
