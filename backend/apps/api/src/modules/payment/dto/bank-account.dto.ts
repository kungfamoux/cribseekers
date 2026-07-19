import { IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class BankAccountDto {
  @IsUUID()
  walletId: string;

  @IsString()
  bankName: string;

  @IsString()
  accountName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  bankCode: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
