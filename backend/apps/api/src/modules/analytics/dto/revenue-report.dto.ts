import { ApiProperty } from '@nestjs/swagger';

export class RevenueReportDto {
  @ApiProperty({ description: 'Total revenue in NGN' })
  totalRevenue: number;

  @ApiProperty({ description: 'Escrow balance in NGN' })
  escrowBalance: number;

  @ApiProperty({ description: 'Wallet balance in NGN' })
  walletBalance: number;

  @ApiProperty({ description: 'Completed payments count' })
  completedPayments: number;

  @ApiProperty({ description: 'Refund total in NGN' })
  refundTotal: number;

  @ApiProperty({ description: 'Withdrawal total in NGN' })
  withdrawalTotal: number;

  @ApiProperty({ description: 'Settlement total in NGN' })
  settlementTotal: number;

  @ApiProperty({ description: 'Outstanding balance in NGN' })
  outstandingBalance: number;

  @ApiProperty({ description: 'Payment gateway success rate percentage' })
  paymentGatewaySuccessRate: number;

  @ApiProperty({ description: 'Commission earned in NGN' })
  commissionEarned: number;

  @ApiProperty({ description: 'Monthly recurring revenue in NGN' })
  monthlyRecurringRevenue: number;
}
