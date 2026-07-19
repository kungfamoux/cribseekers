import { IsUUID, IsString, IsOptional } from 'class-validator';

export class ApproveWithdrawalDto {
  @IsUUID()
  withdrawalId: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class RejectWithdrawalDto {
  @IsUUID()
  withdrawalId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
