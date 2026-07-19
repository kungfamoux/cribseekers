import { HttpException, HttpStatus } from '@nestjs/common';

export class WalletNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Wallet with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class InsufficientFundsException extends HttpException {
  constructor() {
    super('Insufficient funds in wallet', HttpStatus.BAD_REQUEST);
  }
}

export class DuplicatePaymentException extends HttpException {
  constructor(reference: string) {
    super(`Payment with reference ${reference} already exists`, HttpStatus.CONFLICT);
  }
}

export class PaymentVerificationFailedException extends HttpException {
  constructor(reason: string) {
    super(`Payment verification failed: ${reason}`, HttpStatus.BAD_REQUEST);
  }
}

export class EscrowNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Escrow with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class EscrowAlreadyReleasedException extends HttpException {
  constructor(id: string) {
    super(`Escrow ${id} is already released`, HttpStatus.BAD_REQUEST);
  }
}

export class RefundNotAllowedException extends HttpException {
  constructor(reason: string) {
    super(`Refund not allowed: ${reason}`, HttpStatus.BAD_REQUEST);
  }
}

export class WithdrawalNotAllowedException extends HttpException {
  constructor(reason: string) {
    super(`Withdrawal not allowed: ${reason}`, HttpStatus.BAD_REQUEST);
  }
}

export class BankAccountNotVerifiedException extends HttpException {
  constructor(id: string) {
    super(`Bank account ${id} is not verified`, HttpStatus.BAD_REQUEST);
  }
}

export class SettlementFailedException extends HttpException {
  constructor(reason: string) {
    super(`Settlement failed: ${reason}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class DuplicateReceiptException extends HttpException {
  constructor(receiptNumber: string) {
    super(`Receipt with number ${receiptNumber} already exists`, HttpStatus.CONFLICT);
  }
}

export class DuplicateInvoiceException extends HttpException {
  constructor(invoiceNumber: string) {
    super(`Invoice with number ${invoiceNumber} already exists`, HttpStatus.CONFLICT);
  }
}
