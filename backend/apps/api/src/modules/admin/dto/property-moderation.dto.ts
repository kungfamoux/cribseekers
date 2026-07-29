import { IsString, IsOptional } from 'class-validator';

export class ApprovePropertyDto {
  @IsString()
  propertyId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class RejectPropertyDto {
  @IsString()
  propertyId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
