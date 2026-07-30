import type { UserRole } from "@/lib/api/types";

export const ROLE_HOME: Record<UserRole, string> = {
  BUYER: "/buyer/dashboard",
  TENANT: "/tenant/dashboard",
  LANDLORD: "/landlord/dashboard",
  AGENT: "/agent/dashboard",
  DEVELOPER: "/developer/dashboard",
  ADMIN: "/admin/dashboard",
};

export const SIGNUP_ROLES = ["BUYER", "TENANT", "LANDLORD", "AGENT", "DEVELOPER"] as const;

export type SignupRole = (typeof SIGNUP_ROLES)[number];

export const ROLE_COPY: Record<SignupRole, { title: string; tagline: string; description: string }> = {
  BUYER: {
    title: "Buyer",
    tagline: "I want to buy a property",
    description: "Search verified listings, book inspections and pay safely through escrow.",
  },
  TENANT: {
    title: "Tenant",
    tagline: "I want to rent a home",
    description: "Find a home, pay rent on schedule and raise maintenance requests in one place.",
  },
  LANDLORD: {
    title: "Landlord",
    tagline: "I own property to let or sell",
    description: "List properties, manage tenants and collect rent with full visibility.",
  },
  AGENT: {
    title: "Agent",
    tagline: "I sell and let on behalf of clients",
    description: "Work listings, leads and viewings, and track every commission you earn.",
  },
  DEVELOPER: {
    title: "Developer",
    tagline: "I build and sell projects",
    description: "Publish projects, manage unit inventory and monitor sales as construction runs.",
  },
};

export function isSignupRole(value: string): value is SignupRole {
  return (SIGNUP_ROLES as readonly string[]).includes(value);
}

export function roleHome(role?: UserRole | null) {
  if (!role) return "/";
  return ROLE_HOME[role] ?? "/";
}

export function getPrimaryRole(roles: string[]): UserRole | null {
  if (!roles || roles.length === 0) return null;
  // Return the first role that matches our known roles
  const knownRoles: UserRole[] = ["BUYER", "TENANT", "LANDLORD", "AGENT", "DEVELOPER", "ADMIN"];
  for (const role of roles) {
    if (knownRoles.includes(role as UserRole)) {
      console.log("getPrimaryRole: Found role", role, "from roles", roles);
      return role as UserRole;
    }
  }
  console.log("getPrimaryRole: No valid role found in", roles);
  return null;
}
