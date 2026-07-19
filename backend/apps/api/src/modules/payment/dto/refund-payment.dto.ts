import { IsNumber, IsString, IsUUID, IsOptional, Min } from 'class-validator';

export class RefundPaymentDto {
  @IsUUID()
  paymentId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  reason?: string;
}
