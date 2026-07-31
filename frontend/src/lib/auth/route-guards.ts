import { redirect } from "@tanstack/react-router";
import type { UserRole } from "@/lib/api/types";
import { roleHome } from "./roles";
import { tokenStore } from "./storage";
import { authApi } from "@/lib/api/auth";

/**
 * Route guard options
 */
interface RouteGuardOptions {
  /**
   * The required role for this route
   */
  requiredRole: UserRole;
  /**
   * Whether to redirect to the user's correct dashboard if role mismatch
   * @default true
   */
  redirectToCorrectDashboard?: boolean;
}

/**
 * Creates a beforeLoad function that checks authentication and role
 * 
 * @param options - Route guard options
 * @returns A beforeLoad function for TanStack Router
 */
export function createAuthGuard(options: RouteGuardOptions) {
  const { requiredRole, redirectToCorrectDashboard = true } = options;

  return async () => {
    // First check for cached user data in localStorage (performance optimization)
    const cachedUser = tokenStore.getUser();
    
    if (cachedUser) {
      const userRoles = cachedUser.roles || [];
      
      // Check if user has the required role
      if (!userRoles.includes(requiredRole)) {
        if (redirectToCorrectDashboard) {
          // User doesn't have required role, redirect to their correct dashboard
          const primaryRole = getPrimaryRole(userRoles);
          if (primaryRole) {
            throw redirect({
              to: roleHome(primaryRole),
            });
          }
        }
        // If we can't determine their role or redirect is disabled, redirect to login
        throw redirect({
          to: "/auth/login",
        });
      }

      // User is authenticated and has the required role
      return { user: cachedUser };
    }

    // No cached user data, verify authentication via API
    try {
      const user = await authApi.me();
      
      const userRoles = user.roles || [];
      
      // Check if user has the required role
      if (!userRoles.includes(requiredRole)) {
        if (redirectToCorrectDashboard) {
          // User doesn't have required role, redirect to their correct dashboard
          const primaryRole = getPrimaryRole(userRoles);
          if (primaryRole) {
            throw redirect({
              to: roleHome(primaryRole),
            });
          }
        }
        // If we can't determine their role or redirect is disabled, redirect to login
        throw redirect({
          to: "/auth/login",
        });
      }

      // User is authenticated and has the required role
      return { user };
    } catch (error) {
      // User is not authenticated, redirect to login
      throw redirect({
        to: "/auth/login",
        search: { redirect: window.location.pathname },
      });
    }
  };
}

/**
 * Gets the primary role from a roles array
 * This is a simplified version of the function in roles.ts to avoid circular dependencies
 */
function getPrimaryRole(roles: string[]): UserRole | null {
  if (!roles || roles.length === 0) return null;
  const knownRoles: UserRole[] = ["BUYER", "TENANT", "LANDLORD", "AGENT", "DEVELOPER", "ADMIN"];
  for (const role of roles) {
    if (knownRoles.includes(role as UserRole)) {
      return role as UserRole;
    }
  }
  return null;
}

/**
 * Creates a beforeLoad function that only checks authentication (no role check)
 * 
 * @returns A beforeLoad function for TanStack Router
 */
export function createAuthOnlyGuard() {
  return async () => {
    // First check for cached user data (performance optimization)
    const cachedUser = tokenStore.getUser();
    if (cachedUser) {
      return { user: cachedUser };
    }

    // No cached user data, verify authentication via API
    try {
      const user = await authApi.me();
      return { user };
    } catch (error) {
      // User is not authenticated, redirect to login
      throw redirect({
        to: "/auth/login",
        search: { redirect: window.location.pathname },
      });
    }
  };
}