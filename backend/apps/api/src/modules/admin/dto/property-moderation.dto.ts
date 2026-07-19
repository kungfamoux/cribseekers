import { IsUUID, IsString, IsOptional } from 'class-validator';

export class ApprovePropertyDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class RejectPropertyDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
