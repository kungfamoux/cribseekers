import { IsString, IsOptional } from 'class-validator';

export class FeatureAssignmentDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  value?: string;
}
