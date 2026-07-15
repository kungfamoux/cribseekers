import { IsUUID, IsOptional, IsEnum, IsDate } from 'class-validator';
import { InspectionType, InspectionStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class InspectionFilterDto {
  @IsUUID()
  @IsOptional()
  propertyId?: string;

  @IsUUID()
  @IsOptional()
  requestedBy?: string;

  @IsEnum(InspectionType)
  @IsOptional()
  type?: InspectionType;

  @IsEnum(InspectionStatus)
  @IsOptional()
  status?: InspectionStatus;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  scheduledFrom?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  scheduledTo?: Date;
}
