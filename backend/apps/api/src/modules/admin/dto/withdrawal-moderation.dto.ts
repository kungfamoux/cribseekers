import { IsString, IsOptional } from 'class-validator';

export class ApproveWithdrawalDto {
  @IsString()
  withdrawalId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class RejectWithdrawalDto {
  @IsString()
  withdrawalId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
