export class SystemSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  category: string | null;
  description: string | null;
  isPublic: boolean;
  updatedAtBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
