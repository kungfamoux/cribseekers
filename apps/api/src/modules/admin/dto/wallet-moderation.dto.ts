import { IsUUID, IsString, IsOptional } from 'class-validator';

export class FreezeWalletDto {
  @IsUUID()
  walletId: string;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UnfreezeWalletDto {
  @IsUUID()
  walletId: string;

  @IsString()
  @IsOptional()
  reason?: string;
}
