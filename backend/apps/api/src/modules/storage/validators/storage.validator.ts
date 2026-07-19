import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { StorageFileType } from '@prisma/client';

@ValidatorConstraint({ name: 'isValidStorageProvider', async: false })
export class IsValidStorageProvider implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const validProviders = ['LOCAL', 'S3', 'CLOUDINARY'];
    return validProviders.includes(value);
  }

  defaultMessage(): string {
    return 'Invalid storage provider. Must be LOCAL, S3, or CLOUDINARY';
  }
}

@ValidatorConstraint({ name: 'isValidStorageCategory', async: false })
export class IsValidStorageCategory implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return StorageValidator.VALID_CATEGORIES.includes(value);
  }

  defaultMessage(): string {
    return 'Invalid storage category';
  }
}

@ValidatorConstraint({ name: 'isValidImageMimeType', async: false })
export class IsValidImageMimeType implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const validMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];
    return validMimeTypes.includes(value);
  }

  defaultMessage(): string {
    return 'Invalid image MIME type';
  }
}

@ValidatorConstraint({ name: 'isValidVideoMimeType', async: false })
export class IsValidVideoMimeType implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const validMimeTypes = [
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'video/x-msvideo',
    ];
    return validMimeTypes.includes(value);
  }

  defaultMessage(): string {
    return 'Invalid video MIME type';
  }
}

@ValidatorConstraint({ name: 'isValidDocumentMimeType', async: false })
export class IsValidDocumentMimeType implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const validMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    return validMimeTypes.includes(value);
  }

  defaultMessage(): string {
    return 'Invalid document MIME type';
  }
}

export class StorageValidator {
  static MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  static MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
  static MAX_DOCUMENT_SIZE = 25 * 1024 * 1024; // 25MB
  static MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

  // Business categories covering every supported file type across the platform.
  // New categories can be appended here without any schema/migration changes,
  // since `category` on StorageFile is a plain string column.
  static VALID_CATEGORIES = [
    'profile_photo',
    'property_image',
    'property_video',
    'property_document',
    'verification_document',
    'inspection_photo',
    'inspection_video',
    'inspection_document',
    'payment_receipt',
    'invoice',
    'admin_attachment',
    'chat_attachment',
    'notification_attachment',
    'document',
    'private_file',
    'temporary_upload',
  ];

  static isValidFileSize(size: number, mimeType: string): boolean {
    if (mimeType.startsWith('image/')) {
      return size <= this.MAX_IMAGE_SIZE;
    }
    if (mimeType.startsWith('video/')) {
      return size <= this.MAX_VIDEO_SIZE;
    }
    if (mimeType === 'application/pdf') {
      return size <= this.MAX_PDF_SIZE;
    }
    if (mimeType.includes('document') || mimeType.includes('sheet')) {
      return size <= this.MAX_DOCUMENT_SIZE;
    }
    return size <= this.MAX_DOCUMENT_SIZE;
  }

  static isValidFileName(fileName: string): boolean {
    const validPattern = /^[a-zA-Z0-9._-]+$/;
    return validPattern.test(fileName);
  }

  static sanitizeFileName(fileName: string): string {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  }

  static generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    const baseName = originalName.replace(`.${extension}`, '');
    return `${this.sanitizeFileName(baseName)}_${timestamp}_${random}.${extension}`;
  }

  static generatePath(entityType: string, entityId: string, category: string): string {
    return `${entityType}/${entityId}/${category}`;
  }

  static isValidPath(path: string): boolean {
    const validPattern = /^[a-zA-Z0-9/_-]+$/;
    return validPattern.test(path);
  }

  static extractExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? (parts.pop() as string).toLowerCase() : '';
  }

  static classifyFileType(mimeType: string): StorageFileType {
    if (mimeType.startsWith('image/')) {
      return StorageFileType.IMAGE;
    }
    if (mimeType.startsWith('video/')) {
      return StorageFileType.VIDEO;
    }
    if (mimeType.startsWith('audio/')) {
      return StorageFileType.AUDIO;
    }
    if (
      mimeType === 'application/pdf' ||
      mimeType.includes('document') ||
      mimeType.includes('sheet') ||
      mimeType.includes('msword') ||
      mimeType.includes('presentation')
    ) {
      return StorageFileType.DOCUMENT;
    }
    return StorageFileType.OTHER;
  }
}
