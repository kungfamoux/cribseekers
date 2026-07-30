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
  status: "available" | "rented" | "maintenance";
  images?: string[];
  createdAt: string;
};

export type Tenant = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  status: "active" | "expired";
};

export type MaintenanceRequest = {
  id: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  tenant: {
    id: string;
    name: string;
  };
  issue: string;
  description: string;
  priority: "low" | "medium" | "urgent";
  status: "pending" | "in-progress" | "completed";
  submittedDate: string;
};

export type Payment = {
  id: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
  };
  tenantId: string;
  tenant: {
    id: string;
    name: string;
  };
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
};

export const landlordApi = {
  properties: async () => {
    const payload = await apiFetch<unknown>("/landlord/properties", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Property[];
    return Array.isArray(items) ? items : [];
  },

  tenants: async () => {
    const payload = await apiFetch<unknown>("/landlord/tenants", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Tenant[];
    return Array.isArray(items) ? items : [];
  },

  maintenanceRequests: async () => {
    const payload = await apiFetch<unknown>("/landlord/maintenance", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as MaintenanceRequest[];
    return Array.isArray(items) ? items : [];
  },

  payments: async () => {
    const payload = await apiFetch<unknown>("/landlord/payments", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Payment[];
    return Array.isArray(items) ? items : [];
  },

  createProperty: async (propertyData: Partial<Property>) =>
    apiFetch<Property>("/landlord/properties", {
      method: "POST",
      auth: true,
      body: propertyData,
    }),
};
