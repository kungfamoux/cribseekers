export class StorageFile {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  path: string;
  provider: string;
  entityType: string;
  entityId: string;
  category: string;
  isPublic: boolean;
  isTemporary: boolean;
  expiresAt?: Date;
  metadata?: any;
  uploadedBy?: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
