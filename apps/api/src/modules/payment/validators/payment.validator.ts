import { WalletStatus, PaymentStatus, EscrowStatus, RefundStatus } from '@prisma/client';

export class PaymentValidator {
  private static readonly SUPPORTED_CURRENCIES = ['NGN'];
  private static readonly SUPPORTED_GATEWAYS = ['PAYSTACK', 'FLUTTERWAVE', 'MONNIFY'];
  private static readonly SUPPORTED_PAYMENT_METHODS = ['CARD', 'BANK_TRANSFER', 'USSD', 'QR', 'BANK_ACCOUNT', 'WALLET'];

  static isValidCurrency(currency: string): boolean {
    return this.SUPPORTED_CURRENCIES.includes(currency);
  }

  static isValidGateway(gateway: string): boolean {
    return this.SUPPORTED_GATEWAYS.includes(gateway.toUpperCase());
  }

  static isValidPaymentMethod(method: string): boolean {
    return this.SUPPORTED_PAYMENT_METHODS.includes(method.toUpperCase());
  }

  static isValidAmount(amount: number): boolean {
    return amount > 0 && Number.isFinite(amount);
  }

  static isValidWalletStatus(status: WalletStatus): boolean {
    return status === WalletStatus.ACTIVE;
  }

  static canPerformTransaction(wallet: any, amount: number): boolean {
    if (!this.isValidWalletStatus(wallet.status)) {
      return false;
    }

    if (wallet.availableBalance < amount) {
      return false;
    }

    return true;
  }

  static isValidEscrowTransition(currentStatus: EscrowStatus, newStatus: EscrowStatus): boolean {
    const validTransitions: Record<EscrowStatus, EscrowStatus[]> = {
      PENDING: [EscrowStatus.FUNDED, EscrowStatus.CANCELLED],
      FUNDED: [EscrowStatus.HELD, EscrowStatus.REFUND_PENDING, EscrowStatus.CANCELLED],
      HELD: [EscrowStatus.RELEASE_PENDING, EscrowStatus.REFUND_PENDING, EscrowStatus.DISPUTED],
      RELEASE_PENDING: [EscrowStatus.RELEASED, EscrowStatus.DISPUTED],
      REFUND_PENDING: [EscrowStatus.REFUNDED, EscrowStatus.DISPUTED],
      RELEASED: [],
      REFUNDED: [],
      DISPUTED: [EscrowStatus.RELEASED, EscrowStatus.REFUNDED],
      CANCELLED: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }

  static canReleaseEscrow(escrow: any): boolean {
    return escrow.status === EscrowStatus.HELD || escrow.status === EscrowStatus.RELEASE_PENDING;
  }

  static canRefundEscrow(escrow: any): boolean {
    return escrow.status === EscrowStatus.HELD || escrow.status === EscrowStatus.REFUND_PENDING;
  }

  static canRequestWithdrawal(wallet: any, amount: number): boolean {
    if (!this.isValidWalletStatus(wallet.status)) {
      return false;
    }

    if (wallet.availableBalance < amount) {
      return false;
    }

    return true;
  }

  static canApproveWithdrawal(withdrawal: any): boolean {
    return withdrawal.status === RefundStatus.PENDING;
  }

  static canRejectWithdrawal(withdrawal: any): boolean {
    return withdrawal.status === RefundStatus.PENDING;
  }

  static canRefundPayment(payment: any): boolean {
    return payment.status === PaymentStatus.COMPLETED || payment.status === PaymentStatus.PARTIALLY_REFUNDED;
  }

  static canCreateSettlement(escrow: any): boolean {
    return escrow.status === EscrowStatus.RELEASED;
  }

  static isUniqueReference(reference: string): boolean {
    return !!(reference && reference.length > 0);
  }

  static isValidBankAccount(account: any): boolean {
    return account.isVerified;
  }

  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  static validatePaymentAmount(amount: number, minAmount: number = 100): boolean {
    return amount >= minAmount && amount <= 1000000000;
  }

  static validateWithdrawalAmount(amount: number, minAmount: number = 1000): boolean {
    return amount >= minAmount && amount <= 5000000;
  }

  static validateEscrowAmount(amount: number, minAmount: number = 500): boolean {
    return amount >= minAmount && amount <= 50000000;
  }

  static isDuplicateGatewayReference(reference: string, existingPayment: any): boolean {
    return existingPayment && existingPayment.gatewayReference === reference;
  }

  static isDuplicateReceipt(receiptNumber: string, existingReceipt: any): boolean {
    return existingReceipt && existingReceipt.receiptNumber === receiptNumber;
  }

  static isDuplicateInvoice(invoiceNumber: string, existingInvoice: any): boolean {
    return existingInvoice && existingInvoice.invoiceNumber === invoiceNumber;
  }
}
