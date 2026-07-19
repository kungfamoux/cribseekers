import { Injectable } from '@nestjs/common';
import { IStorageProvider, StorageUploadResult, StorageDeleteResult, StorageSignedUrlResult } from '../interfaces/storage-provider.interface';

@Injectable()
export class CloudinaryProvider implements IStorageProvider {
  async upload(file: Buffer, fileName: string, mimeType: string, path?: string): Promise<StorageUploadResult> {
    return {
      url: `https://res.cloudinary.com/cribseekers/${path || 'uploads'}/${fileName}`,
      path: `${path || 'uploads'}/${fileName}`,
      fileName,
      size: file.length,
      mimeType,
      metadata: {
        provider: 'cloudinary',
        uploadedAt: new Date().toISOString(),
      },
    };
  }

  async delete(path: string): Promise<StorageDeleteResult> {
    return {
      success: true,
      path,
    };
  }

  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<StorageSignedUrlResult> {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    return {
      url: `https://res.cloudinary.com/cribseekers/${path}?expires=${expiresAt.getTime()}`,
      expiresAt,
    };
  }

  async exists(_path: string): Promise<boolean> {
    return true;
  }

  async copy(sourcePath: string, destinationPath: string): Promise<StorageUploadResult> {
    return {
      url: `https://res.cloudinary.com/cribseekers/${destinationPath}`,
      path: destinationPath,
      fileName: destinationPath.split('/').pop() || 'file',
      size: 0,
      mimeType: 'application/octet-stream',
      metadata: {
        provider: 'cloudinary',
        copiedFrom: sourcePath,
        copiedAt: new Date().toISOString(),
      },
    };
  }

  async move(sourcePath: string, destinationPath: string): Promise<StorageUploadResult> {
    await this.delete(sourcePath);
    return {
      url: `https://res.cloudinary.com/cribseekers/${destinationPath}`,
      path: destinationPath,
      fileName: destinationPath.split('/').pop() || 'file',
      size: 0,
      mimeType: 'application/octet-stream',
      metadata: {
        provider: 'cloudinary',
        movedFrom: sourcePath,
        movedAt: new Date().toISOString(),
      },
    };
  }

  async getMetadata(path: string): Promise<any> {
    return {
      path,
      provider: 'cloudinary',
      exists: true,
    };
  }
}
