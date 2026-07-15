import { Injectable, Logger } from '@nestjs/common';
import { IReceiptRepository } from '../interfaces/receipt.repository.interface';
import { ReceiptMapper } from '../mappers/receipt.mapper';
import { DuplicateReceiptException } from '../exceptions/payment.exception';

@Injectable()
export class ReceiptService {
  private readonly logger = new Logger(ReceiptService.name);

  constructor(
    private readonly receiptRepository: IReceiptRepository,
  ) {}

  async create(dto: any): Promise<any> {
    this.logger.log(`Creating receipt for user ${dto.userId}`);

    const existingReceipt = await this.receiptRepository.findByReceiptNumber(dto.receiptNumber);
    if (existingReceipt) {
      throw new DuplicateReceiptException(dto.receiptNumber);
    }

    const receiptData = ReceiptMapper.toCreateInput(dto);
    const receipt = await this.receiptRepository.create(receiptData);

    this.logger.log(`Receipt created successfully: ${receipt.id}`);
    return ReceiptMapper.toResponseDto(receipt);
  }

  async findById(id: string): Promise<any> {
    const receipt = await this.receiptRepository.findById(id);
    if (!receipt) {
      throw new Error('Receipt not found');
    }
    return ReceiptMapper.toResponseDto(receipt);
  }

  async findByReceiptNumber(receiptNumber: string): Promise<any> {
    const receipt = await this.receiptRepository.findByReceiptNumber(receiptNumber);
    if (!receipt) {
      throw new Error('Receipt not found');
    }
    return ReceiptMapper.toResponseDto(receipt);
  }

  async findByPaymentId(paymentId: string): Promise<any> {
    const receipt = await this.receiptRepository.findByPaymentId(paymentId);
    if (!receipt) {
      throw new Error('Receipt not found');
    }
    return ReceiptMapper.toResponseDto(receipt);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.receiptRepository.findByUserId(userId, options);
  }

  async findByInvoiceId(invoiceId: string): Promise<any[]> {
    const receipts = await this.receiptRepository.findByInvoiceId(invoiceId);
    return receipts.map((r) => ReceiptMapper.toResponseDto(r));
  }
}
