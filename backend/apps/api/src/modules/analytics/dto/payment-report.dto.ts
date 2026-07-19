import { ApiProperty } from '@nestjs/swagger';

export class PaymentReportDto {
  @ApiProperty({ description: 'Revenue in NGN' })
  revenue: number;

  @ApiProperty({ description: 'Escrow in NGN' })
  escrow: number;

  @ApiProperty({ description: 'Wallet activity count' })
  walletActivity: number;

  @ApiProperty({ description: 'Refunds in NGN' })
  refunds: number;

  @ApiProperty({ description: 'Withdrawals in NGN' })
  withdrawals: number;

  @ApiProperty({ description: 'Settlements in NGN' })
  settlements: number;

  @ApiProperty({ description: 'Outstanding balances in NGN' })
  outstandingBalances: number;

  @ApiProperty({ description: 'Payment gateway success rate percentage' })
  paymentGatewaySuccessRate: number;

  @ApiProperty({ description: 'Metrics by period' })
  byPeriod: PeriodMetricsDto[];
}

export class PeriodMetricsDto {
  @ApiProperty({ description: 'Period label' })
  period: string;

  @ApiProperty({ description: 'Revenue in NGN' })
  revenue: number;

  @ApiProperty({ description: 'Count' })
  count: number;
}
