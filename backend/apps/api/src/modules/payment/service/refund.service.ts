import { Injectable, Logger } from '@nestjs/common';
import { RefundRepository } from '../repository/refund.repository';
import { RefundMapper } from '../mappers/refund.mapper';
import { PaymentValidator } from '../validators/payment.validator';

@Injectable()
export class RefundService {
  private readonly logger = new Logger(RefundService.name);

  constructor(
    private readonly refundRepository: RefundRepository,
  ) {}

  async create(dto: any): Promise<any> {
    this.logger.log(`Creating refund for payment ${dto.paymentId}`);

    if (!PaymentValidator.isValidAmount(dto.amount)) {
      throw new Error('Invalid amount');
    }

    const refundData = RefundMapper.toCreateInput(dto);
    const refund = await this.refundRepository.create(refundData);

    this.logger.log(`Refund created successfully: ${refund.id}`);
    return RefundMapper.toEntity(refund);
  }

  async findById(id: string): Promise<any> {
    const refund = await this.refundRepository.findById(id);
    if (!refund) {
      throw new Error('Refund not found');
    }
    return RefundMapper.toEntity(refund);
  }

  async findByPaymentId(paymentId: string): Promise<any[]> {
    const refunds = await this.refundRepository.findByPaymentId(paymentId);
    return refunds.map((r) => RefundMapper.toEntity(r));
  }

  async processRefund(refundId: string): Promise<any> {
    this.logger.log(`Processing refund ${refundId}`);

    const refund = await this.refundRepository.findById(refundId);
    if (!refund) {
      throw new Error('Refund not found');
    }

    const updatedRefund = await this.refundRepository.update(refundId, {
      status: 'COMPLETED',
      processedAt: new Date(),
    });

    return RefundMapper.toEntity(updatedRefund);
  }
}
