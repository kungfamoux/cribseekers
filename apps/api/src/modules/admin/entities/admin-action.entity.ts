export class AdminAction {
  id: string;
  adminId: string;
  action: string;
  targetEntityType: string;
  targetEntityId: string;
  reason: string | null;
  outcome: string | null;
  metadata: any;
  ipAddress: string | null;
  userAgent: string | null;
  requestId: string | null;
  createdAt: Date;
}
