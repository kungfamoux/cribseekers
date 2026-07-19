export class ActivityLog {
  id: string;
  userId: string | null;
  action: string;
  description: string;
  metadata: any;
  ipAddress: string | null;
  userAgent: string | null;
  requestId: string | null;
  createdAt: Date;
}
