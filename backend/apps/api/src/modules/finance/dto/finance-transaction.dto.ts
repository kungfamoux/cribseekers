import { IsEnum, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum FinanceTransactionType {
  INSPECTION = 'INSPECTION',
  ESCROW = 'ESCROW',
  PREMIUM = 'PREMIUM',
  ADVERTISEMENT = 'ADVERTISEMENT',
  MOVING_SERVICE = 'MOVING_SERVICE',
  REFUND = 'REFUND',
  PAYOUT = 'PAYOUT',
}

export class CreateFinanceTransactionDto {
  @ApiProperty({ enum: FinanceTransactionType })
  @IsEnum(FinanceTransactionType)
  transactionType: FinanceTransactionType;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ default: 'NGN' })
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNumber()
  platformRevenue: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  serviceProviderRevenue: number;

  @ApiPropertyOptional()
  @IsUUID()
  customerId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  serviceProviderId?: string;

  @ApiProperty()
  @IsString()
  reference: string;
}

export class UpdateFinanceTransactionDto {
  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}
