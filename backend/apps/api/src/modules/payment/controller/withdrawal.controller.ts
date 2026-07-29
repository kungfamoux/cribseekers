import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WithdrawalService } from '../service/withdrawal.service';
import { CreateWithdrawalDto } from '../dto/create-withdrawal.dto';
import { ApproveWithdrawalDto } from '../dto/approve-withdrawal.dto';
import { RejectWithdrawalDto } from '../dto/reject-withdrawal.dto';
import { PaymentPaginationDto } from '../dto/payment-pagination.dto';

@ApiTags('Withdrawals')
@Controller('withdrawals')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post()
  @ApiOperation({ summary: 'Create withdrawal request' })
  @ApiResponse({ status: 201, description: 'Withdrawal created successfully' })
  async create(@Body() dto: CreateWithdrawalDto): Promise<any> {
    return this.withdrawalService.create(dto);
  }

  @Post('approve')
  @ApiOperation({ summary: 'Approve withdrawal' })
  @ApiResponse({ status: 200, description: 'Withdrawal approved successfully' })
  async approve(@Body() dto: ApproveWithdrawalDto): Promise<any> {
    return this.withdrawalService.approve(dto);
  }

  @Post('reject')
  @ApiOperation({ summary: 'Reject withdrawal' })
  @ApiResponse({ status: 200, description: 'Withdrawal rejected successfully' })
  async reject(@Body() dto: RejectWithdrawalDto): Promise<any> {
    return this.withdrawalService.reject(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get withdrawal by ID' })
  @ApiResponse({ status: 200, description: 'Withdrawal retrieved successfully' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.withdrawalService.findById(id);
  }

  @Get('wallet/:walletId')
  @ApiOperation({ summary: 'Get withdrawals by wallet ID' })
  @ApiResponse({ status: 200, description: 'Withdrawals retrieved successfully' })
  async findByWalletId(
    @Param('walletId') walletId: string,
    @Query() pagination: PaymentPaginationDto,
  ): Promise<any> {
    return this.withdrawalService.findByWalletId(walletId, pagination);
  }
}
