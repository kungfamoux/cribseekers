import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from '../service/payment.service';
import { PostHogService } from '../../../posthog/posthog.service';
import { PaymentResponseDto } from '../dto/payment-response.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { VerifyPaymentDto } from '../dto/verify-payment.dto';
import { RefundPaymentDto } from '../dto/refund-payment.dto';
import { PaymentPaginationDto } from '../dto/payment-pagination.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly posthog: PostHogService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Initialize payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment initialized successfully',
    type: PaymentResponseDto,
  })
  async initializePayment(
    @Body() dto: CreatePaymentDto,
    @Req() req: any
  ): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.initializePayment(dto);
    const distinctId = req.user?.id || 'anonymous';
    await this.posthog.capture({
      distinctId,
      event: 'payment_initialized',
      properties: {
        payment_id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
      },
    });
    return payment;
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify payment' })
  @ApiResponse({
    status: 200,
    description: 'Payment verified successfully',
    type: PaymentResponseDto,
  })
  async verifyPayment(@Body() dto: VerifyPaymentDto, @Req() req: any): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.verifyPayment(dto);
    const distinctId = req.user?.id || 'anonymous';
    await this.posthog.capture({
      distinctId,
      event: 'payment_verified',
      properties: {
        payment_id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
      },
    });
    return payment;
  }

  @Post(':id/refund')
  @ApiOperation({ summary: 'Process refund' })
  @ApiResponse({
    status: 200,
    description: 'Refund processed successfully',
    type: PaymentResponseDto,
  })
  async processRefund(
    @Param('id') id: string,
    @Body() dto: RefundPaymentDto
  ): Promise<PaymentResponseDto> {
    return this.paymentService.processRefund(id, dto.amount, dto.reason);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payment retrieved successfully',
    type: PaymentResponseDto,
  })
  async findById(@Param('id') id: string): Promise<PaymentResponseDto> {
    return this.paymentService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get payments by user ID' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
  async findByUserId(
    @Param('userId') userId: string,
    @Query() pagination: PaymentPaginationDto
  ): Promise<any> {
    return this.paymentService.findByUserId(userId, pagination);
  }
}
