import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoiceService } from '../service/invoice.service';
import { InvoiceResponseDto } from '../dto/invoice-response.dto';
import { PaymentPaginationDto } from '../dto/payment-pagination.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create invoice' })
  @ApiResponse({ status: 201, description: 'Invoice created successfully', type: InvoiceResponseDto })
  async create(@Body() dto: any): Promise<InvoiceResponseDto> {
    return this.invoiceService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID' })
  @ApiResponse({ status: 200, description: 'Invoice retrieved successfully', type: InvoiceResponseDto })
  async findById(@Param('id') id: string): Promise<InvoiceResponseDto> {
    return this.invoiceService.findById(id);
  }

  @Get('number/:invoiceNumber')
  @ApiOperation({ summary: 'Get invoice by invoice number' })
  @ApiResponse({ status: 200, description: 'Invoice retrieved successfully', type: InvoiceResponseDto })
  async findByInvoiceNumber(@Param('invoiceNumber') invoiceNumber: string): Promise<InvoiceResponseDto> {
    return this.invoiceService.findByInvoiceNumber(invoiceNumber);
  }

  @Post(':id/mark-paid')
  @ApiOperation({ summary: 'Mark invoice as paid' })
  @ApiResponse({ status: 200, description: 'Invoice marked as paid', type: InvoiceResponseDto })
  async markAsPaid(@Param('id') id: string): Promise<InvoiceResponseDto> {
    return this.invoiceService.markAsPaid(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get invoices by user ID' })
  @ApiResponse({ status: 200, description: 'Invoices retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaymentPaginationDto,
  ): Promise<any> {
    return this.invoiceService.findByUserId(userId, pagination);
  }
}
