import { apiFetch } from "./client";
import type { Paginated } from "./types";

export type SavedProperty = {
  id: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
    price: number;
    city: string;
    state: string;
    images?: string[];
  };
  savedAt: string;
};

export type Inspection = {
  id: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
    address: string;
  };
  scheduledDate: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
};

export type Wallet = {
  balance: number;
  currency: string;
  lastUpdated: string;
};

export type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  createdAt: string;
};

export type EscrowTransaction = {
  id: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  amount: number;
  status: "pending" | "active" | "completed" | "cancelled";
  milestones: {
    title: string;
    completed: boolean;
    completedAt?: string;
  }[];
  createdAt: string;
};

export const buyerApi = {
  savedProperties: async () => {
    const payload = await apiFetch<unknown>("/buyer/saved", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as SavedProperty[];
    return Array.isArray(items) ? items : [];
  },

  saveProperty: async (propertyId: string) =>
    apiFetch<SavedProperty>("/buyer/saved", { method: "POST", auth: true, body: { propertyId } }),

  removeSavedProperty: async (id: string) =>
    apiFetch<{ message: string }>(`/buyer/saved/${id}`, { method: "DELETE", auth: true }),

  inspections: async () => {
    const payload = await apiFetch<unknown>("/buyer/inspections", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Inspection[];
    return Array.isArray(items) ? items : [];
  },

  bookInspection: async (propertyId: string, scheduledDate: string) =>
    apiFetch<Inspection>("/buyer/inspections", { method: "POST", auth: true, body: { propertyId, scheduledDate } }),

  wallet: async () => apiFetch<Wallet>("/buyer/wallet", { auth: true }),

  fundWallet: async (amount: number) =>
    apiFetch<Transaction>("/buyer/wallet/fund", { method: "POST", auth: true, body: { amount } }),

  transactions: async () => {
    const payload = await apiFetch<unknown>("/buyer/wallet/transactions", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Transaction[];
    return Array.isArray(items) ? items : [];
  },

  escrowTransactions: async () => {
    const payload = await apiFetch<unknown>("/buyer/escrow", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as EscrowTransaction[];
    return Array.isArray(items) ? items : [];
  },

  initiateEscrow: async (propertyId: string, amount: number) =>
    apiFetch<EscrowTransaction>("/buyer/escrow", { method: "POST", auth: true, body: { propertyId, amount } }),

  profile: async () => {
    const payload = await apiFetch<unknown>("/buyer/profile", { auth: true });
    return payload;
  },

  messages: async () => {
    const payload = await apiFetch<unknown>("/buyer/messages", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as any[];
    return Array.isArray(items) ? items : [];
  },

  notifications: async () => {
    const payload = await apiFetch<unknown>("/buyer/notifications", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as any[];
    return Array.isArray(items) ? items : [];
  },
};
