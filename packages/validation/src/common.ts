import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required')
  .max(255, 'Email is too long')
  .transform((val) => val.toLowerCase());

export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(20, 'Phone number is too long')
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

export const uuidSchema = z.string().uuid('Invalid UUID format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const dateSchema = z.coerce.date({
  errorMap: () => ({ message: 'Invalid date format' }),
});

export const futureDateSchema = dateSchema.refine(
  (date) => date > new Date(),
  'Date must be in the future',
);

export const pastDateSchema = dateSchema.refine(
  (date) => date < new Date(),
  'Date must be in the past',
);

export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required').max(255),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  country: z.string().min(1, 'Country is required').max(100),
  postalCode: z.string().min(1, 'Postal code is required').max(20),
  coordinates: coordinatesSchema.optional(),
});

export const moneySchema = z.object({
  amount: z.number().positive('Amount must be positive').max(999999999.99),
  currency: z.string().length(3).toUpperCase(),
});

export const fileUploadSchema = z.object({
  filename: z.string().min(1).max(255),
  mimetype: z.string().min(1).max(100),
  size: z.number().positive().max(10485760), // 10MB
  url: z.string().url(),
});

export const urlSchema = z.string().url('Invalid URL format');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters');
