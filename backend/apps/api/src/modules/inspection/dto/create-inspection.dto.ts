import { IsString, IsUUID, IsOptional, IsEnum, IsInt, IsDate, Min, Max } from 'class-validator';
import { InspectionType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateInspectionDto {
  @IsUUID()
  propertyId: string;

  @IsEnum(InspectionType)
  @IsOptional()
  type?: InspectionType;

  @Type(() => Date)
  @IsDate()
  scheduledAt: Date;

  @IsInt()
  @IsOptional()
  @Min(15)
  @Max(180)
  durationMinutes?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
