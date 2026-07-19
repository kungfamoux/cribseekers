export class RefreshToken {
  id: string;
  userId: string;
  token: string;
  type: string;
  expiresAt: Date;
  revokedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
