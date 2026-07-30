import { z } from "zod";

const phoneRegex = /^[+]?[0-9]{10,15}$/;

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(255, "Email is too long");

export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters")
  .max(255, "Password is too long");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});
export type LoginValues = z.infer<typeof loginSchema>;

// Base registration schema
const baseRegistrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  phoneNumber: z.string().trim().regex(phoneRegex, "Enter a valid phone number").max(20).optional(),
  role: z.enum(["BUYER", "TENANT", "LANDLORD", "AGENT", "DEVELOPER"]),
});

// Role-specific schemas
export const buyerRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal("BUYER"),
  businessName: z.string().trim().max(200).optional(),
});

export const tenantRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal("TENANT"),
  businessName: z.string().trim().max(200).optional(),
});

export const landlordRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal("LANDLORD"),
  businessName: z.string().trim().max(200).optional(),
  taxNumber: z.string().trim().max(50).optional(),
});

export const agentRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal("AGENT"),
  agencyName: z.string().trim().min(1, "Agency name is required").max(200),
  licenseNumber: z.string().trim().max(50).optional(),
  officeAddress: z.string().trim().min(1, "Office address is required").max(500),
  commissionRate: z.string().trim().max(10).optional(),
});

export const developerRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal("DEVELOPER"),
  companyName: z.string().trim().min(1, "Company name is required").max(200),
  cacNumber: z.string().trim().max(50).optional(),
  website: z.string().trim().url("Enter a valid website").max(255).optional(),
  officeAddress: z.string().trim().min(1, "Office address is required").max(500),
});

// Combined registration schema
export const registrationSchema = z.discriminatedUnion("role", [
  buyerRegistrationSchema,
  tenantRegistrationSchema,
  landlordRegistrationSchema,
  agentRegistrationSchema,
  developerRegistrationSchema,
]);

export type BuyerRegistrationValues = z.infer<typeof buyerRegistrationSchema>;
export type TenantRegistrationValues = z.infer<typeof tenantRegistrationSchema>;
export type LandlordRegistrationValues = z.infer<typeof landlordRegistrationSchema>;
export type AgentRegistrationValues = z.infer<typeof agentRegistrationSchema>;
export type DeveloperRegistrationValues = z.infer<typeof developerRegistrationSchema>;
export type RegistrationValues = z.infer<typeof registrationSchema>;

export const forgotPasswordSchema = z.object({ email: emailSchema });
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const otpSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
});
export type OtpValues = z.infer<typeof otpSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: emailSchema,
  subject: z.string().trim().min(3, "Add a subject").max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});
export type ContactValues = z.infer<typeof contactSchema>;

export function passwordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}
