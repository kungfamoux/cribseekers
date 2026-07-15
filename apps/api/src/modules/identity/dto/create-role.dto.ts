import { IsString, IsOptional, IsEnum, IsBoolean, MaxLength } from 'class-validator';
import { RoleType } from '@prisma/client';

export class CreateRoleDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsEnum(RoleType)
  type: RoleType;

  @IsOptional()
  @IsBoolean()
  isSystem?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
