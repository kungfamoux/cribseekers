import { SessionStatus } from '@prisma/client';

export class Session {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
  status: SessionStatus;
  expiresAt: Date;
  lastActivityAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
