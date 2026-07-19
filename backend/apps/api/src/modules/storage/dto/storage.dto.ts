import {
  IsUUID,
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsObject,
  IsDateString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StorageFileType, StorageProvider, StorageStatus, StorageVisibility } from '@prisma/client';

export class UploadFileDto {
  @ApiPropertyOptional({ description: 'Domain entity this file belongs to, e.g. PROPERTY, INSPECTION, USER' })
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional({ description: 'ID of the domain entity this file belongs to' })
  @IsOptional()
  @IsUUID()
  entityId?: string;

  @ApiProperty({ description: 'Business category of the file, e.g. property_image, profile_photo, invoice' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ enum: StorageVisibility, default: StorageVisibility.PRIVATE })
  @IsOptional()
  @IsEnum(StorageVisibility)
  visibility?: StorageVisibility = StorageVisibility.PRIVATE;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isTemporary?: boolean = false;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class StorageFileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  originalFileName: string;

  @ApiProperty()
  storedFileName: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty({ enum: StorageFileType })
  fileType: StorageFileType;

  @ApiProperty()
  size: number;

  @ApiProperty({ enum: StorageProvider })
  provider: StorageProvider;

  @ApiPropertyOptional()
  bucket?: string | null;

  @ApiPropertyOptional()
  folder?: string | null;

  @ApiProperty()
  storageKey: string;

  @ApiProperty()
  url: string;

  @ApiPropertyOptional()
  signedUrl?: string | null;

  @ApiPropertyOptional()
  signedUrlExpiresAt?: Date | null;

  @ApiPropertyOptional()
  checksum?: string | null;

  @ApiPropertyOptional()
  width?: number | null;

  @ApiPropertyOptional()
  height?: number | null;

  @ApiPropertyOptional()
  duration?: number | null;

  @ApiProperty({ enum: StorageVisibility })
  visibility: StorageVisibility;

  @ApiProperty({ enum: StorageStatus })
  status: StorageStatus;

  @ApiProperty()
  isTemporary: boolean;

  @ApiPropertyOptional()
  expiresAt?: Date | null;

  @ApiPropertyOptional()
  metadata?: unknown;

  @ApiPropertyOptional()
  uploadedBy?: string | null;

  @ApiPropertyOptional()
  entityType?: string | null;

  @ApiPropertyOptional()
  entityId?: string | null;

  @ApiPropertyOptional()
  category?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UpdateStorageFileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: StorageVisibility })
  @IsOptional()
  @IsEnum(StorageVisibility)
  visibility?: StorageVisibility;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class DeleteFileDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;
}

export class ReplaceFileDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;
}

export class CopyFileDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiPropertyOptional({ description: 'Destination folder for the copied file. Defaults to the source folder.' })
  @IsOptional()
  @IsString()
  destinationFolder?: string;
}

export class MoveFileDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiProperty({ description: 'Destination folder to move the file into.' })
  @IsString()
  destinationFolder: string;
}

export class SignedUrlDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiPropertyOptional({ default: 3600 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  expiresIn?: number = 3600;
}

export class BulkUploadDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  entityId?: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiPropertyOptional({ enum: StorageVisibility, default: StorageVisibility.PRIVATE })
  @IsOptional()
  @IsEnum(StorageVisibility)
  visibility?: StorageVisibility = StorageVisibility.PRIVATE;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class BulkDeleteDto {
  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  fileIds: string[];
}

export class BulkDeleteResultDto {
  @ApiProperty()
  deletedCount: number;

  @ApiProperty({ isArray: true, type: String })
  failedIds: string[];
}

export class StorageFileQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: StorageProvider })
  @IsOptional()
  @IsEnum(StorageProvider)
  provider?: StorageProvider;

  @ApiPropertyOptional({ enum: StorageStatus })
  @IsOptional()
  @IsEnum(StorageStatus)
  status?: StorageStatus;

  @ApiPropertyOptional({ enum: StorageVisibility })
  @IsOptional()
  @IsEnum(StorageVisibility)
  visibility?: StorageVisibility;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isTemporary?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  uploadedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
