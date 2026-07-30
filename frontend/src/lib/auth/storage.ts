import type { AuthTokens, User } from "@/lib/api/types";

const ACCESS_KEY = "cribseekers.accessToken";
const REFRESH_KEY = "cribseekers.refreshToken";
const USER_KEY = "cribseekers.user";

const isBrowser = () => typeof window !== "undefined";

export const tokenStore = {
  getAccess(): string | null {
    if (!isBrowser()) return null;
    return window.localStorage.getItem(ACCESS_KEY);
  },
  getRefresh(): string | null {
    if (!isBrowser()) return null;
    return window.localStorage.getItem(REFRESH_KEY);
  },
  getUser(): User | null {
    if (!isBrowser()) return null;
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      // Handle migration from old user structure to new one
      if (parsed.role && !parsed.roles) {
        // Old structure: single role string
        parsed.roles = [parsed.role];
        delete parsed.role;
        // Update storage with new structure
        if (isBrowser()) {
          window.localStorage.setItem(USER_KEY, JSON.stringify(parsed));
        }
      }
      return parsed as User;
    } catch {
      return null;
    }
  },
  setTokens(tokens: AuthTokens) {
    if (!isBrowser()) return;
    window.localStorage.setItem(ACCESS_KEY, tokens.accessToken);
    if (tokens.refreshToken) window.localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  },
  setUser(user: User) {
    if (!isBrowser()) return;
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(ACCESS_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
    window.localStorage.removeItem(USER_KEY);
  },
};
