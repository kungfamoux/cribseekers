import { IsString, IsOptional } from 'class-validator';

export class RejectWithdrawalDto {
  @IsString()
  withdrawalId: string;

  @IsString()
  rejectedBy: string;

  @IsString()
  rejectionReason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
