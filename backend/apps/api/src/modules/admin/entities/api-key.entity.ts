export class ApiKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  scopes: string[];
  isActive: boolean;
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
