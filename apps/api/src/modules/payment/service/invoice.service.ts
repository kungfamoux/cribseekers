import { Injectable, Logger } from '@nestjs/common';
import { IInvoiceRepository } from '../interfaces/invoice.repository.interface';
import { InvoiceMapper } from '../mappers/invoice.mapper';
import { DuplicateInvoiceException } from '../exceptions/payment.exception';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async create(dto: any): Promise<any> {
    this.logger.log(`Creating invoice for user ${dto.userId}`);

    const existingInvoice = await this.invoiceRepository.findByInvoiceNumber(dto.invoiceNumber);
    if (existingInvoice) {
      throw new DuplicateInvoiceException(dto.invoiceNumber);
    }

    const invoiceData = InvoiceMapper.toCreateInput(dto);
    const invoice = await this.invoiceRepository.create(invoiceData);

    this.logger.log(`Invoice created successfully: ${invoice.id}`);
    return InvoiceMapper.toResponseDto(invoice);
  }

  async findById(id: string): Promise<any> {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return InvoiceMapper.toResponseDto(invoice);
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<any> {
    const invoice = await this.invoiceRepository.findByInvoiceNumber(invoiceNumber);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return InvoiceMapper.toResponseDto(invoice);
  }

  async markAsPaid(invoiceId: string): Promise<any> {
    this.logger.log(`Marking invoice ${invoiceId} as paid`);

    const updatedInvoice = await this.invoiceRepository.update(invoiceId, {
      status: 'PAID',
      paidAt: new Date(),
    });

    return InvoiceMapper.toResponseDto(updatedInvoice);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.invoiceRepository.findByUserId(userId, options);
  }
}
