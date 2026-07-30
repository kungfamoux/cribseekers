export const ngn = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatPrice(amount?: number | null) {
  if (amount === undefined || amount === null || Number.isNaN(amount)) return "Price on request";
  return ngn.format(amount);
}

export function formatCompact(amount?: number | null) {
  if (amount === undefined || amount === null) return "—";
  return new Intl.NumberFormat("en-NG", { notation: "compact", maximumFractionDigits: 1 }).format(amount);
}

export function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function normalizePhone(value: string) {
  const trimmed = value.replace(/[\s-()]/g, "");
  if (trimmed.startsWith("0") && trimmed.length === 11) return `+234${trimmed.slice(1)}`;
  if (trimmed.startsWith("234")) return `+${trimmed}`;
  return trimmed;
}
