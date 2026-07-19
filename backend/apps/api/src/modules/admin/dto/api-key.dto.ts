import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  scopes: string[];

  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}

export class RotateApiKeyDto {
  @IsString()
  @IsOptional()
  reason?: string;
}

export class ApiKeyResponseDto {
  id: string;
  userId: string;
  name: string;
  key: string;
  scopes: string[];
  isActive: boolean;
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
