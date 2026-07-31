import type { User } from "@/lib/api/types";

const USER_KEY = "cribseekers.user";

const isBrowser = () => typeof window !== "undefined";

export const tokenStore = {
  // Token methods removed - cookies are now handled by browser
  getAccess(): string | null {
    return null; // Tokens are now in httpOnly cookies
  },
  getRefresh(): string | null {
    return null; // Tokens are now in httpOnly cookies
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
  setTokens(tokens: any) {
    // Tokens are now set as httpOnly cookies by backend
    // This method is kept for compatibility but does nothing
  },
  setUser(user: User) {
    if (!isBrowser()) return;
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear() {
    if (!isBrowser()) return;
    // Only clear user data - cookies are cleared by backend logout
    window.localStorage.removeItem(USER_KEY);
  },
};
