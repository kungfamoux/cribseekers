import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateSavedSearchDto {
  @IsString()
  name: string;

  @IsObject()
  filters: any;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsBoolean()
  alertEnabled?: boolean;
}

export class UpdateSavedSearchDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  filters?: any;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsBoolean()
  alertEnabled?: boolean;
}

export class SavedSearchResponseDto {
  id: string;
  userId: string;
  name: string;
  filters: any;
  propertyId?: string;
  alertEnabled: boolean;
  lastRunAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
