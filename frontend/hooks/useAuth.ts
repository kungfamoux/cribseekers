import { useAuth as useAuthContext } from '@/components/providers';
import { useAuthStore } from '@/store';

export function useAuth() {
  const context = useAuthContext();
  const store = useAuthStore();

  // Use store as primary source of truth
  return {
    user: store.user,
    accessToken: store.accessToken,
    refreshToken: store.refreshToken,
    isAuthenticated: store.isAuthenticated,
    isLoading: context.isLoading,
    login: context.login,
    logout: context.logout,
    refreshTokens: context.refreshTokens,
  };
}
