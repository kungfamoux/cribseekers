import { IsUUID, IsEnum, IsString, IsOptional, IsArray } from 'class-validator';
import { InspectionResultStatus } from '@prisma/client';

export class InspectionResultDto {
  @IsUUID()
  inspectionId: string;

  @IsEnum(InspectionResultStatus)
  status: InspectionResultStatus;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photos?: string[];
}
