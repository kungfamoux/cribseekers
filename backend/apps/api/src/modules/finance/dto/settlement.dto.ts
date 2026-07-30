import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum FinanceSettlementStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class CreateSettlementDto {
  @ApiProperty()
  @IsString()
  entityType: string;

  @ApiProperty()
  @IsString()
  entityId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  platformFee: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  serviceProviderFee: number;
}

export class UpdateSettlementDto {
  @ApiPropertyOptional({ enum: FinanceSettlementStatus })
  @IsEnum(FinanceSettlementStatus)
  @IsOptional()
  status?: FinanceSettlementStatus;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: any;
}
