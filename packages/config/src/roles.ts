import { UserRole } from '@cribseekers/types';

export const ROLES = {
  ADMIN: UserRole.ADMIN,
  AGENT: UserRole.AGENT,
  LANDLORD: UserRole.LANDLORD,
  TENANT: UserRole.TENANT,
} as const;

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.AGENT]: 'Agent',
  [UserRole.LANDLORD]: 'Landlord',
  [UserRole.TENANT]: 'Tenant',
};
