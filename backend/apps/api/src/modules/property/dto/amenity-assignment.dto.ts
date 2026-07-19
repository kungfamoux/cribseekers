import { IsString, IsArray } from 'class-validator';

export class AmenityAssignmentDto {
  @IsArray()
  @IsString()
  amenityIds: string[];
}
