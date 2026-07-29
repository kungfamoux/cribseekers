import { IsString, IsOptional } from 'class-validator';

export class ApproveWithdrawalDto {
  @IsString()
  withdrawalId: string;

  @IsString()
  approvedBy: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
