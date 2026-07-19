import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

// Controllers
import { WalletController } from './controller/wallet.controller';
import { PaymentController } from './controller/payment.controller';
import { EscrowController } from './controller/escrow.controller';
import { WithdrawalController } from './controller/withdrawal.controller';
import { BankAccountController } from './controller/bank-account.controller';
import { SettlementController } from './controller/settlement.controller';
import { InvoiceController } from './controller/invoice.controller';
import { ReceiptController } from './controller/receipt.controller';

// Services
import { WalletService } from './service/wallet.service';
import { PaymentService } from './service/payment.service';
import { EscrowService } from './service/escrow.service';
import { RefundService } from './service/refund.service';
import { WithdrawalService } from './service/withdrawal.service';
import { SettlementService } from './service/settlement.service';
import { BankAccountService } from './service/bank-account.service';
import { InvoiceService } from './service/invoice.service';
import { ReceiptService } from './service/receipt.service';
import { PaymentGatewayService } from './service/payment-gateway.service';

// Repositories
import { WalletRepository } from './repository/wallet.repository';
import { PaymentRepository } from './repository/payment.repository';
import { EscrowRepository } from './repository/escrow.repository';
import { RefundRepository } from './repository/refund.repository';
import { WithdrawalRepository } from './repository/withdrawal.repository';
import { SettlementRepository } from './repository/settlement.repository';
import { BankAccountRepository } from './repository/bank-account.repository';
import { InvoiceRepository } from './repository/invoice.repository';
import { ReceiptRepository } from './repository/receipt.repository';

// Gateways
import { PaystackGateway } from './service/gateways/paystack.gateway';
import { FlutterwaveGateway } from './service/gateways/flutterwave.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [
    WalletController,
    PaymentController,
    EscrowController,
    WithdrawalController,
    BankAccountController,
    SettlementController,
    InvoiceController,
    ReceiptController,
  ],
  providers: [
    WalletService,
    PaymentService,
    EscrowService,
    RefundService,
    WithdrawalService,
    SettlementService,
    BankAccountService,
    InvoiceService,
    ReceiptService,
    PaymentGatewayService,
    WalletRepository,
    PaymentRepository,
    EscrowRepository,
    RefundRepository,
    WithdrawalRepository,
    SettlementRepository,
    BankAccountRepository,
    InvoiceRepository,
    ReceiptRepository,
    PaystackGateway,
    FlutterwaveGateway,
  ],
  exports: [
    WalletService,
    PaymentService,
    EscrowService,
    RefundService,
    WithdrawalService,
    SettlementService,
    BankAccountService,
    InvoiceService,
    ReceiptService,
    PaymentGatewayService,
  ],
})
export class PaymentModule {}
