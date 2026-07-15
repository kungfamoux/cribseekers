import { IsUUID, IsString, IsInt, IsBoolean, IsOptional, IsObject, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty()
  @IsString()
  entityType: string;

  @ApiProperty()
  @IsUUID()
  entityId: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean = false;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isTemporary?: boolean = false;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class StorageFileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  url: string;

  @ApiPropertyOptional()
  thumbnailUrl?: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  provider: string;

  @ApiProperty()
  entityType: string;

  @ApiProperty()
  entityId: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  isTemporary: boolean;

  @ApiPropertyOptional()
  expiresAt?: Date;

  @ApiPropertyOptional()
  metadata?: any;

  @ApiPropertyOptional()
  uploadedBy?: string;

  @ApiProperty()
  uploadedAt: Date;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: any;

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

export class CopyFileDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiProperty()
  @IsString()
  destinationPath: string;
}

export class MoveFileDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiProperty()
  @IsString()
  destinationPath: string;
}

export class SignedUrlDto {
  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  expiresIn?: number = 3600;
}

export class BulkUploadDto {
  @ApiProperty()
  @IsString()
  entityType: string;

  @ApiProperty()
  @IsUUID()
  entityId: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean = false;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class BulkDeleteDto {
  @ApiProperty({ isArray: true })
  @IsString({ each: true })
  fileIds: string[];
}
