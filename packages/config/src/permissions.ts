import { Permission } from '@cribseekers/types';

export const PERMISSIONS = {
  // Property permissions
  CREATE_PROPERTY: Permission.CREATE_PROPERTY,
  READ_PROPERTY: Permission.READ_PROPERTY,
  UPDATE_PROPERTY: Permission.UPDATE_PROPERTY,
  DELETE_PROPERTY: Permission.DELETE_PROPERTY,
  MANAGE_PROPERTY_STATUS: Permission.MANAGE_PROPERTY_STATUS,

  // Inspection permissions
  CREATE_INSPECTION: Permission.CREATE_INSPECTION,
  READ_INSPECTION: Permission.READ_INSPECTION,
  UPDATE_INSPECTION: Permission.UPDATE_INSPECTION,
  DELETE_INSPECTION: Permission.DELETE_INSPECTION,
  APPROVE_INSPECTION: Permission.APPROVE_INSPECTION,

  // User permissions
  MANAGE_USERS: Permission.MANAGE_USERS,
  MANAGE_AGENTS: Permission.MANAGE_AGENTS,
  VERIFY_AGENT: Permission.VERIFY_AGENT,

  // Payment permissions
  PROCESS_PAYMENT: Permission.PROCESS_PAYMENT,
  REFUND_PAYMENT: Permission.REFUND_PAYMENT,
  VIEW_TRANSACTIONS: Permission.VIEW_TRANSACTIONS,

  // Admin permissions
  MANAGE_ROLES: Permission.MANAGE_ROLES,
  MANAGE_PERMISSIONS: Permission.MANAGE_PERMISSIONS,
  VIEW_ANALYTICS: Permission.VIEW_ANALYTICS,
  MANAGE_SETTINGS: Permission.MANAGE_SETTINGS,
} as const;

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: Object.values(PERMISSIONS),
  AGENT: [
    Permission.CREATE_PROPERTY,
    Permission.READ_PROPERTY,
    Permission.UPDATE_PROPERTY,
    Permission.DELETE_PROPERTY,
    Permission.MANAGE_PROPERTY_STATUS,
    Permission.CREATE_INSPECTION,
    Permission.READ_INSPECTION,
    Permission.UPDATE_INSPECTION,
    Permission.DELETE_INSPECTION,
    Permission.APPROVE_INSPECTION,
    Permission.VIEW_TRANSACTIONS,
  ],
  LANDLORD: [
    Permission.CREATE_PROPERTY,
    Permission.READ_PROPERTY,
    Permission.UPDATE_PROPERTY,
    Permission.DELETE_PROPERTY,
    Permission.MANAGE_PROPERTY_STATUS,
    Permission.CREATE_INSPECTION,
    Permission.READ_INSPECTION,
    Permission.UPDATE_INSPECTION,
    Permission.DELETE_INSPECTION,
    Permission.VIEW_TRANSACTIONS,
  ],
  TENANT: [
    Permission.READ_PROPERTY,
    Permission.CREATE_INSPECTION,
    Permission.READ_INSPECTION,
    Permission.UPDATE_INSPECTION,
    Permission.DELETE_INSPECTION,
    Permission.VIEW_TRANSACTIONS,
  ],
};
