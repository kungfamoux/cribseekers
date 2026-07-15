import { RoleType } from '@prisma/client';

export class Role {
  id: string;
  name: string;
  description?: string;
  type: RoleType;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}
