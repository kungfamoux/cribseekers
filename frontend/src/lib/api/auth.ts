import { apiFetch } from "./client";
import type { AuthSession, User } from "./types";

export type RegistrationRole = "BUYER" | "TENANT" | "LANDLORD" | "AGENT" | "DEVELOPER";

export type BaseRegistrationPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: RegistrationRole;
};

export type BuyerRegistrationPayload = BaseRegistrationPayload & {
  role: "BUYER";
  businessName?: string;
};

export type TenantRegistrationPayload = BaseRegistrationPayload & {
  role: "TENANT";
  businessName?: string;
};

export type LandlordRegistrationPayload = BaseRegistrationPayload & {
  role: "LANDLORD";
  businessName?: string;
  taxNumber?: string;
};

export type AgentRegistrationPayload = BaseRegistrationPayload & {
  role: "AGENT";
  agencyName: string;
  licenseNumber?: string;
  officeAddress: string;
  commissionRate?: string;
};

export type DeveloperRegistrationPayload = BaseRegistrationPayload & {
  role: "DEVELOPER";
  companyName: string;
  cacNumber?: string;
  website?: string;
  officeAddress: string;
};

export type RegisterPayload =
  | BuyerRegistrationPayload
  | TenantRegistrationPayload
  | LandlordRegistrationPayload
  | AgentRegistrationPayload
  | DeveloperRegistrationPayload;

// Helper to clean up optional fields (remove empty strings and undefined)
function cleanRegistrationData(data: RegisterPayload): RegisterPayload {
  const cleaned: any = { ...data };
  for (const key in cleaned) {
    if (cleaned[key] === "" || cleaned[key] === undefined) {
      delete cleaned[key];
    }
  }
  return cleaned as RegisterPayload;
}

export const authApi = {
  login: (body: { email: string; password: string; rememberMe?: boolean }) =>
    apiFetch<AuthSession>("/auth/login", { method: "POST", body }),

  register: (body: RegisterPayload) =>
    apiFetch<AuthSession>("/auth/register", { method: "POST", body: cleanRegistrationData(body) }),

  logout: () => apiFetch<{ message?: string }>("/auth/logout", { method: "POST", auth: true }),

  refresh: (body: { refreshToken: string }) =>
    apiFetch<{ accessToken: string }>("/auth/refresh", { method: "POST", body }),

  me: () => apiFetch<User>("/auth/me", { auth: true }),

  forgotPassword: (body: { email: string }) =>
    apiFetch<{ message?: string; resetToken?: string }>("/auth/forgot-password", { method: "POST", body }),

  resetPassword: (body: { token: string; password: string; confirmPassword?: string }) =>
    apiFetch<{ message?: string }>("/auth/reset-password", { method: "POST", body }),

  verifyEmail: (body: { email: string; code: string }) =>
    apiFetch<{ verified?: boolean }>("/auth/verify-email", { method: "POST", body }),

  resendEmailCode: (body: { email: string }) =>
    apiFetch<{ message?: string }>("/auth/resend-email-code", { method: "POST", body }),

  verifyPhone: (body: { phone: string; code: string }) =>
    apiFetch<{ verified?: boolean }>("/auth/verify-phone", { method: "POST", body }),

  resendPhoneCode: (body: { phone: string }) =>
    apiFetch<{ message?: string }>("/auth/resend-phone-code", { method: "POST", body }),
};
