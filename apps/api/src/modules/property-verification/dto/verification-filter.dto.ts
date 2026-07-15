import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ModerationStatus } from '@prisma/client';

export class VerificationFilterDto {
  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsEnum(ModerationStatus)
  status?: ModerationStatus;

  @IsOptional()
  @IsString()
  reviewedBy?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
