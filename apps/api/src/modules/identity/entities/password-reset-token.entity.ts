export class PasswordResetToken {
  id: string;
  userId: string;
  token: string;
  type: string;
  expiresAt: Date;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
