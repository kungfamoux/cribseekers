import { apiFetch } from "./client";

export type Project = {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  state: string;
  type: string;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  status: "planning" | "construction" | "completed" | "launched";
  images?: string[];
  launchDate?: string;
  createdAt: string;
};

export type Unit = {
  id: string;
  projectId: string;
  project: {
    id: string;
    name: string;
  };
  unitNumber: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  price: number;
  status: "available" | "reserved" | "sold";
  floor: number;
  createdAt: string;
};

export type Reservation = {
  id: string;
  unitId: string;
  unit: {
    id: string;
    unitNumber: string;
    project: {
      name: string;
    };
  };
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  depositAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "converted";
  reservedDate: string;
  expiryDate: string;
  createdAt: string;
};

export type Sale = {
  id: string;
  unitId: string;
  unit: {
    id: string;
    unitNumber: string;
    project: {
      name: string;
    };
  };
  buyerName: string;
  saleAmount: number;
  saleDate: string;
  status: "completed" | "pending";
  createdAt: string;
};

export type ConstructionProgress = {
  id: string;
  projectId: string;
  project: {
    id: string;
    name: string;
  };
  phase: string;
  percentage: number;
  description: string;
  estimatedCompletion: string;
  images?: string[];
  updatedAt: string;
};

export type Wallet = {
  balance: number;
  availableForWithdrawal: number;
  pendingSales: number;
  totalRevenue: number;
};

export const developerApi = {
  dashboard: async () => {
    const payload = await apiFetch<unknown>("/developer/dashboard", { auth: true });
    return payload;
  },

  projects: async () => {
    const payload = await apiFetch<unknown>("/developer/projects", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Project[];
    return Array.isArray(items) ? items : [];
  },

  createProject: async (projectData: Partial<Project>) =>
    apiFetch<Project>("/developer/projects", {
      method: "POST",
      auth: true,
      body: projectData,
    }),

  units: async () => {
    const payload = await apiFetch<unknown>("/developer/units", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Unit[];
    return Array.isArray(items) ? items : [];
  },

  sales: async () => {
    const payload = await apiFetch<unknown>("/developer/sales", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Sale[];
    return Array.isArray(items) ? items : [];
  },

  reservations: async () => {
    const payload = await apiFetch<unknown>("/developer/reservations", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Reservation[];
    return Array.isArray(items) ? items : [];
  },

  constructionProgress: async () => {
    const payload = await apiFetch<unknown>("/developer/construction", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as ConstructionProgress[];
    return Array.isArray(items) ? items : [];
  },

  wallet: async () => {
    const payload = await apiFetch<unknown>("/developer/wallet", { auth: true });
    return (payload ?? {}) as Wallet;
  },

  properties: async () => {
    const payload = await apiFetch<unknown>("/developer/properties", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Project[];
    return Array.isArray(items) ? items : [];
  },

  messages: async () => {
    const payload = await apiFetch<unknown>("/developer/messages", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as any[];
    return Array.isArray(items) ? items : [];
  },

  notifications: async () => {
    const payload = await apiFetch<unknown>("/developer/notifications", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as any[];
    return Array.isArray(items) ? items : [];
  },

  profile: async () => {
    const payload = await apiFetch<unknown>("/developer/profile", { auth: true });
    return payload;
  },

  settings: async () => {
    const payload = await apiFetch<unknown>("/developer/settings", { auth: true });
    return payload;
  },
};