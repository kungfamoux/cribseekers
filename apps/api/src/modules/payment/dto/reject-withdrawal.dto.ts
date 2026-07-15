import { IsString, IsUUID, IsOptional } from 'class-validator';

export class RejectWithdrawalDto {
  @IsUUID()
  withdrawalId: string;

  @IsUUID()
  rejectedBy: string;

  @IsString()
  rejectionReason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
