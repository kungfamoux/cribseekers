export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://cribseekers.onrender.com/api/v1";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

type TokenHandlers = {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  onRefreshed: (tokens: { accessToken: string; refreshToken?: string }) => void;
  onSessionExpired: () => void;
};

let handlers: TokenHandlers = {
  getAccessToken: () => null,
  getRefreshToken: () => null,
  onRefreshed: () => {},
  onSessionExpired: () => {},
};

export function configureApi(next: Partial<TokenHandlers>) {
  handlers = { ...handlers, ...next };
}

export type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  auth?: boolean;
  signal?: AbortSignal;
};

function buildUrl(path: string, query?: RequestOptions["query"]) {
  const base = API_BASE_URL.replace(/\/$/, "");
  const url = new URL(`${base}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function unwrap<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

async function parse(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function refreshSession(): Promise<boolean> {
  try {
    // Note: Refresh endpoint now uses cookies automatically
    const response = await fetch(buildUrl("/auth/refresh"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: 'include', // Important: include cookies
    });
    if (!response.ok) return false;
    const tokens = unwrap<{ accessToken: string }>(await parse(response));
    if (!tokens?.accessToken) return false;
    // Note: Backend sets the new access token as a cookie automatically
    handlers.onRefreshed(tokens);
    return true;
  } catch {
    return false;
  }
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, auth = false, signal } = options;

  const send = async () => {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    // Note: Authorization header removed - cookies are sent automatically by browser
    return fetch(buildUrl(path, query), {
      method,
      headers,
      signal,
      credentials: 'include', // Important: include cookies in requests
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  };

  let response: Response;
  try {
    response = await send();
  } catch {
    throw new ApiError(0, "We couldn't reach CribSeekers. Check your connection and try again.");
  }

  if (response.status === 401 && auth) {
    const refreshed = await refreshSession();
    if (refreshed) {
      response = await send();
    } else {
      handlers.onSessionExpired();
      throw new ApiError(401, "Your session has expired. Please log in again.");
    }
  }

  const payload = await parse(response);

  if (!response.ok) {
    const record = (payload ?? {}) as Record<string, unknown>;
    const message =
      (typeof record.message === "string" && record.message) ||
      (typeof record.error === "string" && record.error) ||
      defaultMessage(response.status);
    throw new ApiError(response.status, message, record.errors as Record<string, string[]>);
  }

  return unwrap<T>(payload);
}

function defaultMessage(status: number) {
  if (status === 403) return "You don't have access to this.";
  if (status === 404) return "We couldn't find what you're looking for.";
  if (status === 429) return "Too many attempts. Please wait a moment and try again.";
  if (status >= 500) return "Something went wrong on our end. Please try again.";
  return "Request failed. Please try again.";
}
