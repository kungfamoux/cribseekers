import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreatePropertyReportDto {
  @IsString()
  propertyId: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  reason: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}

export class UpdatePropertyReportDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  resolution?: string;
}

export class PropertyReportResponseDto {
  id: string;
  propertyId: string;
  reportedBy: string;
  reason: string;
  description?: string;
  status: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}
