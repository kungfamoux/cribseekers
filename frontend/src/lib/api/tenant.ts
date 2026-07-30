import { apiFetch } from "./client";

export type Rental = {
  id: string;
  propertyId: string;
  property: {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    images?: string[];
  };
  landlord: {
    id: string;
    name: string;
    phone?: string;
  };
  rent: number;
  dueDate: number;
  leaseStart: string;
  leaseEnd: string;
  status: "active" | "expired" | "pending";
};

export type Payment = {
  id: string;
  rentalId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
};

export type MaintenanceRequest = {
  id: string;
  rentalId: string;
  property: {
    id: string;
    title: string;
  };
  issue: string;
  description: string;
  priority: "low" | "medium" | "urgent";
  status: "pending" | "in-progress" | "completed";
  submittedDate: string;
};

export const tenantApi = {
  rentals: async () => {
    const payload = await apiFetch<unknown>("/tenant/rentals", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Rental[];
    return Array.isArray(items) ? items : [];
  },

  payments: async () => {
    const payload = await apiFetch<unknown>("/tenant/payments", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as Payment[];
    return Array.isArray(items) ? items : [];
  },

  makePayment: async (paymentId: string) =>
    apiFetch<Payment>(`/tenant/payments/${paymentId}`, { method: "POST", auth: true }),

  maintenanceRequests: async () => {
    const payload = await apiFetch<unknown>("/tenant/maintenance", { auth: true });
    const record = (payload ?? {}) as Record<string, unknown>;
    const items = (record.items ?? record.data ?? []) as MaintenanceRequest[];
    return Array.isArray(items) ? items : [];
  },

  submitMaintenanceRequest: async (rentalId: string, issue: string, description: string, priority: string) =>
    apiFetch<MaintenanceRequest>("/tenant/maintenance", {
      method: "POST",
      auth: true,
      body: { rentalId, issue, description, priority },
    }),
};
