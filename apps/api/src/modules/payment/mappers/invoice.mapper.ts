import { Invoice } from '../entities/invoice.entity';
import { InvoiceResponseDto } from '../dto/invoice-response.dto';

export class InvoiceMapper {
  static toResponseDto(entity: Invoice): InvoiceResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      invoiceNumber: entity.invoiceNumber,
      amount: entity.amount,
      currency: entity.currency,
      status: entity.status,
      dueDate: entity.dueDate,
      paidAt: entity.paidAt,
      items: entity.items,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      userId: dto.userId,
      invoiceNumber: dto.invoiceNumber,
      amount: dto.amount,
      currency: 'NGN',
      items: dto.items,
      metadata: dto.metadata,
      dueDate: dto.dueDate,
    };
  }
}
