import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReceiptService } from '../service/receipt.service';
import { ReceiptResponseDto } from '../dto/receipt-response.dto';
import { PaymentPaginationDto } from '../dto/payment-pagination.dto';

@ApiTags('Receipts')
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  @ApiOperation({ summary: 'Create receipt' })
  @ApiResponse({ status: 201, description: 'Receipt created successfully', type: ReceiptResponseDto })
  async create(@Body() dto: any): Promise<ReceiptResponseDto> {
    return this.receiptService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get receipt by ID' })
  @ApiResponse({ status: 200, description: 'Receipt retrieved successfully', type: ReceiptResponseDto })
  async findById(@Param('id') id: string): Promise<ReceiptResponseDto> {
    return this.receiptService.findById(id);
  }

  @Get('number/:receiptNumber')
  @ApiOperation({ summary: 'Get receipt by receipt number' })
  @ApiResponse({ status: 200, description: 'Receipt retrieved successfully', type: ReceiptResponseDto })
  async findByReceiptNumber(@Param('receiptNumber') receiptNumber: string): Promise<ReceiptResponseDto> {
    return this.receiptService.findByReceiptNumber(receiptNumber);
  }

  @Get('payment/:paymentId')
  @ApiOperation({ summary: 'Get receipt by payment ID' })
  @ApiResponse({ status: 200, description: 'Receipt retrieved successfully', type: ReceiptResponseDto })
  async findByPaymentId(@Param('paymentId') paymentId: string): Promise<ReceiptResponseDto> {
    return this.receiptService.findByPaymentId(paymentId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get receipts by user ID' })
  @ApiResponse({ status: 200, description: 'Receipts retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaymentPaginationDto,
  ): Promise<any> {
    return this.receiptService.findByUserId(userId, pagination);
  }

  @Get('invoice/:invoiceId')
  @ApiOperation({ summary: 'Get receipts by invoice ID' })
  @ApiResponse({ status: 200, description: 'Receipts retrieved successfully' })
  async findByInvoiceId(@Param('invoiceId') invoiceId: string): Promise<ReceiptResponseDto[]> {
    return this.receiptService.findByInvoiceId(invoiceId);
  }
}
