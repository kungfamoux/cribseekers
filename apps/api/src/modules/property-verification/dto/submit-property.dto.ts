import { IsString, IsOptional, IsUUID } from 'class-validator';

export class SubmitPropertyDto {
  @IsUUID()
  propertyId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
