import { apiFetch } from "./client";
import type { Paginated, Property } from "./types";

export type PropertySearchParams = {
  q?: string;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  purpose?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

function normalizeList(payload: unknown): Paginated<Property> {
  if (Array.isArray(payload)) {
    return { items: payload as Property[], total: payload.length, page: 1, limit: payload.length, totalPages: 1 };
  }
  const record = (payload ?? {}) as Record<string, unknown>;
  const items = (record.items ?? record.data ?? record.results ?? record.properties ?? []) as Property[];
  const meta = (record.meta ?? record.pagination ?? record) as Record<string, unknown>;
  const limit = Number(meta.limit ?? 12) || 12;
  const total = Number(meta.total ?? items.length) || items.length;
  return {
    items: Array.isArray(items) ? items : [],
    total,
    page: Number(meta.page ?? 1) || 1,
    limit,
    totalPages: Number(meta.totalPages ?? Math.max(1, Math.ceil(total / limit))),
  };
}

export const propertiesApi = {
  search: async (params: PropertySearchParams) =>
    normalizeList(await apiFetch<unknown>("/properties", { query: params })),

  featured: async () => {
    const payload = await apiFetch<unknown>("/properties/featured");
    return normalizeList(payload).items;
  },

  detail: (id: string) => apiFetch<Property>(`/properties/${id}`),

  suggestions: (q: string) =>
    apiFetch<{ label: string; value: string }[]>("/search/suggestions", { query: { q } }),
};
