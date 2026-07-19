import { z } from 'zod';
import { emailSchema, phoneSchema, passwordSchema, nameSchema } from './common';
import { paginationParamsSchema } from './pagination';

export const registerSchema = z.object({
  email: emailSchema,
  phoneNumber: phoneSchema.optional(),
  password: passwordSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  role: z.enum(['TENANT', 'LANDLORD', 'AGENT']).optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().uuid(),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});

export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phoneNumber: phoneSchema.optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

export const searchSchema = paginationParamsSchema.extend({
  query: z.string().min(1).max(200).optional(),
  filters: z.record(z.unknown()).optional(),
});

export const idSchema = z.object({
  id: z.string().uuid(),
});

export const idsSchema = z.object({
  ids: z.array(z.string().uuid()),
});
