import { apiClient } from '../client';
import { AuthenticatedUser } from '@cribseekers/types';

export interface RegisterData {
  email: string;
  phoneNumber?: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const authResource = {
  register: (data: RegisterData) => apiClient.post<AuthenticatedUser>('/auth/register', data),
  login: (data: LoginData) => apiClient.post<AuthenticatedUser>('/auth/login', data),
  logout: () => apiClient.post<void>('/auth/logout'),
  refresh: () => apiClient.post<AuthenticatedUser>('/auth/refresh'),
  forgotPassword: (data: ForgotPasswordData) => apiClient.post<void>('/auth/forgot-password', data),
  resetPassword: (data: ResetPasswordData) => apiClient.post<void>('/auth/reset-password', data),
  changePassword: (data: ChangePasswordData) => apiClient.post<void>('/auth/change-password', data),
  verifyEmail: (token: string) => apiClient.post<void>('/auth/verify-email', { token }),
  resendVerification: (email: string) => apiClient.post<void>('/auth/resend-verification', { email }),
};
