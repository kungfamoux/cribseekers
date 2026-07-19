import { IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export enum SystemSettingType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  JSON = 'JSON',
}

export class CreateSystemSettingDto {
  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsEnum(SystemSettingType)
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class UpdateSystemSettingDto {
  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}

export class SystemSettingResponseDto {
  id: string;
  key: string;
  value: string;
  type: string;
  category: string | null;
  description: string | null;
  isPublic: boolean;
  updatedAtBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
