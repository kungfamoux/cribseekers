import { IsNumber, IsString, IsUUID, IsOptional, IsObject, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  gateway: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  @IsOptional()
  walletId?: string;

  @IsUUID()
  @IsOptional()
  escrowId?: string;

  @IsUUID()
  @IsOptional()
  inspectionId?: string;

  @IsUUID()
  @IsOptional()
  propertyId?: string;

  @IsObject()
  @IsOptional()
  metadata?: any;
}
