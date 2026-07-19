export interface PaymentGatewayResponse {
  success: boolean;
  reference?: string;
  message?: string;
  data?: any;
}

export interface InitializePaymentOptions {
  amount: number;
  email: string;
  reference: string;
  callbackUrl?: string;
  metadata?: any;
}

export interface VerifyPaymentOptions {
  reference: string;
}

export interface RefundOptions {
  transactionId: string;
  amount: number;
  reason?: string;
}

export interface CreateTransferOptions {
  accountNumber: string;
  bankCode: string;
  amount: number;
  narration?: string;
  reference?: string;
}

export interface CreateCustomerOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  metadata?: any;
}

export interface IPaymentGateway {
  getName(): string;
  initializePayment(options: InitializePaymentOptions): Promise<PaymentGatewayResponse>;
  verifyPayment(options: VerifyPaymentOptions): Promise<PaymentGatewayResponse>;
  refund(options: RefundOptions): Promise<PaymentGatewayResponse>;
  createTransfer(options: CreateTransferOptions): Promise<PaymentGatewayResponse>;
  createCustomer(options: CreateCustomerOptions): Promise<PaymentGatewayResponse>;
}
