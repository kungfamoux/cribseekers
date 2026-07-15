import { IsString, IsBoolean, IsOptional, IsInt, Min, Max, IsArray } from 'class-validator';

export class FeatureFlagDto {
  @IsString()
  key: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  enabled: boolean;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentage?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  whitelist?: string[];
}

export class CreateFeatureFlagDto extends FeatureFlagDto {}

export class UpdateFeatureFlagDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  percentage?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  whitelist?: string[];
}

export class FeatureFlagResponseDto {
  id: string;
  key: string;
  description: string | null;
  enabled: boolean;
  percentage: number;
  whitelist: string[];
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}
