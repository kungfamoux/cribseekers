import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class PropertyReportDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  description?: string;
}
