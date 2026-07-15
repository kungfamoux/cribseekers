import { IsString, IsUUID, IsOptional } from 'class-validator';

export class ApproveWithdrawalDto {
  @IsUUID()
  withdrawalId: string;

  @IsUUID()
  approvedBy: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
