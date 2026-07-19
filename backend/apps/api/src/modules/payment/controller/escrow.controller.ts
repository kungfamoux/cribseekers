import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EscrowService } from '../service/escrow.service';
import { CreateEscrowDto } from '../dto/create-escrow.dto';
import { ReleaseEscrowDto } from '../dto/release-escrow.dto';
import { PaymentPaginationDto } from '../dto/payment-pagination.dto';

@ApiTags('Escrows')
@Controller('escrows')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post()
  @ApiOperation({ summary: 'Create escrow' })
  @ApiResponse({ status: 201, description: 'Escrow created successfully' })
  async create(@Body() dto: CreateEscrowDto): Promise<any> {
    return this.escrowService.create(dto);
  }

  @Post(':id/release')
  @ApiOperation({ summary: 'Release escrow' })
  @ApiResponse({ status: 200, description: 'Escrow released successfully' })
  async release(
    @Param('id') id: string,
    @Body() dto: ReleaseEscrowDto,
  ): Promise<any> {
    return this.escrowService.release(id, dto.notes);
  }

  @Post(':id/refund')
  @ApiOperation({ summary: 'Refund escrow' })
  @ApiResponse({ status: 200, description: 'Escrow refunded successfully' })
  async refund(
    @Param('id') id: string,
    @Body('reason') reason?: string,
  ): Promise<any> {
    return this.escrowService.refund(id, reason);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get escrow by ID' })
  @ApiResponse({ status: 200, description: 'Escrow retrieved successfully' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.escrowService.findById(id);
  }

  @Get('payer/:payerId')
  @ApiOperation({ summary: 'Get escrows by payer ID' })
  @ApiResponse({ status: 200, description: 'Escrows retrieved successfully' })
  async findByPayerId(
    @Param('payerId') payerId: string,
    @Query() pagination: PaymentPaginationDto,
  ): Promise<any> {
    return this.escrowService.findByPayerId(payerId, pagination);
  }

  @Get('payee/:payeeId')
  @ApiOperation({ summary: 'Get escrows by payee ID' })
  @ApiResponse({ status: 200, description: 'Escrows retrieved successfully' })
  async findByPayeeId(
    @Param('payeeId') payeeId: string,
    @Query() pagination: PaymentPaginationDto,
  ): Promise<any> {
    return this.escrowService.findByPayeeId(payeeId, pagination);
  }
}
