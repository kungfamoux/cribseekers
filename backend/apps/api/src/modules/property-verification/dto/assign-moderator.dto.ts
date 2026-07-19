import { IsString, IsUUID, IsOptional } from 'class-validator';

export class AssignModeratorDto {
  @IsUUID()
  propertyId: string;

  @IsUUID()
  assignedTo: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
