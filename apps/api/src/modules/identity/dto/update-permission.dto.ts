import { IsString, IsOptional, IsEnum, IsBoolean, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';
import { PermissionType } from '@prisma/client';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(PermissionType)
  type?: PermissionType;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  resource?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  action?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  conditions?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
