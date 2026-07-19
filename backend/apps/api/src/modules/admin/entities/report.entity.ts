import { ReportStatus } from '@prisma/client';

export class Report {
  id: string;
  categoryId: string;
  reportedBy: string;
  entityType: string;
  entityId: string;
  reason: string;
  description: string | null;
  status: ReportStatus;
  priority: string;
  assignedTo: string | null;
  resolvedBy: string | null;
  resolvedAt: Date | null;
  resolution: string | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}
