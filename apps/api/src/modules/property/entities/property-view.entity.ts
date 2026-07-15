export class PropertyView {
  id: string;
  propertyId: string;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  viewDuration?: number;
  createdAt: Date;
}
