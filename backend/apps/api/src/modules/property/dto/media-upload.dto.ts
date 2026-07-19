import { IsString, IsOptional, IsInt, Min, MaxLength, IsBoolean } from 'class-validator';
import { MediaStatus } from '@prisma/client';

export class MediaUploadDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  altText?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  caption?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  width?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  height?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  fileSize?: number;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  fileType?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;
}

export class MediaResponseDto {
  id: string;
  propertyId: string;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  caption?: string;
  title?: string;
  description?: string;
  order: number;
  isPrimary: boolean;
  status: MediaStatus;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  fileName?: string;
  fileType?: string;
  category?: string;
  duration?: number;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
