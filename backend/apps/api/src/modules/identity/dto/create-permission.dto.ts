import { IsString, IsOptional, IsEnum, IsBoolean, MaxLength } from 'class-validator';
import { PermissionType } from '@prisma/client';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsEnum(PermissionType)
  type: PermissionType;

  @IsString()
  @MaxLength(100)
  resource: string;

  @IsString()
  @MaxLength(100)
  action: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  conditions?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
