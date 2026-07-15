import { IsString, IsArray } from 'class-validator';

export class TagAssignmentDto {
  @IsArray()
  @IsString()
  tags: string[];
}
