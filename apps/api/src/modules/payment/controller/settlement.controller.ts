import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SettlementService } from '../service/settlement.service';
import { SettlementResponseDto } from '../dto/settlement-response.dto';

@ApiTags('Settlements')
@Controller('settlements')
export class SettlementController {
  constructor(private readonly settlementService: SettlementService) {}

  @Post('escrow/:escrowId')
  @ApiOperation({ summary: 'Create settlement for escrow' })
  @ApiResponse({ status: 201, description: 'Settlement created successfully', type: SettlementResponseDto })
  async create(@Param('escrowId') escrowId: string): Promise<SettlementResponseDto> {
    return this.settlementService.create(escrowId);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete settlement' })
  @ApiResponse({ status: 200, description: 'Settlement completed successfully', type: SettlementResponseDto })
  async complete(
    @Param('id') id: string,
    @Body('gatewayReference') gatewayReference?: string,
  ): Promise<SettlementResponseDto> {
    return this.settlementService.complete(id, gatewayReference);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get settlement by ID' })
  @ApiResponse({ status: 200, description: 'Settlement retrieved successfully', type: SettlementResponseDto })
  async findById(@Param('id') id: string): Promise<SettlementResponseDto> {
    return this.settlementService.findById(id);
  }

  @Get('escrow/:escrowId')
  @ApiOperation({ summary: 'Get settlements by escrow ID' })
  @ApiResponse({ status: 200, description: 'Settlements retrieved successfully' })
  async findByEscrowId(@Param('escrowId') escrowId: string): Promise<SettlementResponseDto[]> {
    return this.settlementService.findByEscrowId(escrowId);
  }
}
