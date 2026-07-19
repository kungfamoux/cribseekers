import { RevenueMetrics } from '../types/analytics-result.type';

export class RevenueMetricsEntity implements RevenueMetrics {
  totalRevenue: number;
  escrowBalance: number;
  walletBalance: number;
  completedPayments: number;
  refundTotal: number;
  withdrawalTotal: number;
  settlementTotal: number;
  outstandingBalance: number;
  paymentGatewaySuccessRate: number;
  commissionEarned: number;
  monthlyRecurringRevenue: number;

  constructor(data?: Partial<RevenueMetrics>) {
    Object.assign(this, data);
  }
}
