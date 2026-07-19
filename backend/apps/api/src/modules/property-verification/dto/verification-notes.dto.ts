import { IsString, IsOptional, IsUUID } from 'class-validator';

export class VerificationNotesDto {
  @IsUUID()
  propertyId: string;

  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  internalNotes?: string;
}
