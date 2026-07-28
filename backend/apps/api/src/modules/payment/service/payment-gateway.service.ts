import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPaymentGateway } from '../interfaces/payment-gateway.interface';
import { PaystackGateway } from './gateways/paystack.gateway';
import { FlutterwaveGateway } from './gateways/flutterwave.gateway';

@Injectable()
export class PaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);
  private readonly gateways: Map<string, IPaymentGateway>;

  constructor(private readonly configService: ConfigService) {
    this.gateways = new Map();
    this.registerGateway('PAYSTACK', new PaystackGateway(this.configService));
    this.registerGateway('FLUTTERWAVE', new FlutterwaveGateway(this.configService));
  }

  registerGateway(name: string, gateway: IPaymentGateway): void {
    this.gateways.set(name.toUpperCase(), gateway);
    this.logger.log(`Registered payment gateway: ${name}`);
  }

  getGateway(name: string): IPaymentGateway {
    const gateway = this.gateways.get(name.toUpperCase());
    if (!gateway) {
      throw new Error(`Payment gateway not found: ${name}`);
    }
    return gateway;
  }

  getAvailableGateways(): string[] {
    return Array.from(this.gateways.keys());
  }
}
