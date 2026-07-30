import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi } from "@/lib/api/auth";
import { configureApi } from "@/lib/api/client";
import type { AuthSession, AuthTokens, User, UserRole } from "@/lib/api/types";
import { tokenStore } from "./storage";
import { getPrimaryRole } from "./roles";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  role: UserRole | null;
  setSession: (session: AuthSession) => void;
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
      getAccessToken: () => tokenStore.getAccess(),
      getRefreshToken: () => tokenStore.getRefresh(),
      onRefreshed: (tokens: AuthTokens) => tokenStore.setTokens(tokens),
      onSessionExpired: () => clearSession(),
    });
  }, [clearSession]);

  useEffect(() => {
    let cancelled = false;
    const token = tokenStore.getAccess();
    if (!token) {
      setStatus("unauthenticated");
      return;
    }
    const cached = tokenStore.getUser();
    if (cached) setUser(cached);

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
        tokenStore.clear();
        setUser(null);
        setStatus("unauthenticated");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setSession = useCallback((session: AuthSession) => {
    if (session.accessToken) {
      tokenStore.setTokens({ accessToken: session.accessToken, refreshToken: session.refreshToken });
    }
    if (session.user) {
      tokenStore.setUser(session.user);
      setUser(session.user);
      setStatus(session.accessToken ? "authenticated" : "unauthenticated");
    }
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
      // signing out locally is what matters
    }
    clearSession();
  }, [clearSession]);

  const role = useMemo(() => {
    if (!user || !user.roles) return null;
    return getPrimaryRole(user.roles);
  }, [user]);

  const value = useMemo(
    () => ({ user, status, role, setSession, refreshUser, logout }),
    [user, status, role, setSession, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
