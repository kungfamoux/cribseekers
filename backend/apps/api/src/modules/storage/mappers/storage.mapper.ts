import { StorageFile } from '../entities/storage-file.entity';
import { StorageFileResponseDto } from '../dto/storage.dto';

export class StorageMapper {
  static toResponseDto(file: StorageFile): StorageFileResponseDto {
    const dto = new StorageFileResponseDto();

    dto.id = file.id;
    dto.originalFileName = file.originalFileName;
    dto.storedFileName = file.storedFileName;
    dto.extension = file.extension;
    dto.mimeType = file.mimeType;
    dto.fileType = file.fileType;
    dto.size = file.size;
    dto.provider = file.provider;
    dto.bucket = file.bucket ?? null;
    dto.folder = file.folder ?? null;
    dto.storageKey = file.storageKey;
    dto.url = file.url;
    dto.signedUrl = file.signedUrl ?? null;
    dto.signedUrlExpiresAt = file.signedUrlExpiresAt ?? null;
    dto.checksum = file.checksum ?? null;
    dto.width = file.width ?? null;
    dto.height = file.height ?? null;
    dto.duration = file.duration ?? null;
    dto.visibility = file.visibility;
    dto.status = file.status;
    dto.isTemporary = file.isTemporary;
    dto.expiresAt = file.expiresAt ?? null;
    dto.metadata = file.metadata;
    dto.uploadedBy = file.uploadedBy ?? null;
    dto.entityType = file.entityType ?? null;
    dto.entityId = file.entityId ?? null;
    dto.category = file.category ?? null;
    dto.createdAt = file.createdAt;
    dto.updatedAt = file.updatedAt;

    return dto;
  }

  static toResponseDtoList(files: StorageFile[]): StorageFileResponseDto[] {
    return files.map((file) => this.toResponseDto(file));
  }
}
