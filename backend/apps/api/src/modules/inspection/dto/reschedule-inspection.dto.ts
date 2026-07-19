import { IsUUID, IsDate, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RescheduleInspectionDto {
  @IsUUID()
  inspectionId: string;

  @Type(() => Date)
  @IsDate()
  newScheduledAt: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}
