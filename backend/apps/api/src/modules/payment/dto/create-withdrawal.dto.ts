import { IsNumber, IsString, IsUUID, IsOptional, Min } from 'class-validator';

export class CreateWithdrawalDto {
  @IsUUID()
  walletId: string;

  @IsUUID()
  bankAccountId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  reason?: string;
}
