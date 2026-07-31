import { apiFetch } from "./client";

export type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: "available" | "sold" | "pending";
  images?: string[];
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  createdAt: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  totalDeals: number;
  totalSpent: number;
  createdAt: string;
};

export type Appointment = {
  id: string;
  clientId: string;
  client: {
    id: string;
    name: string;
  };
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  scheduledDate: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  notes?: string;
  createdAt: string;
};

export type Deal = {
  id: string;
  clientId: string;
  client: {
    id: string;
    name: string;
  };
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  amount: number;
  commission: number;
  status: "pending" | "active" | "completed" | "cancelled";
  stage: "offer" | "negotiation" | "inspection" | "closing" | "completed";
  createdAt: string;
};

export type Commission = {
  id: string;
  dealId: string;
  deal: {
    id: string;
    property: {
      title: string;
    };
  };
  amount: number;
  status: "pending" | "available" | "paid";
  dueDate: string;
  paidDate?: string;
  createdAt: string;
};

export type Wallet = {
  balance: number;
  availableForWithdrawal: number;
  pendingCommissions: number;
  totalEarned: number;
};

export const agentApi = {
  dashboard: async () => {
    const payload = await apiFetch<unknown>("/agent/dashboard", { auth: true });
    return payload;
  },

  listings: async () => {
    const payload = await apiFetch<unknown>("/agent/listings", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Property[];
    return Array.isArray(items) ? items : [];
  },

  leads: async () => {
    const payload = await apiFetch<unknown>("/agent/leads", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Lead[];
    return Array.isArray(items) ? items : [];
  },

  clients: async () => {
    const payload = await apiFetch<unknown>("/agent/clients", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Client[];
    return Array.isArray(items) ? items : [];
  },

  appointments: async () => {
    const payload = await apiFetch<unknown>("/agent/appointments", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Appointment[];
    return Array.isArray(items) ? items : [];
  },

  createAppointment: async (appointmentData: Partial<Appointment>) =>
    apiFetch<Appointment>("/agent/appointments", {
      method: "POST",
      auth: true,
      body: appointmentData,
    }),

  deals: async () => {
    const payload = await apiFetch<unknown>("/agent/deals", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Deal[];
    return Array.isArray(items) ? items : [];
  },

  commissions: async () => {
    const payload = await apiFetch<unknown>("/agent/commissions", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Commission[];
    return Array.isArray(items) ? items : [];
  },

  wallet: async () => {
    const payload = await apiFetch<unknown>("/agent/wallet", { auth: true });
    return (payload ?? {}) as Wallet;
  },

  properties: async () => {
    const payload = await apiFetch<unknown>("/agent/properties", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Property[];
    return Array.isArray(items) ? items : [];
  },

  messages: async () => {
    const payload = await apiFetch<unknown>("/agent/messages", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as any[];
    return Array.isArray(items) ? items : [];
  },

  notifications: async () => {
    const payload = await apiFetch<unknown>("/agent/notifications", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as any[];
    return Array.isArray(items) ? items : [];
  },

  profile: async () => {
    const payload = await apiFetch<unknown>("/agent/profile", { auth: true });
    return payload;
  },

  settings: async () => {
    const payload = await apiFetch<unknown>("/agent/settings", { auth: true });
    return payload;
  },
};