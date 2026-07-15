import { IsString, IsOptional, IsUUID } from 'class-validator';

export class ApprovePropertyDto {
  @IsUUID()
  propertyId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
