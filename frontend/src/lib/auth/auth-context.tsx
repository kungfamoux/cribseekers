import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi } from "@/lib/api/auth";
import { configureApi } from "@/lib/api/client";
import type { User, UserRole } from "@/lib/api/types";
import { tokenStore } from "./storage";
import { getPrimaryRole } from "./roles";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  role: UserRole | null;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const clearSession = useCallback(() => {
    tokenStore.clear();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    configureApi({
      getAccessToken: () => null, // Tokens are now in cookies
      getRefreshToken: () => null, // Tokens are now in cookies
      onRefreshed: (tokens: any) => {
        // Backend handles cookie updates automatically
      },
      onSessionExpired: () => clearSession(),
    });
  }, [clearSession]);

  useEffect(() => {
    let cancelled = false;
    
    // Check for cached user data in localStorage
    const cached = tokenStore.getUser();
    if (cached) {
      setUser(cached);
      setStatus("authenticated");
    }

    // Fetch fresh user data to verify authentication
    authApi
      .me()
      .then((fresh) => {
        if (cancelled) return;
        setUser(fresh);
        tokenStore.setUser(fresh);
        setStatus("authenticated");
      })
      .catch(() => {
        if (cancelled) return;
        clearSession();
      });

    return () => {
      cancelled = true;
    };
  }, [clearSession]);

  const setUserData = useCallback((userData: User) => {
    setUser(userData);
    tokenStore.setUser(userData);
    setStatus(userData ? "authenticated" : "unauthenticated");
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const fresh = await authApi.me();
      setUser(fresh);
      tokenStore.setUser(fresh);
      setStatus("authenticated");
    } catch {
      clearSession();
    }
  }, [clearSession]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Signing out locally is what matters
    }
    clearSession();
  }, [clearSession]);

  const role = useMemo(() => {
    if (!user || !user.roles) return null;
    return getPrimaryRole(user.roles);
  }, [user]);

  const value = useMemo(
    () => ({ user, status, role, setUser: setUserData, refreshUser, logout }),
    [user, status, role, setUserData, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
