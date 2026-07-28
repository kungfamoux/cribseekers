import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import crypto from 'crypto';
import {
  IPaymentGateway,
  PaymentGatewayResponse,
  InitializePaymentOptions,
  VerifyPaymentOptions,
  RefundOptions,
  CreateTransferOptions,
  CreateCustomerOptions,
} from '../../interfaces/payment-gateway.interface';

@Injectable()
export class PaystackGateway implements IPaymentGateway {
  private readonly logger = new Logger(PaystackGateway.name);
  private readonly secretKey: string;
  private readonly baseUrl = 'https://api.paystack.co';

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
    if (!this.secretKey) {
      this.logger.warn('PAYSTACK_SECRET_KEY not configured');
    }
  }

  getName(): string {
    return 'PAYSTACK';
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  async initializePayment(options: InitializePaymentOptions): Promise<PaymentGatewayResponse> {
    this.logger.log(`Initializing payment with Paystack: ${options.reference}`);
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          reference: options.reference,
          amount: options.amount * 100, // Paystack expects amount in kobo
          email: options.email,
          currency: options.currency || 'NGN',
          callback_url: options.callbackUrl,
          metadata: options.metadata,
        },
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        reference: options.reference,
        message: 'Payment initialized successfully',
        data: {
          authorization_url: response.data.data.authorization_url,
          access_code: response.data.data.access_code,
          reference: response.data.data.reference,
        },
      };
    } catch (error: any) {
      this.logger.error(`Paystack initialization failed: ${error.message}`);
      return {
        success: false,
        reference: options.reference,
        message: error.response?.data?.message || 'Payment initialization failed',
        data: null,
      };
    }
  }

  async verifyPayment(options: VerifyPaymentOptions): Promise<PaymentGatewayResponse> {
    this.logger.log(`Verifying payment with Paystack: ${options.reference}`);
    
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${options.reference}`,
        { headers: this.getHeaders() }
      );

      const paymentData = response.data.data;
      
      return {
        success: paymentData.status === 'success',
        reference: options.reference,
        message: paymentData.message || 'Payment verified',
        data: {
          status: paymentData.status,
          amount: paymentData.amount / 100, // Convert from kobo
          paid_at: paymentData.paid_at,
          gateway_response: paymentData.gateway_response,
          currency: paymentData.currency,
        },
      };
    } catch (error: any) {
      this.logger.error(`Paystack verification failed: ${error.message}`);
      return {
        success: false,
        reference: options.reference,
        message: error.response?.data?.message || 'Payment verification failed',
        data: null,
      };
    }
  }

  async refund(options: RefundOptions): Promise<PaymentGatewayResponse> {
    this.logger.log(`Processing refund with Paystack: ${options.transactionId}`);
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/refund`,
        {
          transaction: options.transactionId,
          amount: options.amount * 100, // Convert to kobo
        },
        { headers: this.getHeaders() }
      );

      return {
        success: response.data.status,
        reference: options.transactionId,
        message: response.data.message || 'Refund processed',
        data: {
          transaction: options.transactionId,
          amount: options.amount,
          status: response.data.status,
        },
      };
    } catch (error: any) {
      this.logger.error(`Paystack refund failed: ${error.message}`);
      return {
        success: false,
        reference: options.transactionId,
        message: error.response?.data?.message || 'Refund failed',
        data: null,
      };
    }
  }

  async createTransfer(options: CreateTransferOptions): Promise<PaymentGatewayResponse> {
    this.logger.log(`Creating transfer with Paystack to ${options.accountNumber}`);
    
    try {
      // First create transfer recipient
      const recipientResponse = await axios.post(
        `${this.baseUrl}/transferrecipient`,
        {
          type: 'nuban',
          name: options.accountName,
          account_number: options.accountNumber,
          bank_code: options.bankCode,
          currency: options.currency || 'NGN',
        },
        { headers: this.getHeaders() }
      );

      const recipientCode = recipientResponse.data.data.recipient_code;

      // Then initiate transfer
      const response = await axios.post(
        `${this.baseUrl}/transfer`,
        {
          source: 'balance',
          amount: options.amount * 100, // Convert to kobo
          recipient: recipientCode,
          reason: options.reason || 'Transfer',
          reference: options.reference,
        },
        { headers: this.getHeaders() }
      );

      return {
        success: response.data.status,
        reference: options.reference || response.data.data.reference,
        message: 'Transfer created successfully',
        data: {
          transfer_code: response.data.data.transfer_code,
          amount: options.amount,
          recipient: options.accountNumber,
        },
      };
    } catch (error: any) {
      this.logger.error(`Paystack transfer failed: ${error.message}`);
      return {
        success: false,
        reference: options.reference || '',
        message: error.response?.data?.message || 'Transfer failed',
        data: null,
      };
    }
  }

  async createCustomer(options: CreateCustomerOptions): Promise<PaymentGatewayResponse> {
    this.logger.log(`Creating customer with Paystack: ${options.email}`);
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/customer`,
        {
          email: options.email,
          first_name: options.firstName,
          last_name: options.lastName,
          phone: options.phone,
          metadata: options.metadata,
        },
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        message: 'Customer created successfully',
        data: {
          customer_code: response.data.data.customer_code,
          email: options.email,
          first_name: options.firstName,
          last_name: options.lastName,
        },
      };
    } catch (error: any) {
      this.logger.error(`Paystack customer creation failed: ${error.message}`);
      return {
        success: false,
        message: error.response?.data?.message || 'Customer creation failed',
        data: null,
      };
    }
  }

  async resolveBankAccount(accountNumber: string, bankCode: string): Promise<PaymentGatewayResponse> {
    this.logger.log(`Resolving bank account: ${accountNumber} with bank code: ${bankCode}`);
    
    try {
      const response = await axios.get(
        `${this.baseUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        { headers: this.getHeaders() }
      );

      return {
        success: true,
        message: 'Account resolved successfully',
        data: {
          account_number: response.data.data.account_number,
          account_name: response.data.data.account_name,
          bank_id: response.data.data.bank_id,
        },
      };
    } catch (error: any) {
      this.logger.error(`Bank account resolution failed: ${error.message}`);
      return {
        success: false,
        message: error.response?.data?.message || 'Account resolution failed',
        data: null,
      };
    }
  }

  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const hmac = crypto.createHmac('sha512', secret);
    hmac.update(payload);
    const digest = hmac.digest('hex');
    return digest === signature;
  }
}
