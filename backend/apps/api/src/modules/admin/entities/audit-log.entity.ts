import { AuditAction } from '@prisma/client';

export class AuditLog {
  id: string;
  actorId: string;
  actorType: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  changes: any;
  ipAddress: string | null;
  userAgent: string | null;
  requestId: string | null;
  metadata: any;
  createdAt: Date;
}
