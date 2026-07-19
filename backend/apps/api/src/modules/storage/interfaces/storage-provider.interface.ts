export interface StorageUploadResult {
  url: string;
  path: string;
  fileName: string;
  size: number;
  mimeType: string;
  metadata?: any;
}

export interface StorageDeleteResult {
  success: boolean;
  path: string;
}

export interface StorageSignedUrlResult {
  url: string;
  expiresAt: Date;
}

// Named with an `I` prefix (matching this codebase's interface convention) to avoid
// colliding with the generated Prisma `StorageProvider` enum, which identifies which
// backend a given StorageFile record was persisted with.
export interface IStorageProvider {
  upload(file: Buffer, fileName: string, mimeType: string, path?: string): Promise<StorageUploadResult>;
  delete(path: string): Promise<StorageDeleteResult>;
  getSignedUrl(path: string, expiresIn?: number): Promise<StorageSignedUrlResult>;
  exists(path: string): Promise<boolean>;
  copy(sourcePath: string, destinationPath: string): Promise<StorageUploadResult>;
  move(sourcePath: string, destinationPath: string): Promise<StorageUploadResult>;
  getMetadata(path: string): Promise<any>;
}
