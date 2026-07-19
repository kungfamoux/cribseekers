import { PermissionType } from '@prisma/client';

export class Permission {
  id: string;
  name: string;
  description?: string;
  type: PermissionType;
  resource: string;
  createdAt: Date;
  updatedAt: Date;
}
