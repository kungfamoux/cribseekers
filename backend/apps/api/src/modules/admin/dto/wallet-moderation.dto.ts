import { IsString, IsOptional } from 'class-validator';

export class FreezeWalletDto {
  @IsString()
  walletId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UnfreezeWalletDto {
  @IsString()
  walletId: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
