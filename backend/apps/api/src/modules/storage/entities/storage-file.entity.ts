import { StorageFileType, StorageProvider, StorageStatus, StorageVisibility } from '@prisma/client';

export class StorageFile {
  id: string;

  originalFileName: string;
  storedFileName: string;
  extension: string;
  mimeType: string;
  fileType: StorageFileType;
  size: number;

  provider: StorageProvider;
  bucket?: string | null;
  folder?: string | null;
  storageKey: string;
  url: string;
  signedUrl?: string | null;
  signedUrlExpiresAt?: Date | null;
  checksum?: string | null;

  width?: number | null;
  height?: number | null;
  duration?: number | null;

  visibility: StorageVisibility;
  status: StorageStatus;
  isTemporary: boolean;
  expiresAt?: Date | null;

  metadata?: unknown;

  uploadedBy?: string | null;
  entityType?: string | null;
  entityId?: string | null;
  category?: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
