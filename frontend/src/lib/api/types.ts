export type UserRole = "BUYER" | "TENANT" | "LANDLORD" | "AGENT" | "DEVELOPER" | "ADMIN";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  roles: string[];
  phone?: string;
  avatarUrl?: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
};

export type AuthSession = AuthTokens & {
  user: User;
  requiresEmailVerification?: boolean;
  requiresPhoneVerification?: boolean;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Property = {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency?: string;
  purpose?: string;
  type?: string;
  category?: string;
  status?: string;
  verification?: "verified" | "pending" | "unverified";
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  address?: string;
  city?: string;
  state?: string;
  images?: string[];
  createdAt?: string;
  agent?: { id: string; name: string; avatarUrl?: string | null; phone?: string };
};
