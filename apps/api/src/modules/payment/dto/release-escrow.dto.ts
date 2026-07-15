import { IsString, IsUUID, IsOptional } from 'class-validator';

export class ReleaseEscrowDto {
  @IsUUID()
  escrowId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
