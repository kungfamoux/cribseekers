export class LoginHistory {
  id: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  loginAt: Date;
  logoutAt?: Date;
  status: string;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
