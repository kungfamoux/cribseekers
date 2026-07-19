import { PaymentMetrics } from '../types/analytics-result.type';

export class PaymentMetricsEntity implements PaymentMetrics {
  revenue: number;
  escrow: number;
  walletActivity: number;
  refunds: number;
  withdrawals: number;
  settlements: number;
  outstandingBalances: number;
  paymentGatewaySuccessRate: number;
  byPeriod: Array<{ period: string; revenue: number; count: number }>;

  constructor(data?: Partial<PaymentMetrics>) {
    Object.assign(this, data);
  }
}
