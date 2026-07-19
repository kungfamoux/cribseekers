import { Receipt } from '../entities/receipt.entity';
import { ReceiptResponseDto } from '../dto/receipt-response.dto';

export class ReceiptMapper {
  static toResponseDto(entity: Receipt): ReceiptResponseDto {
    return {
      id: entity.id,
      invoiceId: entity.invoiceId,
      paymentId: entity.paymentId,
      userId: entity.userId,
      amount: entity.amount,
      currency: entity.currency,
      receiptNumber: entity.receiptNumber,
      issuedAt: entity.issuedAt,
      metadata: entity.metadata,
    };
  }

  static toCreateInput(dto: any): any {
    return {
      invoiceId: dto.invoiceId,
      paymentId: dto.paymentId,
      userId: dto.userId,
      amount: dto.amount,
      currency: 'NGN',
      receiptNumber: dto.receiptNumber,
      metadata: dto.metadata,
    };
  }
}
