'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useAuthStore } from '@/store/auth.store';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isVerified: boolean;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setAuth, clearAuth, setAccessToken } = useAuthStore();

  useEffect(() => {
    // Load auth state from store on mount
    const storedUser = useAuthStore.getState().user;
    const storedAccessToken = useAuthStore.getState().accessToken;

    if (storedUser && storedAccessToken) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
      rememberMe,
    });

    const { accessToken, refreshToken, user: newUser } = response.data.data;

    setUser(newUser);
    setAuth(newUser, accessToken, refreshToken);
  };

  const logout = async () => {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);
    } catch {
      console.error('Logout error');
    } finally {
      clearAuth();
      setUser(null);
      router.push('/login');
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REFRESH);
      const { accessToken } = response.data.data;

      setAccessToken(accessToken);
    } catch {
      console.error('Token refresh error');
      await logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken: useAuthStore.getState().accessToken,
        refreshToken: useAuthStore.getState().refreshToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
