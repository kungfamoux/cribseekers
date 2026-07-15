import { Injectable } from '@nestjs/common';
import { StorageProvider, StorageUploadResult, StorageDeleteResult, StorageSignedUrlResult } from '../interfaces/storage-provider.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly uploadDir = './uploads';

  constructor() {
    this.ensureUploadDir();
  }

  private ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(file: Buffer, fileName: string, mimeType: string, path?: string): Promise<StorageUploadResult> {
    const fullPath = path ? `${this.uploadDir}/${path}` : this.uploadDir;
    const filePath = `${fullPath}/${fileName}`;

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    fs.writeFileSync(filePath, file);

    return {
      url: `http://localhost:3000/uploads/${path ? path + '/' : ''}${fileName}`,
      path: `${path ? path + '/' : ''}${fileName}`,
      fileName,
      size: file.length,
      mimeType,
      metadata: {
        provider: 'local',
        uploadedAt: new Date().toISOString(),
      },
    };
  }

  async delete(path: string): Promise<StorageDeleteResult> {
    const filePath = `${this.uploadDir}/${path}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return {
      success: true,
      path,
    };
  }

  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<StorageSignedUrlResult> {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    return {
      url: `http://localhost:3000/uploads/${path}?expires=${expiresAt.getTime()}`,
      expiresAt,
    };
  }

  async exists(path: string): Promise<boolean> {
    const filePath = `${this.uploadDir}/${path}`;
    return fs.existsSync(filePath);
  }

  async copy(sourcePath: string, destinationPath: string): Promise<StorageUploadResult> {
    const sourceFilePath = `${this.uploadDir}/${sourcePath}`;
    const destFilePath = `${this.uploadDir}/${destinationPath}`;

    const destDir = path.dirname(destFilePath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(sourceFilePath, destFilePath);

    return {
      url: `http://localhost:3000/uploads/${destinationPath}`,
      path: destinationPath,
      fileName: destinationPath.split('/').pop() || 'file',
      size: fs.statSync(destFilePath).size,
      mimeType: 'application/octet-stream',
      metadata: {
        provider: 'local',
        copiedFrom: sourcePath,
        copiedAt: new Date().toISOString(),
      },
    };
  }

  async move(sourcePath: string, destinationPath: string): Promise<StorageUploadResult> {
    const sourceFilePath = `${this.uploadDir}/${sourcePath}`;
    const destFilePath = `${this.uploadDir}/${destinationPath}`;

    const destDir = path.dirname(destFilePath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.renameSync(sourceFilePath, destFilePath);

    return {
      url: `http://localhost:3000/uploads/${destinationPath}`,
      path: destinationPath,
      fileName: destinationPath.split('/').pop() || 'file',
      size: fs.statSync(destFilePath).size,
      mimeType: 'application/octet-stream',
      metadata: {
        provider: 'local',
        movedFrom: sourcePath,
        movedAt: new Date().toISOString(),
      },
    };
  }

  async getMetadata(path: string): Promise<any> {
    const filePath = `${this.uploadDir}/${path}`;
    if (!fs.existsSync(filePath)) {
      return {
        path,
        provider: 'local',
        exists: false,
      };
    }

    const stats = fs.statSync(filePath);
    return {
      path,
      provider: 'local',
      exists: true,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
    };
  }
}
