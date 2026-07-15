import { IsUUID, IsString, IsOptional, IsEnum } from 'class-validator';
import { WalletStatus } from '@prisma/client';

export class CreateWalletDto {
  @IsUUID()
  userId: string;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsEnum(WalletStatus)
  @IsOptional()
  status?: WalletStatus;
}
