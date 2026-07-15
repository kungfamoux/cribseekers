import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class RejectPropertyDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  @IsNotEmpty()
  rejectionReason: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
